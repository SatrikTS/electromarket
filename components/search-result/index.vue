<template>
  <div v-if="modelValue" class="search-result">
    <ul class="list">
      <li v-for="item in productList?.data">
        <NuxtLink
          :to="{path: `/products/${item.id}`}"
          class="list-link"
          @click="emit('update:modelValue', false)"
        >
          <v-img
            v-if="item.images[0]"
            class="search-result-img"
            :src="MAIN_URL + item.images[0].img"
            cover
          />
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '~/store/products-list'


interface IProps {
  modelValue: boolean
}

interface IEmits {
  (e: 'update:modelValue', value: boolean): void
}

defineProps<IProps>()
const emit = defineEmits<IEmits>()

import { useProductsStore } from '~/store/products-store';
const catalogStore = useCatalogStore()
// const { productListGetter, searchLoadingGetter } = storeToRefs(catalogStore)
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const { productList } = storeToRefs(useProductsStore());

</script>
<style scoped lang="scss">
.search-result {
  top: 40px;
  position: absolute;
  background: #fff;
  z-index: 20;
  width: 92%;
  max-height: 400px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: $mobile) {
    width: 100%;
  }
}

.list {
  list-style: none;
  padding: 0;
}

.list-link {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 18px;

  &:hover {
    background: #ccc;
  }
}

.search-result-img {
  max-width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: block;
    object-fit: contain;
    transition: transform 0.35s ease-in-out;
  }
}
</style>