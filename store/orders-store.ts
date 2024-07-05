import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Типы доставки
 */
export const useOrdersStore = defineStore('ordersStore', () => {
  const { $api } = useNuxtApp();
  const ordersList = ref()
  const ordersItem = ref()

  /**
   * Получить список
   */
  const getOrders = async (): Promise<void> => {
    const userToken = useCookie('userToken');
    const { data } = await $api.get(
      '/orders',
      {
        headers: {
          Authorization: 'Bearer ' + userToken.value,
        },
      },
    );
    ordersList.value = data;
  };

  const getAdminOrders = async (params): Promise<void> => {
    const token = useCookie('token');

    const { data } = await $api.get(
      '/orders-admin',
      {
        params: params,
        headers: {
          Authorization: 'Bearer ' + token.value,
        }
      },
    );
    ordersList.value = data;
  };

  const getOrder = async (id: string): Promise<void> => {
    const token = useCookie('token');
    const { data } = await $api.get(
       `/orders-admin/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token.value,
        },
      },
    );
    ordersItem.value = data.data;
  };

  /**
   * Создать новый заказ
   * @param param
   * @param id
   */
  const postOrder = async (params): Promise<string> => {
    const token = useCookie('userToken');
    const { data } = await $api.post('/orders', {
      ...params,
    },{
      headers: {
        Authorization: 'Bearer ' + token.value,
      },
    });
    return data.message;
  };

  /**
   * Редактировать заказ от админа
   * @param param
   * @param id
   */
  const putOrderAdmin = async (id, params): Promise<string> => {
    const { data } = await $api.put(`/orders-admin/${id}`, {
      ...params,
    });
    return data.message;
  };

  return {
    getOrders,
    postOrder,
    getAdminOrders,
    ordersList,
    getOrder,
    ordersItem,
    putOrderAdmin,
  };
});
