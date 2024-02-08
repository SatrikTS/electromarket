<template>
  <div class='product-list'>
    <Product
      v-for='item in productListGetter'
      :key='item.id'
      :id='item.id'
      :img='item.images'
      :caption='item.title'
      :description='item.description'
      :catalogCategory='item.category_id'
      :price='item.price'
      :allData='item'
      :isLoading="isLoading"
      @addToCart='addToCartStore(item.price, item)'
    />
  </div>
</template>
<script
  setup
  lang='ts'
>
import {onMounted, ref, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useCatalogStore} from '~/store/products-list'
import {useCartStore} from '~/store/cart'
import {getCookie} from '../../utils/cookie'

interface Props {
  isLoading: boolean,
  maxView: number,
  categoryId: number,
  isRandom: boolean,
  catalogCategory: number,
}

const props = defineProps<Props>()
// store
const catalogStore = useCatalogStore()
const cartStore = useCartStore()

const {addToCart} = cartStore
const {getProductList} = catalogStore
const {productListGetter} = storeToRefs(catalogStore)

const inputVal = ref(cartStore.cartCount)

// add Cart Store
function addToCartStore(price, item) {
  inputVal.value++
  addToCart(inputVal.value, price, item)
}

onMounted(() => {
  inputVal.value = getCookie('cartCount') ? getCookie('cartCount') : inputVal.value

  if (props.isRandom) {
    const params = {
      'page': 1,
      'limit': 4,
      'min_price': 0,
      'max_price': 1000000000,
    }
    getProductList(params)
  } else if(props.catalogCategory) {

    const params = {
      'page': 1,
      'limit': 4,
      'min_price': 0,
      'max_price': 1000000000,
      'categories': props.catalogCategory,
      'brands': ''
    }
    setTimeout(() => {
      getProductList(params)
    }, 1000)
  }
})

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    inputVal.value = getCookie('cartCount')
  },
)
</script>
<style
  scoped
  lang='scss'
>
.product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -$offset-small;
  margin-right: -$offset-small;
}
</style>