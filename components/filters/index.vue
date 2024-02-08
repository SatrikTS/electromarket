<template>
  <div
    class='filters'
    :class="{ active: isActiveFilter }"
  >
    <span class='filters__caption'>
      Фильтры:
      <Button
        v-if='isMobileSize'
        buttonStyle='inverse'
        class='filters__btn'
        @click='isActiveFilter = !isActiveFilter'
      >
        <IconArrow />
      </Button>
    </span>
    <div class='filters__wrap'>
      <span class='filters-label'>Цена:</span>
      <div class='filters-group filters-group--row'>
        <TextInput
          placeholder='От'
          name='price_from'
          type='number'
          :min='0'
          @input='debounceGetPriceMin'
        />
        <TextInput
          placeholder='До'
          name='price_from'
          type='number'
          @input='debounceGetPriceMax'
        />
      </div>
      <span class='filters-label'>Производители:</span>
      <div class='filters-group'>
        <Checkbox
          v-for='item in brandsList'
          :key="item.title"
          :name='item.title'
          :id='item.title'
          @change='getFiltersByBrand'
        />
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang='ts'
>
import {onMounted, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useCatalogStore} from '~/store/products-list'
import {useBrandsStore} from '../../store/brands'
import debounce from '../../utils/debounce'
import {MAX_PRICE} from '../../constants'
import {updateScreenSize} from '../../utils/updateResize'
import IconArrow from '../../assets/icons/IconArrow.vue'

const emit = defineEmits(['getFiltersData'])

const catalogStore = useCatalogStore()
const brandsStore = useBrandsStore()
const {getBrandsList} = brandsStore
const {getProductList} = catalogStore
const {activeCategoryGetter, productQueryGetter} = storeToRefs(catalogStore)
const {brandsListListGetter} = storeToRefs(brandsStore)
const brandsNameFiltersList = ref([])
const minPrice = ref()
const maxPrice = ref()
const isMobileSize = ref(false)
const isActiveFilter = ref(false)
const brandsList = ref()

const responseBrands = await getBrandsList()
brandsList.value = responseBrands.data

function getFiltersByBrand(e) {
  if (e.target.checked) {
    brandsNameFiltersList.value.includes(e.target.name) ? brandsNameFiltersList.value
      : brandsNameFiltersList.value.push(e.target.name)
    emit('getFiltersByBrand', brandsNameFiltersList.value)
  } else {
    const findBrandIndex = brandsNameFiltersList.value.findIndex(item => item === e.target.name)
    brandsNameFiltersList.value.includes(e.target.name) ? brandsNameFiltersList.value.splice(findBrandIndex, 1)
      : brandsNameFiltersList.value
    emit('getFiltersByBrand', brandsNameFiltersList.value)
  }
}

function debounceGetPriceMin(e) {
  debounce(() => {
    getPriceMin(e)
  }, 1000)
}

function debounceGetPriceMax(e) {
  debounce(() => {
    getPriceMax(e)
  }, 1000)
}

function getPriceMin(e) {
  if (!e.target.value) {
    minPrice.value = 0
  } else {
    minPrice.value = e.target.value
  }
  emit('getFiltersByMinPrice', minPrice.value)
}

function getPriceMax(e) {
  if (!e.target.value) {
    maxPrice.value = MAX_PRICE
  } else {
    maxPrice.value = e.target.value
  }
  emit('getFiltersByMaxPrice', maxPrice.value)
}

onMounted(() => {
  isMobileSize.value = updateScreenSize()

  window.addEventListener('resize', () => {
    isMobileSize.value = updateScreenSize()
  })
})
</script>
<style
  scoped
  lang='scss'
>
.filters {
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: $mobile) {
    margin: 0;
  }

  &__caption {
    font-size: 20px;
    background: $bg-base;
    padding: 12px 8px;
    width: 100%;

    @media (max-width: $mobile) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: $offset-base 0;
    transition: all .55s ease-in-out;

    @media (max-width: $mobile) {
      overflow: hidden;
      max-height: 0;
      flex-direction: column;
      padding: 0;
      opacity: 0;
      margin: $offset-base 0 0;
    }
  }

  &__btn {
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 40px;
    position: relative;

    svg {
      transition: transform 0.25s ease-in-out;
      transform: rotate(90deg);
    }

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

  &.active {
    .filters__btn svg {
      transform: rotate(-90deg);
    }

    .filters__wrap {
      max-height: 1000px;
      opacity: 1;
    }
  }
}

.filters-label {
  font-size: 16px;
  font-weight: bold;
}

.filters-group {
  margin: 16px 0;
  width: 100%;

  &--row {
    display: flex;

    @media (max-width: $mobile) {
      margin: $offset-base 0 0;
    }

    .input {
      max-width: 112px;
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>