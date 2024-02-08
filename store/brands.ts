import { defineStore } from 'pinia';

interface Brands {
  id: number;
}

export const useBrandsStore = defineStore({
  id: 'brands-store',
  state: () => {
    return {
      brandsList: null as Brands[] | null,
      brandItem: null,
    };
  },
  actions: {
    async getBrandsList() {
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/brands?limit=1000`)
      .then(response => response.json())
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
    },
    async postBrand(data: any) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/brands`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async putBrand(data: any, id: number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/brands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value,
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async getBrandItem(id: string | number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/brands/${id}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then((response) => {
        return this.brandItem = response.data;
      });
    },
    async removeBrand(id: number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/brands/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
      })
      .then(response=> response.json())
      .catch((error) => {
        console.log(error);
      });
    },
    async postBrandImages(data: FormData) {
      const token = useCookie('token');
      return fetch(`${useRuntimeConfig().public.SERVER_URL}/brand_images`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async removeBrandImages(id: number) {
      const token = useCookie('token');
      return fetch(`${useRuntimeConfig().public.SERVER_URL}/brand_images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          return response.json();
        }
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  getters: {
    brandsListListGetter: state => state.brandsList,
    brandsItemGetter: state => state.brandItem,
  },
});