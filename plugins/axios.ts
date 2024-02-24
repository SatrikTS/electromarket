import axios from 'axios';
import { useApiErrorsStore } from '~/store/api-errors-store';

export default defineNuxtPlugin(() => {
  const defaultUrl = `${useRuntimeConfig().public.SERVER_URL}`;
  const token = useCookie('token');
  const { createErrorMessage } = useApiErrorsStore();

  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
      put: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.value,
      },
      post: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.value,
      },
      delete: {
        Authorization: 'Bearer ' + token.value,
      },
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status >= 500) {
        createErrorMessage(error.message);
      }

      if (error.response && error.response.data) {
        createErrorMessage(error.response.data.message);
      }

      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api,
    },
  };
});
