import {defineStore} from 'pinia'

export const useImagesStore = defineStore({
  id: 'images-store',
  state: () => {
    return {
      imagesList: [],
    }
  },
  actions: {
    async removeItemImage(id: number) {
      const token = useCookie('token');
      fetch(`${useRuntimeConfig().public.SERVER_URL}/product_images/${id}`, {
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
    async postImages(data: any) {
      const token = useCookie('token');
      fetch(`${useRuntimeConfig().public.SERVER_URL}/product_images`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token.value,
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        } else {
          location.reload()
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
  }
})