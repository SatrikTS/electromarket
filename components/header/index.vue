<template>
  <header class='header'>
    <div class='container'>
      <div class='header-top' v-if='!isMobileSize'>
        <Logo />
        <Address  />
        <Phones/>
        <div
          class='header-section'
        >
          <Profile/>
          <HeaderCart
            :count='totalCount'
            :sum='totalSum'
          />
        </div>
      </div>
    </div>
    <div class='header-bottom'>
      <div class='container'>
        <Menu :isMobileSize='isMobileSize'></Menu>
      </div>
    </div>
  </header>
  <Transition name='informer'>
    <Informer
      status='success'
      v-show='isAddCart'
    >
      Товар добавлен в корзину
    </Informer>
  </Transition>
  <Transition name='informer'>
    <Informer
      status='danger'
      v-show='isRemoveCart'
    >
      Товар удален из корзины
    </Informer>
  </Transition>
</template>
<script setup>
import {updateScreenSize} from "../../utils/updateResize"
import Logo from "@/features/Logo"
import Phones from "@/features/Phones"
import Address from "@/features/Address"
import HeaderCart from "@/features/HeaderCart"
import Profile from "@/components/profile"
import {onMounted, ref, watch} from "vue"
import {useCartStore} from "~/store/cart"


const cartStore = useCartStore()
const isAddCart = ref(false)
const isRemoveCart = ref(false)
const totalSum = ref(0)
const totalCount = ref(0)
const screenWidth = ref()
const isMobileSize = ref(false)
/**
 * Отслеживаем добавление в корзину
 */
watch(() => cartStore.cartGetter, (value, oldValue) => {

  if (value > oldValue) {
    isAddCart.value = true

    setTimeout(() => {
      isAddCart.value = false
    }, 2000)
  }

  if (value < oldValue) {
    isRemoveCart.value = true

    setTimeout(() => {
      isRemoveCart.value = false
    }, 2000)
  }

})

onMounted(() => {
  totalSum.value = getCookie("cartSum")
  totalCount.value = getCookie("cartCount")

  isMobileSize.value = updateScreenSize()

  window.addEventListener("resize", () => {
    isMobileSize.value = updateScreenSize()
  })

})
</script>
<style
  scoped
  lang='scss'
>
.header {
  background: $bg-main;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $offset-base 0;

  @media (max-width: $mobile) {
    flex-direction: column;
  }

  & > .phones {
    padding: 0 $offset-large;
  }

  & > .address {

  }
}

.header-section {
  display: flex;
  align-items: flex-start;
}

.header-bottom {
  background: $bg-base;
}

.informer-enter-active,
.informer-leave-active {
  transition: opacity 0.5s ease;
}

.informer-enter-from,
.informer-leave-to {
  opacity: 0;
}
</style>