<template>
  <div
    class="filters"
    :class="{ active: isActiveFilter }"
  >
    <span class="filters__caption">
      Фильтры:
      <Button
        v-if="isMobileSize"
        buttonStyle="inverse"
        class="filters__btn"
        @click="isActiveFilter = !isActiveFilter"
      >
        <IconFilter />
      </Button>
    </span>
    <div class="filters__wrap">
      <div class="filters__overlay" @click="isActiveFilter = !isActiveFilter"></div>
      <div class="filters__list">
        <span class="filters-label">Цена:</span>
        <v-range-slider
          v-model="priceRange"
          :max="maxPriceProduct"
          :min="0"
          :step="10"
          thumb-label="always"
          class="filters-slider"
        >
        </v-range-slider>
        <span class="filters-label">Производители:</span>
        <div class="filters-group">
          <Checkbox
            v-for="item in brandsList.data"
            :key="item.title"
            :name="item.title"
            :id="item.title"
            @change="getFiltersByBrand"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useBrandsStore } from '../../store/brands';
import debounce from '../../utils/debounce';
import { updateScreenSize } from '../../utils/updateResize';
import IconFilter from '../../assets/icons/IconFilter.vue';

interface Props {
  maxPriceProduct: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['getFiltersByBrand', 'updatePrice']);
const priceRange = ref([0, props.maxPriceProduct]);
const { getBrandsList } = useBrandsStore();
const brandsNameFiltersList = ref([]);
const isMobileSize = ref(false);
const isActiveFilter = ref(false);
const { brandsList } = storeToRefs(useBrandsStore());
const overlay = ref()

await getBrandsList();

function getFiltersByBrand(e) {
  if (e.target.checked) {
    brandsNameFiltersList.value.includes(e.target.name) ? brandsNameFiltersList.value
      : brandsNameFiltersList.value.push(e.target.name);
    emit('getFiltersByBrand', brandsNameFiltersList.value);
  } else {
    const findBrandIndex = brandsNameFiltersList.value.findIndex(item => item === e.target.name);
    brandsNameFiltersList.value.includes(e.target.name) ? brandsNameFiltersList.value.splice(findBrandIndex, 1)
      : brandsNameFiltersList.value;
    emit('getFiltersByBrand', brandsNameFiltersList.value);
  }
}

onMounted(() => {
  isMobileSize.value = updateScreenSize();

  window.addEventListener('resize', () => {
    isMobileSize.value = updateScreenSize();
  });
});

watch(priceRange, () => {
  debounce(() => {
    emit('updatePrice', priceRange.value);
  }, 1000);
});
</script>
<style
  scoped
  lang="scss"
>
.filters {
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: $mobile) {
    margin: 0;
  }

  &__caption {
    font-size: 16px;
    line-height: 49px;
    background: $bg-base;
    padding: 0 8px;
    width: 100%;
    border-radius: 8px;

    @media (max-width: $mobile) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 16px;
    }
  }

  &__wrap {
    padding: $offset-base 0;
    transition: all 0.55s ease-in-out;
    z-index: 3;

    @media (max-width: $mobile) {
      overflow: hidden;
      flex-direction: column;
      padding: 0;
      left: -100%;
      width: 100%;
      position: fixed;
      max-height: fit-content;
      z-index: 2;
      height: 100vh;
      top: 0px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: $mobile) {
      max-width: 250px;
      z-index: 3;
      position: relative;
      background: #fff;
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

  &__overlay {

    @media (max-width: $mobile) {
      background: #101111;
      bottom: 0;
      left: 0;
      opacity: .4;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      display: block;
    }
  }

  &.active {
    .filters__wrap {
      left: 0;
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
  max-height: 400px;
  overflow: scroll;
  background: $bg-base;
  border-radius: 8px;
  padding: 8px;

  @media (max-width: $mobile) {
    max-height: calc(100vh - 158px);
  }

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

.filters-slider {
  width: 100%;
  margin: 24px 0 0 !important;

  @media (max-width: $mobile) {
    padding: 0 18px;
  }
}
</style>