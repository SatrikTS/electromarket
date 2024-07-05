<template>
  <div class='breadcrumbs'>
    <NuxtLink to='/'>Главная</NuxtLink> <span>/</span>
    <NuxtLink to="/categories" @click="getCategoryList(null, 0)">Категории</NuxtLink> <span>/</span>
    <span v-if='!catalogLink && catalogName'> {{ catalogName }}</span>
    <NuxtLink  v-if='catalogLink' :to='{ path: `/products`, query: {categories: catalogLink}  }'>{{ catalogLink }}</NuxtLink><span v-if='catalogLink'>/</span>
    <span v-if='productName' class='breadcrumbs__last'>{{ productName}}</span>
  </div>
</template>
<script setup>
import { useCategoryStore } from '../../store/category'

const categoryStore = useCategoryStore()
const { getCategoryList } = categoryStore
const props = defineProps({
  catalogName: String,
  productName: String,
  catalogLink: String
})

</script>
<style scoped lang='scss'>
.breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 14px;

  @media (max-width: $mobile) {
    flex-wrap: wrap;
    letter-spacing: -0.4px;
    font-size: 12px;
  }

  span {
    padding: 0 5px;
  }

  .breadcrumbs__last {
    color: $primary;

    @media (max-width: $mobile) {
      padding-left: 0;
    }
  }

  a {
    &:hover {
      color: $primary;
    }
  }
}
</style>