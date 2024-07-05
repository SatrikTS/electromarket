<template>
  <NuxtLink
    href="/cart"
    class="header-cart"
  >
    <span class="header-cart-title">Корзина</span>
    <LogoCart class="icon" />
    <span
      v-if="totalCount"
      class="count"
    >{{ totalCount }}</span>
<!--    <span-->
<!--      v-if="totalSum"-->
<!--      class="sum"-->
<!--    >{{ totalSum }} ₽.</span>-->
  </NuxtLink>
</template>
<script setup>
import LogoCart from '../../assets/icons/cart.vue'
import { onMounted, ref, watch } from 'vue'
import {useCartStore} from "~/store/cart"


const cartStore = useCartStore()
const totalSum = ref(0)
const totalCount = ref(0)

onMounted(() => {
  totalSum.value = getCookie('cartSum')
  totalCount.value = getCookie('cartCount')
})

watch(
  () => cartStore.sumGetter,
  (newValue) => {
    totalSum.value = newValue
  },
)

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    totalCount.value = newValue
  },
)
</script>
<style
  scoped
  lang="scss"
>
.header-cart {
  display: flex;
  align-items: flex-end;
  position: relative;
  color: $text;

  &-title {
    @media (max-width: $mobile) {
      display: none;
    }
  }

  &:hover {
    color: $primary;

    .icon {
      fill: $primary;
    }
  }

  svg {
    width: 32px !important;

    @media (max-width: $mobile) {
      width: 32px !important;
      height: 32px;
    }
  }
}

.icon {
  width: 32px;
}

.count {
  position: absolute;
  background: $primary;
  border-radius: 100%;
  color: #fff;
  width: 20px;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  right: -5px;
  top: -5px
}

.sum {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-left: 4px;
}
</style>