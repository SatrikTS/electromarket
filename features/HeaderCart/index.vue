<template>
  <NuxtLink
    href="/cart"
    class="header-cart"
  >
    <LogoCart class="icon" />
    <span
      v-if="totalCount"
      class="count"
    >{{ totalCount }}</span>
    <span
      v-if="totalSum"
      class="sum"
    >{{ totalSum }} ₽.</span>
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

  &:hover {
    color: $primary;
  }

  svg {
    width: 32px !important;
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
  left: 12px;
  top: -5px
}

.sum {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-left: 4px;
}
</style>