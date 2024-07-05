import { defineStore } from 'pinia';

interface Category {
  id: number;
}

export const useCategoryStore = defineStore({
  id: 'category-store',
  state: () => {
    return {
      categoryList: null as Category[] | null,
      totalCategory: null,
      categoryItem: null,
    };
  },
  actions: {
    async getCategoryList(maxViews: number | null, parentCategory?: number, title?: undefined) {
      let urlParam = maxViews ? `limit=${maxViews}` : '';
      if (parentCategory !== undefined) {
        urlParam += `${urlParam ? '&' : ''}parent=${parentCategory}`;
      }

      if(title !== undefined) {
        urlParam += `${urlParam ? '&' : ''}partial_title=${title}`;
      }

      const url = `${useRuntimeConfig().public.SERVER_URL}/categories?${urlParam}`;

      return fetch(url)
      .then(response => response.json())
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error);
      });
    },
    // TODO: переделать все ответы запросов в соответсвии с данным методом
    async postCategory(data: any) {
      const token = useCookie('token');

      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        body: data,
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
    async putCategory(data: any, id: number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token.value,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async getCategoryItem(id: string | number) {
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/categories/${id}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then((response) => this.categoryItem = response.data);
    },
    async removeCategory(id: number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Произошла ошибка');
        } else {
          return response.json();
        }
      })
      .then(response => response)
      .catch((error) => {
        console.log(error);
      });
    },
    async postCategoryImages(data: FormData) {
      const token = useCookie('token');
      return fetch(`${useRuntimeConfig().public.SERVER_URL}/category_images`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        body: data,
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
    async removeCategoryImages(id: number) {
      const token = useCookie('token');
      return fetch(`${useRuntimeConfig().public.SERVER_URL}/category_images/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        method: 'DELETE',
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
  },
  getters: {
    categoryListGetter: state => state.categoryList,
    categoryTotalGetter: state => state.categoryList,
    categoryItemGetter: state => state.categoryItem,
  },
});