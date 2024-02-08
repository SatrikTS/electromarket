<template>
  <div>
    <h1>Каталог</h1>
    <Breadcrumbs :catalogName="route.query.categories" />
    <Caption
      :caption="route.query.categories"
      style="margin: 0 0 16px; padding: 16px"
    />
    <div
      v-if="route.query.categories"
    >
      <div class="catalog">
        <div class="column-5 filters-group">
          <Filters
            :isMobileSize="isMobileSize"
            @getFiltersByBrand="getFiltersByBrand"
            @getFiltersByMinPrice="getFiltersByMinPrice"
            @getFiltersByMaxPrice="getFiltersByMaxPrice"
          />
        </div>
        <div class="content">
          <Sort />
          <ProductsList
            :isLoading="isLoading"
            :catalogCategory="route.query.param"
            :category="route.query.categoryId"
          />
          <div class="pagination">
            <Pagination
              :totalCount="productsTotalGetter"
              @goToPage="goToPage"
              @switchPageList="switchPageList"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      404
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'catalog',
})
import { useCatalogStore } from '~/store/products-list'

const catalogStore = useCatalogStore()
const { getProductList } = catalogStore
const route = useRoute()
const productOnPage = ref(20)
const { activeCategoryGetter, productQueryGetter, productsTotalGetter } = storeToRefs(catalogStore)
const activeCategory = ref(route.query.categories)
const isLoading = ref(false)

/**
 *
 * @param {number} pageNum - Number of page products list
 */
function goToPage(pageNum) {
  getProductList(pageNum, productOnPage.value, route.query.categoryId)
}

function switchPageList(param) {
  productQueryGetter.value.limit = param
  getProductList(productQueryGetter.value)
}

function getFiltersByBrand(brandName) {
  productQueryGetter.value.brands = brandName
  productQueryGetter.value.categories = route.query.categories
  getProductList(productQueryGetter.value)
}

function getFiltersByMinPrice(minPrice) {
  productQueryGetter.value.min_price = minPrice
  getProductList(productQueryGetter.value)
}

function getFiltersByMaxPrice(maxPrice) {
  productQueryGetter.value.max_price = maxPrice
  getProductList(productQueryGetter.value)
}

async function initProductList() {
  productQueryGetter.value.categories = activeCategory.value
  isLoading.value = true
  await getProductList(productQueryGetter.value)
  isLoading.value = false

}

initProductList()
</script>
<style
  scoped
  lang="scss"
>
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