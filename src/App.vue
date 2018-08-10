<template>
  <div class="container">
    <div class="row">
      <div class="col-12"><my-header></my-header></div>
      <div class="col-12"><products></products></div>
    </div>
  </div>
</template>

<script>

  import myHeader from './Header.vue'
  import products from './Products.vue'

  export default {
    components: {
      myHeader,
      products
    }
  }

</script>
