<template>
  <div>
    <h1>Подкатегории</h1>
    <Category
      :categoryList="categoryList"
      @navigate="handleNavigate"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { useCategoryStore } from '@/store/category';

definePageMeta({
  layout: 'pages',
});

const categoryStore = useCategoryStore();
const { getCategoryList } = categoryStore;
const categoryList = ref();
const response = await getCategoryList(1000, useRoute().query.parent);
categoryList.value = response.data

const handleNavigate = async (param) => {
  await navigateTo(`${location.origin}/categories/subcategories?parent=${param}`, {
    external: true,
  });
};
</script>
