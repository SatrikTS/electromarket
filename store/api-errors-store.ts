import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useApiErrorsStore = defineStore('api-errors', () => {
  const errorMessage = ref('');

  /**
   * Метод для обработки ошибок
   * @param message
   */
  const createErrorMessage = (message: string): void => {
    errorMessage.value = message;

    setTimeout(() => (errorMessage.value = ''), 4000);
  };

  return {
    createErrorMessage,
    errorMessage,
  };
});
