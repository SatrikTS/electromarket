import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthorisationStore = defineStore('authStore', () => {
  const { $api } = useNuxtApp();
  const silentToken = ref()

  const authUser = async (dataForm) => {
    const { data } = await $api.post('/login', dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const userToken = useCookie('userToken', { maxAge: 10000 });
    const userId = useCookie('userId', { maxAge: 10000 });
    userToken.value = data.token;
    userId.value = data.userId;
  };

  const authYandex = async (userData) => {
      const { data} = await $api.post('/login_yandex', userData)
      const userToken = useCookie('userToken', { maxAge: 10000 });
      const userId = useCookie('userId', { maxAge: 10000 });
      userToken.value = data.token;
      userId.value = data.userId;
  }

  const saveVKSilentToken = async (token) => {
    const {data} = await $api.post('/login_vk', token)
    const userToken = useCookie('userToken', { maxAge: 10000 });
    const userId = useCookie('userId', { maxAge: 10000 });
    userToken.value = data.token;
    userId.value = data.userId;
  }

  const authVK = (userData) => {

    // const { data} = await $api.post('/login_yandex', userData)
    // const userToken = useCookie('userToken', { maxAge: 10000 });
    // const userId = useCookie('userId', { maxAge: 10000 });
    // userToken.value = data.token;
    // userId.value = data.userId;
  }

  const registrationUser = async (dataForm) => {
    const { data } = await $api.post('/register', dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data
  };

  const verificationUser = async (dataForm) => {
    const { data } = await $api.post('/verification', dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const userToken = useCookie('userToken', { maxAge: 10000 });
    userToken.value = data.token;

    return data
  };

  /**
   * Разлогинизация
   */
  const logoutUser = (): void => {
    const token = useCookie('userToken');
    const userId = useCookie('userId');
    token.value = null;
    userId.value = null;
  };

  return {
    authUser,
    logoutUser,
    registrationUser,
    verificationUser,
    authYandex,
    saveVKSilentToken,
    silentToken,
    authVK
  };
});