<template>
  <div class="container">
    <div class="row">
      <div class="col-12"><app-header></app-header></div>
      <div class="col-12"><products></products></div>
      <div class="col-12"><app-footer></app-footer></div>
    </div>
  </div>
</template>

<script>

  import header from './Header.vue'
  import footer from './Footer.vue'
  import products from './Products.vue'

  export default {
    components: {
      'app-header': header,
      'app-footer': footer,
      products
    }
  }

</script>
