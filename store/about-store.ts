import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * About
 */
export const useAboutStore = defineStore('aboutStore', () => {
  const aboutPost = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить запись
   */
  const getAboutData = async (): Promise<void> => {
    isLoading.value = true;
    const { data } = await $api.get('/about_companies/1');
    aboutPost.value = data;
    isLoading.value = false;
  };

  /**
   * Изменить запись
   * @param param
   * @param id
   */
  const putAboutData = async (params: any, id: number): Promise<string> => {
    const { data } = await $api.put(`/about_companies/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Загрузка изображений к посту
   * @param files
   */
  const uploadImages = async (files: FormData): Promise<string> => {
    const { data } = await $api.post(
      '/about_company_images',
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.message;
  };

  /**
   * Удаление изображения
   * @param id
   */
  const removeImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/about_company_images/${id}`);
    return data.message;
  };

  return {
    getAboutData,
    putAboutData,
    uploadImages,
    removeImage,
    aboutPost,
    isLoading,
  };
});
