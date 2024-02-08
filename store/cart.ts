import {defineStore} from 'pinia'
import {setCookie, getCookie} from '../utils/cookie'

interface CartItem {
  productId: string | number;
  count: number;
  productData: any
}

interface CartState {
  cartCount: number;
  cartSum: number;
  addedProductToCart: CartItem[];
}

export const useCartStore = defineStore({
  id: 'cart-store',
  state: (): CartState => {
    return {
      cartCount: 0,
      cartSum: 0,
      addedProductToCart: [],
    }
  },
  actions: {
    resetState() {
      this.cartCount = 0
      this.cartSum = 0
      this.addedProductToCart = []
    },
    addToCart(value: number, price: string, product: any) {
      if(getCookie('cartProducts')) this.addedProductToCart = JSON.parse(getCookie('cartProducts'))
      this.cartCount = value++

      if (getCookie('cartSum')) {
        this.cartSum = parseInt(getCookie('cartSum')) + parseFloat(price)
      } else {
        this.cartSum = this.cartSum + parseFloat(price)
      }


      const addedIndex = this.addedProductToCart.findIndex((item => item.productId === product.id))

      if (addedIndex !== -1) {
        this.addedProductToCart[addedIndex].count += 1
      } else {
        this.addedProductToCart.push({
          productId: product.id,
          count: 1,
          productData: product,
        })
      }

      const productList = JSON.stringify(this.addedProductToCart)
      setCookie('cartCount', this.cartCount, 8)
      setCookie('cartSum', this.cartSum, 8)
      setCookie('cartProducts', productList, 8)

    },
    removeFromCart(productId: string | number) {
      this.addedProductToCart = JSON.parse(getCookie('cartProducts'))

      this.addedProductToCart = this.addedProductToCart.filter((item) => {
        if (item.productId !== productId) {
          return item
        }
      })

      const productList = JSON.stringify(this.addedProductToCart)

      const sumResult = this.addedProductToCart.reduce((acc, curr) => {
        return acc + (curr.count *  curr.productData.price)
      }, 0)
      this.cartSum = sumResult

      const countResult = this.addedProductToCart.reduce((acc, curr) => {
        return acc + curr.count
      }, 0)
      this.cartCount = countResult

      setCookie('cartCount', countResult, 1)
      setCookie('cartSum', sumResult, 1)
      setCookie('cartProducts', productList, 1)
    },
    recalculation() {
      if(getCookie('cartProducts')) this.addedProductToCart = JSON.parse(getCookie('cartProducts'))

      const sumResult = this.addedProductToCart.reduce((acc, curr) => {
        return acc + (curr.count *  curr.productData.price)
      }, 0)
      this.cartSum = sumResult

      const countResult = this.addedProductToCart.reduce((acc, curr) => {
        return acc + curr.count
      }, 0)
      this.cartCount = countResult

      setCookie('cartCount', countResult, 1)
      setCookie('cartSum', sumResult, 1)

    },
    plusProductItemCount(productId, count) {
      if(getCookie('cartProducts')) this.addedProductToCart = JSON.parse(getCookie('cartProducts'))

      const itemProduct = this.addedProductToCart.filter((item) => {
        return item.productId === productId
      })
      itemProduct[0].count = count + 1
      setCookie('cartProducts', JSON.stringify(this.addedProductToCart), 1)
      this.recalculation()
    },
    minusProductItemCount(productId, count) {
      if(getCookie('cartProducts')) this.addedProductToCart = JSON.parse(getCookie('cartProducts'))

      const itemProduct = this.addedProductToCart.filter((item) => {
        return item.productId === productId
      })
      itemProduct[0].count = count - 1
      setCookie('cartProducts', JSON.stringify(this.addedProductToCart), 1)
      this.recalculation()
    }
  },
  getters: {
    cartGetter: state => state.cartCount,
    sumGetter: state => state.cartSum,
    addedCartProductGetter: state => state.addedProductToCart,
  },
})