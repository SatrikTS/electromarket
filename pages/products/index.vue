<template>
  <div class="products">
    <h1>Каталог</h1>
    <Breadcrumbs :catalogName="route.query.categories" />
    <Caption :caption="route.query.categories" />
    <div v-if="route.query.categories">
      <div class="catalog">
        <div class="column-5 filters-group">
          <Filters
            :maxPriceProduct="maxListPrice?.price"
            :filters="productList.brand_filter"
            @getFiltersByBrand="getFiltersByBrand"
            @updatePrice="updateFilterPrice"
          />
        </div>
        <div class="content">
          <Sort class="sort" @sort="sortFilter" />
          <ProductsList :productList="productList.data" />
          <div class="pagination">
            <Pagination
              :totalCount="productList.total"
              @goToPage="goToPage"
              @switchPageList="switchPageList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'catalog',
})
import { useProductsStore } from '~/store/products-store'

const { getProducts } = useProductsStore()
const { productList } = storeToRefs(useProductsStore())
const route = useRoute()
const activeCategory = ref(route.query.categories)
const maxListPrice = ref()

const filtersParams = reactive({
  page: 1,
  limit: 20,
  categories: activeCategory.value,
  brands: '',
  min_price: 0,
  max_price: 1000000000,
})

await getProducts(filtersParams)

if(productList.value.data.length > 0) {
  maxListPrice.value = productList.value.data.reduce((prevItem, currentItem) => {
    return (parseInt(prevItem.price) > parseInt(currentItem.price)) ? prevItem : currentItem;
  });
}


/**
 *
 * @param {number} pageNum - Number of page products list
 */
const goToPage = async (pageNum) => {
  filtersParams.page = pageNum
  await getProducts(filtersParams)
}

const switchPageList = async (param) => {
  filtersParams.limit = param
  filtersParams.page = 1
  await getProducts(filtersParams)
}

const getFiltersByBrand = async (brandName) => {
  filtersParams.brands = brandName
  await getProducts(filtersParams)
}

const updateFilterPrice = async (value) => {
  filtersParams.min_price = value[0]
  filtersParams.max_price = value[1]
  filtersParams.page = 1
  await getProducts(filtersParams)
}

const sortFilter = async (value) => {
  filtersParams.sort = value
  await getProducts(filtersParams)
}
</script>
<style
  scoped
  lang="scss"
>
.products {
  display: grid;
  gap: 16px;
  width: 1200px;
  margin: 0 auto;

  @media (max-width: $desktop) {
    max-width: 100%;
  }

  .caption {
    padding: 16px 8px;
    border-radius: 8px;
  }

  .sort {
    margin: 0 0 16px;
  }

  .product-list {
    @media (max-width: $laptop) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: $mobile) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.catalog {
  display: flex;

  @media (max-width: $mobile) {
    flex-direction: column;
  }

  .filters-group {

    @media (max-width: $mobile) {
      width: 100%;
    }
  }
}

.column {
  min-width: 20%;
  min-height: 500px;
}

.content {
  padding: 0 0 $offset-large $offset-large;
  flex: 1 0 0;

  @media (max-width: $mobile) {
    padding: 0;
  }
}

.pagination {
  margin: $offset-base 0 0;
  display: flex;
  justify-content: flex-end;

  @media (max-width: $mobile) {
    margin: 0 0 $offset-base;
  }
}
</style>