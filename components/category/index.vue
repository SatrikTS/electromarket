<template>
  <div
    class="category"
    v-if="categoryList?.length"
  >
    <template v-for="item in categoryList">
      <NuxtLink
        v-if="item.id"
        class="category-item"
        :class="{ ['category-item--' + maxViews]: maxViews }"
        :key="item.id"
        @click="handleCategory(item)"
      >
        <div class="category-item__wrap">
        <span
          v-if="item.images?.length"
          class="category-item__image"
        >
          <img
            :src="MAIN_URL+item.images[0]?.img"
            :alt="item.title"
          >
        </span>
          <div class="category-item__data">
            <span class="category-item__name">{{ item.title }}</span>
            <div class="category-item__text">{{ truncateString(item.description, 35) }}</div>
          </div>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>
<script setup>
import { useCategoryStore } from '../../store/category'
import { truncateString } from '~/utils/cuttingString'

const props = defineProps({
  /**
   * Кол-во отображаемых категорий
   */
  maxViews: Number,
})

console.log(props.maxViews)

const categoryStore = useCategoryStore()
const { getCategoryList } = categoryStore
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
const route = useRoute()
const categoryList = ref()

const response = await getCategoryList(props.maxViews, route.query.parent ? route.query.parent : 0)
categoryList.value = response.data

const handleCategory = async (item) => {
  if (item.child == '[]' || !item.child) {
    await navigateTo(`${ location.origin }/products?categories=${ item.title }`, {
      external: true,
    })
  } else {
    const childCategoryList = await getCategoryList(null, item.id)
    categoryList.value = childCategoryList.data
    await navigateTo(`${ location.origin }/categories/?parent=${ item.id }`, {
      external: true,
    })
  }
}
</script>
<style
  scoped
  lang="scss"
>
.category {
  display: flex;
  flex-wrap: wrap;
}

.category-item {
  width: 25%;
  height: 140px;
  padding: 8px;
  cursor: pointer;

  @media (max-width: $laptop) {
    width: 33%;
  }

  @media (max-width: $mobile) {
    min-width: 250px;
    max-width: 100%;
    flex: 1;
  }

  &__image {
    min-width: 100px;
    max-width: 100px;
    border-right: 1px solid #e5e5e5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      font-size: 10px;
    }
  }

  &__name {
    font-size: 16px;
    margin: 0 0 8px;

    @media (max-width: $mobile) {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 14px;

    @media (max-width: $mobile) {
      font-size: 12px;
    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    padding: $offset-small;
  }

  &__wrap {
    border: 1px solid #e5e5e5;
    display: flex;
    transition: box-shadow 0.25s ease-in-out;
    border-radius: 4px;
    height: 120px;
    overflow: hidden;

    &:hover {
      box-shadow: $shadows;
    }
  }

  &:hover {
    .category-item__name {
      color: $primary;
    }
  }
}

.category-item--1 {
  width: 100%;
}

.category-item--2 {
  width: 50%;
}

.category-item--3 {
  width: 50%;
}

.category-item--4 {
  width: 50%;
}

.category-item--5 {
  width: 50%;
}

.category-item--6 {
  width: 50%;

  @media (max-width: $mobile) {
    min-width: 250px;
    max-width: 100%;
    flex: 1;
  }
}
</style>