<template>
  <section class="brands">
    <div
      class='brand-item'
      v-for='item in brandsList'
      :key='item.id'
    >
      <a
        class="brand-item__wrap"
        href="#"
      >
        <img
          v-if="item.images[0]"
          :src="MAIN_URL + item.images[0]?.img"
          alt="item.title"
          width="218"
          height="143"
          key='item.id'
        >
        <span v-else>{{ item.title }}</span>
      </a>
    </div>
  </section>
</template>
<script
  setup
  lang='ts'
>
import {ref} from 'vue'
import {useBrandsStore} from '../../store/brands'

const brandsStore = useBrandsStore()
const {getBrandsList} = brandsStore
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
const brandsList = ref()

const response = await getBrandsList()
brandsList.value = response.data
</script>
<style
  scoped
  lang='scss'
>
.brands {
  display: flex;
  flex-wrap: wrap;
  padding: $offset-xlarge 0 $offset-large-2;

  @media (max-width: $laptop) {
    margin: 0 -8px;
    padding: $offset-small 0;
  }
}

.brand-item {
  margin: 0;
  width: 25%;
  height: 150px;
  display: flex;
  align-items: center;
  transition: box-shadow 0.25s ease-in-out;
  border-radius: 3px;
  overflow: hidden;
  padding: 8px;

  @media (max-width: $laptop) {
    width: 33%;
  }

  @media (max-width: $small) {
    width: 50%;
  }

  &:hover {
    box-shadow: $shadows;
  }

  &__wrap {
    border: 1px solid #e5e5e5;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    padding: 8px;
  }
}
</style>