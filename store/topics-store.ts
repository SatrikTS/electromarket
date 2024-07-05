import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';

/**
 * Category
 */
export const useTopicsStore = defineStore('topicsStore', () => {
  const topics = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getTopics = async (): Promise<void> => {
    const { data } = await $api.get('/topics');
    topics.value = data;
  };

  /**
   * Изменить категорию
   * @param param
   * @param id
   */
  const putTopicItem = async (
    params: OptionsListItem,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/topics/${id}`, {
      ...params,
    });
    return data.message;
  };

  /**
   * Создать категорию
   * @param param
   * @param id
   */
  const postTopic = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/topics', {
      ...params,
    });
    return data.message;
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteTopic = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/topics/${id}`);
    return data.message;
  };

  return {
    getTopics,
    putTopicItem,
    postTopic,
    deleteTopic,
    topics,
  };
});
