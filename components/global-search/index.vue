<template>
  <div class="global-search">
    <v-text-field
      v-model="titleSearch"
      label="Поиск товара по названию"
      append-inner-icon="mdi-magnify"
      density="compact"
      variant="outlined"
      hide-details
      @input="handleSearchByTitle"
    ></v-text-field>
    <SearchResult
      v-model="showSearch"
      @update:modelValue="showSearch = false, titleSearch=''"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import SearchResult from '~/components/search-result';
import { useProductsStore } from '~/store/products-store';
import { ref } from 'vue';
import debounce from '~/utils/debounce';
import { storeToRefs } from 'pinia';

const titleSearch = ref('');
const { getProducts } = useProductsStore();
const { productList } = storeToRefs(useProductsStore());
const showSearch = ref(false);
const filtersParams = reactive({
  page: 1,
  limit: 20,
  categories: '',
  brands: '',
  min_price: 0,
  max_price: 1000000000,
});

onMounted(() => {
  window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('v-field__input')) {
      showSearch.value = false;
    }
  });
});

/**
 * поиск товара по части названия
 */
const handleSearchByTitle = async () => {
  if (titleSearch.value?.length >= 3) {
    debounce(async () => {

      filtersParams.partial_title = titleSearch.value;

      await getProducts(filtersParams);
      if (productList.value.total < 1) {
        showSearch.value = false;
      } else {
        showSearch.value = true;
      }
    }, 600);
  } else {
    if (titleSearch.value?.length === 0) {
      filtersParams.partial_title = 'empty';
      await getProducts(filtersParams);
    }
    showSearch.value = false;
  }
};
</script>
<style
  scoped
  lang="scss"
>
.global-search {
  position: relative;
  flex: 1;
  padding: 0 32px;

  @media (max-width: $mobile) {
    padding: 0;
  }
}
</style>