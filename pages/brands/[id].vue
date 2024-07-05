<template>
  <div class="brand-item">
    <Caption :caption="brandItem.title"/>
    <br>
    <ProductsList :productList="productList.data" />
  </div>
</template>
<script setup lang="ts">
import { useBrandsStore } from '~/store/brands';
import { useProductsStore } from '~/store/products-store'
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: "pages",
});

const { getBrandItem } = useBrandsStore();
const { brandItem } = storeToRefs(useBrandsStore());
const { getProducts } = useProductsStore()
const { productList } = storeToRefs(useProductsStore())

await getBrandItem(useRoute().params.id);

const filtersParams = reactive({
  page: 1,
  limit: 20,
  categories: '',
  brands: brandItem.value.title,
  min_price: 0,
  max_price: 1000000000,
})

await getProducts(filtersParams)
</script>
<style scoped lang="scss">
.brand-item {

  .caption {
    padding: 16px 8px;
    border-radius: 8px;
  }
}
</style>