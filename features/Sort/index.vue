<template>
  <div class='sort'>
    <span class='sort-caption'>Сортировать по цене:</span>
    <div class='sort-wrap'>
      <Button
        :class="{ active: sortByPrice === 'low' }"
        buttonStyle=''
        size='small'
        @click='getSortDataLow'
      >Сначала дешевые
      </Button>
      <Button
        :class="{ active: sortByPrice === 'high' }"
        buttonStyle=''
        size='small'
        @click='getSortDataHigh'
      >Сначала дорогие
      </Button>
    </div>
  </div>
</template>
<script
  setup
  lang='ts'
>
import {ref} from 'vue'
import {useCatalogStore} from '~/store/products-list'
import {storeToRefs} from 'pinia'

const catalogStore = useCatalogStore()
const {productQueryGetter} = storeToRefs(catalogStore)
const {getProductList} = catalogStore
const sortByPrice = ref()

function getSortDataHigh() {
  sortByPrice.value = 'high'
  productQueryGetter.value.sort = 'price_desc'
  getProductList(productQueryGetter.value)
}

function getSortDataLow() {
  sortByPrice.value = 'low'
  productQueryGetter.value.sort = 'price_asc'
  getProductList(productQueryGetter.value)
}
</script>
<style
  scoped
  lang='scss'
>
.sort {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: $bg-base;
  padding: $offset-small;

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    margin-left: 12px;
  }
}

.sort-wrap {
  display: flex;
  align-items: center;

  @media (max-width: $mobile) {
    margin: $offset-small 0 0;

    button {
      margin: 0;
    }
  }
}

.sort-caption {
  font-size: 12px;
}
</style>