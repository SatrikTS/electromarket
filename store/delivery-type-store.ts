import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Типы доставки
 */
export const useDeliveryTypeStore = defineStore('deliveryTypesStore', () => {
  const deliveryTypesList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список
   */
  const getDeliveryTypesList = async (): Promise<void> => {
    const { data } = await $api.get('/delivery_types');
    deliveryTypesList.value = data;
  };

  /**
   * Изменить тип доставки
   * @param param
   * @param id
   */
  const putDeliveryTypesItem = async (
    params,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/delivery_types/${id}`, {
      ...params,
    });
    return 'Опция изменена';
  };

  /**
   * Создать тип доставки
   * @param param
   * @param id
   */
  const postDeliveryTypesItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/delivery_types', {
      ...params,
    });
    return 'Создан новый элемент';
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deleteDeliveryTypesItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/delivery_types/${id}`);
    return 'Элемент удален';
  };

  return {
    getDeliveryTypesList,
    putDeliveryTypesItem,
    postDeliveryTypesItem,
    deleteDeliveryTypesItem,
    deliveryTypesList,
  };
});
