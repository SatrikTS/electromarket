import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * About
 */
export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref();
  const article = ref();
  const isLoading = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить запись
   */
  const getPostItem = async (id: number): Promise<void> => {
    isLoading.value = true;
    const { data } = await $api.get(`/posts/${id}`);
    article.value = data;
    isLoading.value = false;
  };

  /**
   * Получить запись
   */
  const getPosts = async (category?: string): Promise<void> => {
    const getParams = {
      categories: category,
    }

    const params = Object.fromEntries(
      Object.entries(getParams).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }
        return [key, value];
      }),
    );

    isLoading.value = true;
    const { data } = await $api.get('/posts', {params});
    posts.value = data;
    isLoading.value = false;
  };

  /**
   * Создать запись
   * @param param
   * @param id
   */
  const postPostItem = async (params: any): Promise<any> => {
    const { data } = await $api.post('/posts', {
      ...params,
    });
    return data;
  };

  /**
   * Изменить запись
   * @param param
   * @param id
   */
  const putPostItem = async (params: any, id: number): Promise<string> => {
    const { data } = await $api.put(`/posts/${id}`, {
      ...params,
    });
    return data;
  };

  /**
   * Удаление изображения
   * @param id
   */
  const removePost = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/posts/${id}`);
    return data.message;
  };

  /**
   * Загрузка изображений к посту
   * @param files
   */
  const uploadImages = async (files: FormData): Promise<string> => {
    const { data } = await $api.post(
      '/post_images',
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  };

  /**
   * Удаление изображения
   * @param id
   */
  const removeImage = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/post_images/${id}`);
    return data.message;
  };

  return {
    getPostItem,
    getPosts,
    putPostItem,
    uploadImages,
    removeImage,
    postPostItem,
    removePost,
    posts,
    isLoading,
    article,
  };
});
