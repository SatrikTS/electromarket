import {defineStore} from 'pinia'
import {MAX_PRICE} from '../constants'
import queryString from 'query-string'

export const useCatalogStore = defineStore({
  id: 'products-list-store',
  state: () => {
    return {
      productList: [],
      productItem: {
        image: [],
      },
      category: [],
      activeCategory: '',
      productsTotal: 0,
      productQuery: {
        page: 1,
        limit: 20,
        categories: '',
        brands: '',
        min_price: 0,
        max_price: MAX_PRICE,
        article: '',
        partial_title: ''
      },
      productImage: null,
      productId: null,
    }
  },
  actions: {
    /**
     * Получаем список продуктов
     * @param param
     */
    getProductList(param: any) {
      console.log(param);
      const urlParam = param ? `${queryString.stringify(param, {arrayFormat: 'comma'})}`
        : `${queryString.stringify(this.productQuery, {arrayFormat: 'bracket'})}`
      const url = `${useRuntimeConfig().public.SERVER_URL}/products?${urlParam}`
      fetch(url, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      })
      .then(response => response.json())
      .then((response) => {
        this.productList = response.data
        this.productsTotal = response.total
      })
      .catch((error) => {
        console.log(error)
      })
    },
    /**
     * Получаем один продукт
     * @param id
     */
    async getItemProduct(id: string) {
     return await fetch(`${useRuntimeConfig().public.SERVER_URL}/products/${id}`)
      .then(response => response.json())
      .then((response) => {
        return response.data
        // this.productsTotal = response.total
      })
      .catch((error) => {
        console.log(error)
      })
    },
    /**
     * Публикуем продукт
     * @param data
     */
    async postProductItem(data: any) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/products`, {
        headers: {
          'Authorization': 'Bearer ' + token.value,
        },
        method: 'POST',
        body: data,
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error)
      })
    },
    /**
     * Изменяем данные о продукте
     * @param data
     * @param productId
     */
    async putProductItem(data: any, productId: number) {
      const token = useCookie('token');
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value,
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error)
      })
    },
    /**
     * Удаляем один продукт
     * @param id
     */
    async removeProductItem(id: number) {
      const token = useCookie('token');
      fetch(`${useRuntimeConfig().public.SERVER_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token.value,
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        } else {
          return true
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  getters: {
    productListGetter: state => state.productList,
    productItemGetter: state => state.productItem,
    categoryGetter: state => state.category,
    activeCategoryGetter: state => state.activeCategory,
    productQueryGetter: state => state.productQuery,
    productsTotalGetter: state => state.productsTotal,
  },
})