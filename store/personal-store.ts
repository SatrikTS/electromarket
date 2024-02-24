import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePersonalStore = defineStore('personalStore', () => {
  const { $api } = useNuxtApp();
  const personalList = ref()
  const personalData = ref()

  /**
   *
   * @param userId
   */
  const getPersonalList = async () => {
    const token = useCookie('userToken');
    const { data } = await $api.get(`/personal`, {
      headers: {
        Authorization: 'Bearer ' + token.value,
      },
    });
    personalList.value = data
  };

  const getPersonalData = async (id: number = undefined) => {
    const token = useCookie('userToken');
    const userId = useCookie('userId');
    const resultId = id ? id : userId.value
    const { data } = await $api.get(`/personal/${resultId}`, {
      headers: {
        Authorization: 'Bearer ' + token.value,
      },
    });
    personalData.value = data.data
  };


  const putPersonalData = async (id, params) => {
    const token = useCookie('userToken');
    const { data } = await $api.put(`/personal/${id}`, params, {
      headers: {
        Authorization: 'Bearer ' + token.value,
      }
    });
    return data.message
  };

  return {
    getPersonalData,
    putPersonalData,
    personalData,
  };
});