import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductsStore = defineStore('productsStore', () => {
  const { $api } = useNuxtApp();
  const productList = ref();
  const productItem = ref();
  const productListPopular = ref();

  const getProducts = async (args): Promise<void> => {
    const getParams = {
      ...args,
    };

    const params = Object.fromEntries(
      Object.entries(getParams).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }
        return [key, value];
      }),
    );

    const { data } = await $api.get('/products', { params });
    productList.value = data;
  };

  const getProductsPopular = async (args): Promise<void> => {
    const getParams = {
      ...args,
    };

    const params = Object.fromEntries(
      Object.entries(getParams).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }
        return [key, value];
      }),
    );

    const { data } = await $api.get('/products', { params });
    productListPopular.value = data;
  };

  return {
    getProducts,
    productList,
    productItem,
    getProductsPopular,
    productListPopular,
  };
});