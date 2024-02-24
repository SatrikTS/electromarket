<template>
  <div class="product-list">
    <Product
      v-for="item in productList"
      :key="item.id"
      :data="item"
      @addToCart="addToCartStore(item.price, item)"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { onMounted, ref, watch } from 'vue';
import { useCartStore } from '~/store/cart';
import { getCookie } from '../../utils/cookie';

interface Props {
  productList: any[];
}

const props = defineProps<Props>();
const cartStore = useCartStore();
const { addToCart } = cartStore;

const inputVal = ref(cartStore.cartCount);

function addToCartStore(price, item) {

  const cartProduct = {
    article: item.article,
    title: item.title,
    price: item.price,
    images: item.images,
    id: item.id,
    category: item.category
  }

  inputVal.value++;
  addToCart(inputVal.value, price, cartProduct);
}

onMounted(() => {
  inputVal.value = getCookie('cartCount') ? getCookie('cartCount') : inputVal.value;
});

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    inputVal.value = getCookie('cartCount');
  },
);
</script>
<style
  scoped
  lang="scss"
>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>