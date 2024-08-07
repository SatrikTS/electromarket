<template>
  <div class="product-inner">
    <Breadcrumbs
      :catalogName="route.query.categories"
      :catalogLink="productItem?.category.title"
      :productName="productItem.title"
    />
    <div class="product-inner__wrap">
      <div
        v-if="productItem.images.length"
        class="product-inner__row"
      >
        <div class="product-inner__img">
          <div class="product-inner__img-active">
            <img
              v-if="activeImage"
              :src="MAIN_URL + activeImage.img"
              :alt="productItem.title"
              class="preview-img"
            />
          </div>
          <div class="product-inner__thumbnail-container">
            <div
              v-for="image in productItem.images"
              :key="image.id"
              class="product-inner__thumbnail-item"
              :class='activeImage?.id === image.id ? "active" : ""'
            >
              <img
                :src="MAIN_URL + image.img"
                :alt="productItem.title"
                @click="showImage(image)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="product-inner__row">
        <h2 class="product-inner__title">{{ productItem.title }}</h2>
        <span>
           Артикул: {{ productItem.article }}
          </span>
        <div class="product-inner__price">
          <span class="product-inner__price-label">Цена: </span>
          <span class="product-inner__price-count">{{ productItem.price }} ₽</span>
        </div>
        <div class="product-inner__price">
          <span v-if="parseInt(productItem.balance) > 0" class="product-inner__price-label in-stock">В наличии</span>
          <span v-else class="product-inner__price-label to-order">Под заказ</span>
        </div>
        <div class="product-inner__product-buttons">
          <v-btn
            type="button"
            color="#27ae60"
            @click="addToCartStore(productItem.price, productItem)"
          >Добавить в корзину
          </v-btn>
        </div>
        <div class="product-inner__description">
          {{ productItem.description }}
        </div>
        <div
          class="product-inner__features"
          v-if="productItem.characteristics.length"
        >
          <span class="product-inner__char-caption">Характеристики:</span>
          <div
            class="product-inner__features-item"
            v-for="(item, index) in productItem.characteristics"
            :key="index"
          >
            <span class="product-inner__features-key">{{ item.key }}:</span>
            <span class="product-inner__features-dots"></span>
            <span class="product-inner__features-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="product-inner__row product-inner__row--full">
        <div class="product-inner__info">
          {{ productItem.info }}
        </div>
        <Caption caption="Рекомендуем" />
        <ProductsList
          class="product-list"
          :productList="productList.data"
        />
        <NuxtLink
          :to="{ path: `/products`, query: {categories: productItem?.category.title}  }"
          class="product-inner__link"
        >
          Посмотреть другие товары этой категории:
          <IconArrow />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getCookie } from '../../utils/cookie'

definePageMeta({
  layout: 'pages',
})

import IconArrow from '../../assets/icons/IconArrow.vue'
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '~/store/products-store';

import { useCatalogStore } from '~/store/products-list'
import { useCartStore } from '~/store/cart'

useHead({
  link: [{ rel: 'canonical'}],
})

const catalogStore = useCatalogStore()
const { getItemProduct } = catalogStore
const { productItemGetter } = storeToRefs(catalogStore)
const cartStore = useCartStore()
const { getProducts } = useProductsStore();
const route = useRoute()
const pageId = computed(() => route.params.id)
const inputVal = ref(cartStore.cartGetter)
const { addToCart } = cartStore
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
const productItem = ref()
const { productList } = storeToRefs(useProductsStore());

function addToCartStore(price, product) {
  inputVal.value++

  const cartProduct = {
    article: product.article,
    title: product.title,
    price: product.price,
    images: product.images,
    id: product.id,
    category: product?.category,
  }

  addToCart(inputVal.value, price, cartProduct)
}

function showImage(image) {
  activeImage.value = image
}

productItem.value = await getItemProduct(pageId.value, route.query.categoryId)
const activeImage = ref(productItem.value?.images ? productItem.value.images[0] : null)

const similarProductsFilters = reactive({
  page: 1,
  limit: 4,
  categories: productItem.value?.category.title,
})

await getProducts(similarProductsFilters);

onMounted(() => {

  inputVal.value = getCookie('cartCount') ? getCookie('cartCount') : inputVal.value
})

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    inputVal.value = getCookie('cartCount')
  },
)

watch(
  () => productItemGetter.value.images,
  (newValue) => {
    if (newValue.length) {
      activeImage.value = newValue[0]
    }
  },
)
</script>
<style
  scoped
  lang="scss"
>
.product-inner {
  padding: $offset-large-2 0 0;

  @media (max-width: $mobile) {
    padding: 0;
  }

  &__wrap {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: $mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__row {
    min-width: 50%;
    flex: 1;

    &:first-child {

      @media (max-width: $mobile) {
        padding: 0;
        order: 1;
      }
    }

    &:nth-child(2n) {

      @media (max-width: $mobile) {
        padding: 0;
        order: 0;
      }
    }

    &--full {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      grid-column: 1 / span 2;

      @media (max-width: $mobile) {
        padding: 0;
        order: 2;
      }
    }
  }

  &__price {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: $offset-base 0;
  }

  &__price-label {
    margin-right: $offset-small;

    &.in-stock {
      color: $success;
    }

    &.to-order {
      color: $primary;
    }
  }

  &__price-count {
    color: $success;
  }

  &__title {
    margin: 0;
  }

  &__char-caption {
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 $offset-base;
  }

  &__description {
    font-size: 14px;
    line-height: 1.5;
  }

  &__product-buttons {
    display: flex;
    margin: 0 0 $offset-base;

    button {
      margin-right: $offset-small;

      @media (max-width: $mobile) {
        margin: 0 $offset-small $offset-small 0;
      }
    }

    @media (max-width: $mobile) {
      flex-wrap: wrap;
    }
  }

  &__features {
    padding: $offset-base 0;
    display: flex;
    flex-direction: column;
  }

  &__features-item {
    display: flex;
    align-items: flex-end;
    margin: 0 0 $offset-small;
    font-size: 12px;
    line-height: 1.5;
  }

  &__features-dots {
    flex: 1;
    border-bottom: 1px dashed transparent;
    background-image: linear-gradient(to right, $bg-dark2 50%, transparent 50%);
    background-size: 4px 10px;
    display: flex;
    margin-bottom: 5px;
  }

  &__features-key {
    font-weight: bold;
    text-align: left;
    padding-right: 5px;
  }

  &__features-value {
    text-align: right;
    padding-left: 5px;
  }

  &__info {
    font-size: 14px;
    line-height: 2;
    letter-spacing: 2px;
    margin: $offset-small 0;
  }

  &__product-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: $offset-base;

    &:hover {
      color: $primary;
    }

  }

  &__link {
    @media (max-width: $mobile) {
      font-size: 14px;
    }
  }

  &__caption {
    padding: $offset-base;
  }

  &__img {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &__img-active {
    width: 100%;
    height: 450px;
    overflow: hidden;

    @media (max-width: $mobile) {
      height: 320px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__thumbnail-container {
    display: flex;
    flex-wrap: wrap;

    img {
      border: 1px solid $bg-base;
      width: 100%;
      padding: 3px;
      border-radius: 8px;
    }
  }

  &__thumbnail-item {
    width: calc(100% / 5);
    min-width: 80px;
    cursor: pointer;
    padding: 2px;
    border-radius: 2px;

    &.active img {
      border: 1px solid rgba($success, 0.5);
    }
  }
}

.product-list {
  padding: 32px 0;

  @media (max-width: $mobile) {
    padding: 16px 0;
  }
}
</style>