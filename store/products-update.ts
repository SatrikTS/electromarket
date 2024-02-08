import { defineStore } from 'pinia';

export const useProductsUpdate = defineStore({
  id: 'products-update',
  state: () => {
    return {}
  },
  actions: {
    async updateBalance(data: any) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/import-balance`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        body: data
      })
      .then((response) => response.json())
      .then((response) => {
        return {result: true}
      })
      .catch((error) => {
        console.log(error)
      })
    },
    async updatePrices(data: any) {
      const token = useCookie('token');
      return await fetch(`https://back.sevinstrument.ru/api/import-price`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        body: data
      })
      .then((response) => response.json())
      .then(() => {
        return {result: true}
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {

  }
})