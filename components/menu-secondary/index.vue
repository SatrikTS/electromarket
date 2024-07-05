<template>
  <nav
    class='menu'
    :class="{ active: isActiveMenu }"
  >
    <ul class='menu__list'>
      <li
        v-for='item in menuList'
        :key='item.text'
        class='menu__item'
      >
        <NuxtLink
          :href='item.link'
          @click="handleMenu(item)"
        >{{ item.text }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script
  setup
  lang='ts'
>
import {ref, onMounted, watch} from 'vue'
import {menuList} from './list'
import {useCartStore} from '~/store/cart'
import { useCategoryStore } from '../../store/category';

interface Props {
  isMobileSize: boolean
}

defineProps<Props>()

const route = useRoute()
const totalSum = ref(0)
const totalCount = ref(0)
const isActiveMenu = ref(false)
const cartStore = useCartStore()
const categoryStore = useCategoryStore()
const { getCategoryList } = categoryStore

const handleMenu = (item: any) => {
  if(item.text === 'Категории') {
    getCategoryList(null, 0)
  }
}


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
  lang='scss'
>
.menu {

  @media (max-width: $mobile) {
    padding: 8px 0;
  }

  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: $offset-base 0;
    transition: all .55s ease-in-out;

    @media (max-width: $mobile) {
      overflow: hidden;
      max-height: 0;
      flex-direction: column;
      padding: 0;
      opacity: 0;
    }
  }


  &.active {
    .menu__list {
      max-height: 1000px;
      opacity: 1;
    }
  }

  &__item {

    @media (max-width: $laptop) {
      display: flex;
    }

    a {
      text-decoration: none;
      font-size: 16px;
      color: $bg-main;

      @media (max-width: $laptop) {
        font-size: 16px;
        line-height: 1.5;
      }

      @media (max-width: $mobile) {
        width: 100%;
        padding: 8px 0;
      }

      &:hover {
        color: $primary;
      }
    }

    .router-link-active {
      color: $primary;
    }
  }
}
</style>