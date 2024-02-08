<template>
  <div class='product-inner'>
    <b>Артикл: {{ productItem.article }}</b>
    <br>
    <b>Баланс: {{ productItem.balance }}</b>
    <div class='product-inner__wrap'>
      <div class='product-inner__row'>
        <div v-if='productItem.images' class="product-inner__img">
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
              class='product-inner__thumbnail-item'
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
      <div class='product-inner__row'>
        <Breadcrumbs
          :catalogName='route.query.categories'
          :catalogLink='route.query.categories'
          :productName='productItemGetter.title'
        />
        <h2 class='product-inner__title'>{{ productItem.title }}</h2>
        <div class='product-inner__price'>
          <span class='product-inner__price-label'>Цена: </span>
          <span class='product-inner__price-count'>{{ productItem.price }} ₽</span>
        </div>
        <div class='product-inner__product-buttons'>
          <Button
            type='button'
            buttonStyle='success'
            @click="addToCartStore(productItem.price, productItem)"
          >Добавить в корзину
          </Button>
          <Button
            type='button'
            buttonStyle='warning'
            disabled
          >Добавить в избранное
          </Button>
        </div>
        <div class='product-inner__description'>
          {{ productItem.description }}
        </div>
        <div
          class='product-inner__features'
          v-if='productItem.characteristics'
        >
          <span class='product-inner__char-caption'>Характеристики:</span>
          <div
            class='product-inner__features-item'
            v-for='(item, index) in productItem.characteristics'
            :key="index"
          >
            <span class='product-inner__features-key'>{{ item.key }}:</span>
            <span class='product-inner__features-dots'></span>
            <span class='product-inner__features-value'>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class='product-inner__row product-inner__row--full'>
        <div class='product-inner__info'>
          {{ productItem.info }}
        </div>
        <Caption caption='Рекомендуем' />

        <ProductsList
          v-if='productItem.category'
          :maxView='4'
          :catalogCategory='productItem.category.title'
        />
        <NuxtLink
          :to='{ path: `/catalog`, query: {param: route.query.param}  }'
          class='product-inner__link'
        >
          Посмотреть другие товары этой категории:
          {{ route.query.param }}
          <IconArrow />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import {getCookie} from "../../utils/cookie"

definePageMeta({
  layout: "pages",
})

import IconArrow from "../../assets/icons/IconArrow.vue"
import {onMounted, ref, computed, watch} from "vue"
import {storeToRefs} from "pinia"

import {useCatalogStore} from "~/store/products-list"
import {useCartStore} from "~/store/cart"

const catalogStore = useCatalogStore()
const { getItemProduct } = catalogStore
const { productItemGetter } = storeToRefs(catalogStore)
const cartStore = useCartStore()

const route = useRoute()
const pageId = computed(() => route.params.id)
const inputVal = ref(cartStore.cartGetter)
const { addToCart } = cartStore
const MAIN_URL = useRuntimeConfig().public.MAIN_URL


const productItem = ref()

function addToCartStore(price, product) {
  inputVal.value++
  addToCart(inputVal.value, price, product)
}

function showImage(image) {
  activeImage.value = image
}

productItem.value = await getItemProduct(pageId.value, route.query.categoryId)
const activeImage = ref(productItem.value.images[0])
onMounted(() => {


  inputVal.value = getCookie("cartCount") ? getCookie("cartCount") : inputVal.value
})

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    inputVal.value = getCookie("cartCount")
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
  lang='scss'
>
.product-inner {
  padding: $offset-large-2 0;

  &__wrap {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: $mobile) {
      flex-direction: column;
    }
  }

  &__row {
    min-width: 50%;
    flex: 1;

    &--full {
      width: 100%;
      max-width: 100%;

      @media (max-width: $mobile) {
        padding: 0;
        order: 2;
      }
    }

    &:first-child {
      padding-right: $offset-large;

      @media (max-width: $mobile) {
        padding: 0;
        order: 1;
      }
    }

    &:nth-child(2n) {
      padding-left: $offset-large;

      @media (max-width: $mobile) {
        padding: 0;
        order: 0;
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
    line-height: 1.5;
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
</style>