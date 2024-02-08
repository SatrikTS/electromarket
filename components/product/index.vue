<template>
  <div
    class="product"
    :class="{'is-loading' : isLoading}"
  >
    <div class="product-wrap">
      <NuxtLink
        class="product-link-group"
        :to="{path: `/products/${id}`, query: {categories: catalogCategory}}"
      >
        <div class="product-pic">
          <img
            v-if="img && img[0]"
            :src="MAIN_URL+img[0].img"
            :alt="caption"
          >
        </div>
        <span
          class="product-title"
        >{{ caption }}
      </span>
        <div
          class="product-description"
        >
          {{ description ? truncateString(description, 45) : '' }}
        </div>
      </NuxtLink>
      <span class="product-price-default">{{ price }} ₽</span>
      <div class="product-cart-group">
        <Button
          type="button"
          size="small"
          buttonStyle="default"
        >
          <b>Сравнить</b>
          <CompareIcon />
        </Button>
        <Button
          type="button"
          buttonStyle="success"
          size="small"
          @click="emit('addToCart')"
        >
          <LogoCart class="icon" />
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from '../../features/Button/Button'
import LogoCart from '../../assets/icons/cart.vue'
import CompareIcon from '../../assets/icons/compare.vue'

const props = defineProps({
  caption: String,
  description: String,
  price: String || Number,
  img: String,
  id: String || Number,
  catalogCategory: String,
  categoryId: String,
  allData: Object,
  isLoading: Boolean,
})

const emit = defineEmits(['addToCart'])

const MAIN_URL = useRuntimeConfig().public.MAIN_URL

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...'
  } else {
    return str
  }
}
</script>
<style
  scoped
  lang="scss"
>
.product {
  padding: $offset-small;
  //max-width: 240px;
  min-width: 200px;
  width: 25%;
  position: relative;

  @media (max-width: $laptop) {
    width: 33%;
    min-width: auto;
  }

  @media (max-width: $mobile) {
    width: 50%;
    flex: 1;
    min-width: 190px;
  }

  &:hover {
    .product-btns {
      opacity: 1;
      z-index: 1;
    }
  }

  &.is-loading {

    .product-wrap {
      @include skeleton(100%, 100%);
    }
  }
}

.product-wrap {
  border: 1px solid $bg-gold;
  padding: $offset-small;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  border-radius: 3px;
  transition: box-shadow 0.25s ease-in-out;

  &:hover {
    box-shadow: $shadows;
  }
}

.product-link-group {
  &:hover {
    .product-title {
      color: $primary;
    }

  }
}

.product-title {
  font-weight: bold;
  font-size: 14px;
  margin: auto 0;
  color: #000;
  height: 40px;
  display: inline-block;
  overflow: hidden;
}

.product-description {
  font-size: 14px;
  max-width: max-content;
  max-height: 66px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
  display: inline-block;
  overflow: hidden;
}

.product-price {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 38px;
  font: bold 17px/18px "Roboto", "Arial", sans-serif;
  margin: $offset-base auto;
  border-radius: 3%;
  text-transform: uppercase;
  color: $bg-main;
  background-color: $primary;

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -26px;
    border: 19px solid white;
    border-left-color: $primary;
  }
}

.product-price-default {
  display: inline-block;
  margin: 8px 0;
  font-weight: bold;
  color: $primary;
}

.product-pic {
  height: 200px;
  overflow: hidden;
  margin: 0 0 $offset-small;

  &:hover {
    img {
      transform: scale(1.3);
    }
  }

  img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: block;
    object-fit: contain;
    transition: transform 0.35s ease-in-out;
  }
}

.product-cart-group {
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    width: 42px;
    height: 42px;

    &:first-child {
      justify-content: space-between;
      flex: 1;
      margin-right: $offset-small;
    }

    b {
      margin-right: $offset-small;
    }
  }
}
</style>