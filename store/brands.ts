import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBrandsStore = defineStore('brandStore', () => {
  const { $api } = useNuxtApp();
  const brandsList = ref();
  const brandItem = ref();

  const getBrandsList = async (limit?: number = 1000) => {
    const { data } = await $api.get(`/brands?limit=${limit}`);
    brandsList.value = data;
  };

  const postBrand = async (params: any) => {
    const { data } = await $api.post('/brands', params,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  };

  const putBrand = async (params: any, id: number) => {
    const { data } = await $api.put(`/brands/${id}`, {
      ...params,
    });
    return data.message;
  };

  const getBrandItem = async (id: string | number) => {
    const { data } = await $api.get(`/brands/${id}`);
    brandItem.value = data.data;
  };

  const removeBrand = async (id: number) => {
    const { data } = await $api.delete(`/brands/${id}`);
    return data.message;
  };

  const postBrandImages = async (files: FormData) => {
    const { data } = await $api.post('/brand_images', files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.message;
  };

  const removeBrandImages = async (id: number) => {
    const { data } = await $api.delete(`/brand_images/${id}`);
    return data.message;
  };

  return {
    brandsList,
    brandItem,
    getBrandsList,
    postBrand,
    postBrandImages,
    putBrand,
    getBrandItem,
    removeBrand,
    removeBrandImages,
  };
});