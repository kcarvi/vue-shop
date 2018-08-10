import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: [
			{
				name: 'Lemon',
				price: 50
			},
			{
				name: 'Apple',
				price: 150
			},
			{
				name: 'Banana',
				price: 100
			},
			{
				name: 'Orange',
				price: 150
			},
			{
				name: 'Ananas',
				price: 500
			},
			{
				name: 'Kiwi',
				price: 200
			}
		]
	},
	getters: {
		getProducts: state => state.products
	}
})