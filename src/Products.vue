<template>
<div class="row">
	<div class="col-md-6">
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text">Search</span>
			</div>
			<input type="text" v-model="search" class="form-control">
			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button" v-on:click="clearSearchLine">х</button>
			</div>
		</div>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<td>Name</td>
					<td>Price</td>
					<td>Add to cart</td>
				</tr>	
			</thead>
			<tbody>
				<tr v-for="product in searchProduct">
					<td>{{ product.name }}</td>
					<td>{{ product.price }}</td>
					<td>
						<button class="btn btn-outline-success" v-on:click="updateCart(product.name)">
						 + 
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		</div>
		<div class="col-md-6">
		<div class="jumbotron">
			<p v-if="this.quantity == 0">Your shopping cart is empty!</p>
			<div v-else>
			<p>Shopping Cart</p>
			<table class="table">
				<thead>
					<tr>
						<td>Item</td>
						<td></td>
						<td>Quantity</td>
						<td></td>
						<td>Price</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(amount, productName) in productInCart">
						<td class="text-primary">{{ productName }}</td>
						<td><button class="btn btn-outline-danger" v-on:click="minusProduct(productName)">
							-
						</button></td>
						<td>
							<input class="form-control" 
								type="text"
								v-on:keyup="keyupUpdate(productName)"
								v-model="productInCart[productName]">
						</td>
						<td><button class="btn btn-outline-success" v-on:click="plusProduct(productName)">
							+
						</button></td>
						<td class="text-primary">{{ productPrice(productName) }}</td>

						<td><button class="btn btn-outline-secondary" v-on:click="deleteProduct(productName)">
							x
						</button></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="3" class="text-secondary">
							{{ quantity }} items in cart
						</td>
						<td class="text-primary">
							Total:
						</td>
						<td class="text-primary">
							<strong>{{ totalPrice }}</strong>
						</td>
						<td>
							<button class="btn btn-danger" v-on:click="deleteProductFromCart">x</button>
						</td>
					</tr>
				</tfoot>
			</table>
			
			<h3>   </h3>
			</div>	
			
		</div>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				totalPrice: 0,
				productInCart: {},
				quantity: 0,
				search: ''
			}
		},
		mounted: function(){
			this.loadCartFromLocalStorage();
		},
		computed: {
			products(){
				return this.$store.getters.getProducts
			},
			searchProduct(){
				return this.products.filter(product => {
					return product.name.toLowerCase().includes(this.search.toLowerCase())
				})
			}
		},
		methods: {
			productPrice(product){
				let item = this.products.find(item => item.name === product);
				return item.price * this.productInCart[product];
			},
			updateCart(product){
				this.addToCart(product);
				this.getQuantity();
				this.getTotalPrice(product);
			},
			keyupUpdate(product){
				this.productInCart[product] = parseInt(this.productInCart[product]);
				if(isNaN(this.productInCart[product])){
						this.productInCart[product] = 1;
					}
				this.getTotalPrice();
				this.getQuantity();
			},
			updateLocalStorage(){
				localStorage.setItem('productInCart', JSON.stringify(this.productInCart));
				localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
				localStorage.setItem('quantity', JSON.stringify(this.quantity));
			},
			addToCart(product){
				if(this.productInCart[product]){
					this.productInCart[product]+=1;
				} else {
					this.productInCart[product] = 1;
					// this.$set(this.productInCart, product, 1);
				}
				this.updateLocalStorage();
			},
			getTotalPrice(product){
				// Создаем массив из свойств объекта
				let arr = Object.keys(this.productInCart);
				// Обнуляем прайс
				this.totalPrice = 0;
				// Обходим массив, чтобы узнать какие продукты в корзине
				for(let i=0; i<arr.length; i++){

					// Узнаем цену каждого продукта и добавляем к общей стоимости
					let item = this.products.find(item => item.name === arr[i]);
					this.totalPrice+=item.price*this.productInCart[arr[i]];
				}
				this.updateLocalStorage();
			},
			getQuantity(){
				this.quantity = 0;
				for(let key in this.productInCart){
					this.quantity += this.productInCart[key];
				}
				this.updateLocalStorage();
			},
			plusProduct(product){
				this.productInCart[product]+=1;
				this.quantity+=1;
				this.products.forEach((item)=>{
					if(item.name == product) {
						this.totalPrice+=item.price;
					}
				});
				this.updateLocalStorage();
			},
			minusProduct(product){
				if(this.productInCart[product] == 1 ){
					this.$delete(this.productInCart, product);
					this.getQuantity();
					this.getTotalPrice(product);
					return;
				}
				this.productInCart[product]-=1;
				this.quantity-=1;
				this.products.forEach((item)=>{
					if(item.name == product) {
						this.totalPrice-=item.price;
					}
				});
				this.updateLocalStorage();
			},
			deleteProduct(product){
				// Уменьшаем количество
				this.quantity = this.quantity - this.productInCart[product];
				// Уменьшаем стоимость
				this.products.forEach((item)=>{
					if(item.name == product) {
						 this.totalPrice =  this.totalPrice - (item.price * this.productInCart[product]);
					}
				});
				// Удаляем продукт
				this.$delete(this.productInCart, product);
				// Обновляем локальное хранилище
				this.updateLocalStorage();
			},
			deleteProductFromCart(){
				this.totalPrice = 0;
				this.quantity = 0;
				this.productInCart = {};
				localStorage.clear();
			},
			clearSearchLine(){
				this.search = '';
			},
			loadCartFromLocalStorage(){
				if(localStorage.getItem('quantity') > 0){
					this.quantity = JSON.parse(localStorage.getItem('quantity'));
					this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
					this.productInCart = JSON.parse(localStorage.getItem('productInCart'));
				}
			}
		}
	}

</script>

<style scoped>
	.jumbotron {
	    padding: 1rem;
	}
</style>