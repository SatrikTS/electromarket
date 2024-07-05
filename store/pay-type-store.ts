import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Типы оплаты
 */
export const usePayTypeStore = defineStore('payTypesStore', () => {
  const payTypesList = ref();
  const { $api } = useNuxtApp();

  /**
   * Получить список оплат
   */
  const getPayTypesList = async (): Promise<void> => {
    const { data } = await $api.get('/pay_types');
    payTypesList.value = data;
  };

  /**
   * Изменить тип оплаты
   * @param param
   * @param id
   */
  const putPayTypesItem = async (
    params,
    id: number,
  ): Promise<string> => {
    const { data } = await $api.put(`/pay_types/${id}`, {
      ...params,
    });
    return 'Опция изменена';
  };

  /**
   * Создать тип оплаты
   * @param param
   * @param id
   */
  const postPayTypesItem = async (params: OptionsListItem): Promise<string> => {
    const { data } = await $api.post('/pay_types', {
      ...params,
    });
    return 'Создан новый элемент';
  };

  /**
   * Удаляем элемент из таблицы
   * @param id
   */
  const deletePayTypesItem = async (id: number): Promise<string> => {
    const { data } = await $api.delete(`/pay_types/${id}`);
    return 'Элемент удален';
  };

  return {
    getPayTypesList,
    putPayTypesItem,
    postPayTypesItem,
    deletePayTypesItem,
    payTypesList,
  };
});
