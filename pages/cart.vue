<template>
  <div class="page">
    <h1>Корзина</h1>
    <div class="wrapper">
      <div
        class="final-content"
        v-show="isCartList"
      >
        <div v-if="isOrderCompleteFinal">
          <p>Поздравляем, Заказ оформлен!</p>
          <p>Ожидайте с вами свяжуться, чтобы уточнить детали заказ</p>
          <p>Транспортные расходы по доставке не входят в стоимость заказа и оплачиваются отдельно транспортной
             компании
          </p>
        </div>
        <div v-if="cartList">
          <product-cart
            v-for="item in cartList"
            :name="item.productData.name"
            :description="item.productData.description"
            :price="item.productData.price"
            :img="item.productData.images"
            :id="item.productId"
            :feature="item.productData.feature"
            :key="item.productData.name"
            :count="item.count"
            @removeProductFromCart="showRemoveModal(item.productId)"
          />
        </div>
        <div v-else>
          Нет добавленных товаров
        </div>
      </div>
      <div
        v-show="!isCartList"
        class="final-content"
      >
        <OrderForm
          :totalSum="totalSum"
          @orderComplete="orderComplete"
        />
      </div>
      <div class="final-result">
        <h3>Ваш заказ</h3>
        <div class="final-list">
          <span class="final-list-item">
            Выбрано товаров: <b>
            {{ totalCount }} шт.
          </b>
          </span>
          <span class="final-list-item">
            Общая стоимость: <b>{{ totalSum }} ₽.</b>
          </span>
        </div>
        <Button
          v-if="isCartList"
          :disabled="totalCount > 0 ? false : true"
          buttonStyle="success"
          type="button"
          @click="getOrderForm"
        >Оформить заказ
        </Button>
        <Button
          v-if="!isCartList"
          buttonStyle="warning"
          type="button"
          @click="isCartList = true"
        >Содержимое корзины
        </Button>
      </div>
    </div>
    <Transition
      name="modal"
      @closeModal="closeModal"
    >
      <Modal v-if="isShowModal">
        <div class="modal-remove">
          <div class="modal-remove-text">
            Вы уверены что хотите удалить товар из корзины?
          </div>
          <div class="modal-remove-bottom">
            <Button
              buttonStyle="default"
              @click="isShowModal = false"
            >Отмена
            </Button>
            <Button
              buttonStyle="danger"
              @click="removeProductFromCart"
            >Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </Transition>
    <Transition
      name="modal">
      <AuthModal
        :isShowModal="isShowAuthModal"
      ></AuthModal>
    </Transition>
    {{ isShowAuthModal }}
  </div>
</template>
<script setup>
import Modal from '../components/modal/index'
import AuthModal from '../components/auth-modal/index'
import { onMounted, watch, ref } from 'vue'
import { getCookie } from '~/utils/cookie'

definePageMeta({
  layout: 'pages',
})
import { useCartStore } from '~/store/cart'
import { useCatalogStore } from '~/store/products-list'
import { storeToRefs } from 'pinia'
import Button from '../features/Button/Button'
import {useAuthStore} from "~/store/auth"

const cartStore = useCartStore()
const catalogStore = useCatalogStore()
const { getProductList } = catalogStore
const { productListGetter } = storeToRefs(catalogStore)
const totalSum = ref()
const totalCount = ref()
const cartList = ref()
const isCartList = ref(true)
const isOrderCompleteFinal = ref(false)
const isShowModal = ref(false)
const isShowAuthModal = ref(false)
const removeParam = ref()
const { removeFromCart } = cartStore
const authStore = useAuthStore()
const { authenticateAdmin } = authStore
const { authenticated, authStatusGetter } = storeToRefs(authStore);

function removeProductFromCart() {
  removeFromCart(removeParam.value)
  removeParam.value = ''
  isShowModal.value = false
}

function showRemoveModal(param) {
  isShowModal.value = true
  removeParam.value = param
}

function getOrderForm() {
  // if()
  console.log(useCookie('token').value)
  if(useCookie('token').value) {
    isCartList.value = false
  } else {
    isShowAuthModal.value = true
  }
}

function orderComplete() {
  isCartList.value = true
  isOrderCompleteFinal.value = true
}

function closeModal(param) {
  isShowModal.value = param
}

onMounted(() => {
  if (cartStore.cartGetter) {
    getProductList()
  }

  totalSum.value = getCookie('cartSum')
  totalCount.value = getCookie('cartCount')
  if (getCookie('cartProducts')) cartList.value = JSON.parse(getCookie('cartProducts'))
})

watch(
  () => cartStore.addedCartProductGetter,
  (newValue) => {
    cartList.value = newValue
  },
)

watch(
  () => cartStore.sumGetter,
  (newValue) => {
    totalSum.value = newValue
  },
)

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    totalCount.value = newValue
  },
)
</script>
<style
  scoped
  lang="scss"
>
.page {
  padding: 0 0 $offset-xlarge;
}

.wrapper {
  display: flex;
}

.final-content {
  flex: 1;
  margin-right: $offset-large-2;
}

.final-result {
  border: 1px solid #e5e5e5;
  display: flex;
  transition: box-shadow 0.25s ease-in-out;
  border-radius: 3px;
  padding: $offset-base;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
}

.final-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 $offset-base;
}

.final-list-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 0 0 8px;
}

.modal-remove {
  display: flex;
  flex-direction: column;
}

.modal-remove-text {
  margin: 0 0 $offset-large;
}

.modal-remove-bottom {
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: $offset-base;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>