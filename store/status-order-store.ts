import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Типы статусов
 */
export const useStatusOrderStore = defineStore('statusOrderStore', () => {
  const statusesList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getStatusesList = async (): Promise<void> => {
    const { data } = await $api.get('/status_orders');
    statusesList.value = data;
  };

  /**
   * Изменить тип
   * @param param
   * @param id
   */
  const putStatusItem = async (
    params,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/status_orders/${id}`, {
      ...params,
    });
    return 'Опция изменена';
  };

  return {
    getStatusesList,
    putStatusItem,
    statusesList,
  };
});
