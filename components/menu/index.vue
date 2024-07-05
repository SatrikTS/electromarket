<template>
  <nav
    class='menu'
    :class="{ active: isActiveMenu }"
  >
    <div v-if='isMobileSize' class='menu__service'>
      <Button
        buttonStyle='inverse'
        class='menu__btn'
        @click='isActiveMenu = !isActiveMenu'
      >
        <span></span>
        <span></span>
        <span></span>
      </Button>
      <Logo />
      <div class='menu__cart'>
        <Profile/>
        <HeaderCart
          :count='totalCount'
          :sum='totalSum'
        />
      </div>
    </div>
    <ul class='menu__list'>
      <li
        v-for='item in menuList'
        :key='item.text'
        class='menu-item'
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
import {menuList} from './menuList'
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

  &__btn {
    padding: 8px;
    display: flex;
    flex-direction: column;
    min-width: 40px;
    height: 40px;
    position: relative;

    span {
      position: absolute;
      width: 22px;
      height: 2px;
      background: $danger;
      margin: 0 0 4px;
      transition: transform 0.25s ease-in-out;

      &:first-child {
        top: 12px
      }

      &:nth-child(2) {
        top: 18px;
      }

      &:last-child {
        margin: 0;
        top: 24px;
      }
    }
  }

  &__service {
    display: none;

    @media (max-width: $mobile) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      @media (max-width: $mobile) {
        margin: 0 12px;
      }
    }
  }

  &__cart {
    display: flex;

  }

  &.active {
    .menu__btn {

      span:first-child {
        top: 18px;
        transform: rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:last-child {
        top: 18px;
        transform: rotate(-45deg);
      }
    }

    .menu__list {
      max-height: 1000px;
      opacity: 1;
    }
  }

  .menu-item {
    //margin-right: $offset-small;

    @media (max-width: $laptop) {
      display: flex;
    }

    a {
      text-decoration: none;
      font-size: 20px;
      //color: $text;

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