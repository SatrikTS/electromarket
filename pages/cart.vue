<template>
  <div class="page">
    <h2>Корзина</h2>
    <br />
    <div class="wrapper">
      <div
        class="final-content"
        v-show="isCartList"
      >
        <div v-if="cartList">
          <product-cart
            v-for="item in cartList"
            :data="item.productData"
            :count="item.count"
            :id="item.productId"
            :key="item.productId"
            @removeProductFromCart="showRemoveModal(item.productId)"
          />
        </div>
        <div v-else>
          Нет добавленных товаров
        </div>
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
        <v-btn
          v-if="isCartList"
          :disabled="totalCount > 0 ? false : true"
          color="#27ae60"
          type="button"
          @click="getOrderForm"
        >Оформить заказ
        </v-btn>
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
              @click="confirmRemoveProductFromCart"
            >Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </Transition>
  </div>
</template>
<script
  setup
  lang="ts"
>
import Modal from '../components/modal/index';
import { onMounted, watch, ref } from 'vue';
import { getCookie } from '~/utils/cookie';

definePageMeta({
  layout: 'checkout',
});
import { useCartStore } from '~/store/cart';
import { useCatalogStore } from '~/store/products-list';
import Button from '../features/Button/Button';

const cartStore = useCartStore();
const catalogStore = useCatalogStore();
const { getProductList } = catalogStore;
const totalSum = ref();
const totalCount = ref();
const cartList = ref();
const isCartList = ref(true);
const isShowModal = ref(false);
const removeParam = ref();
const { removeFromCart } = cartStore;
const token = useCookie('token');

const confirmRemoveProductFromCart = () => {
  removeFromCart(removeParam.value);
  removeParam.value = '';
  isShowModal.value = false;
}

const showRemoveModal = (param) => {
  isShowModal.value = true;
  removeParam.value = param;
}

const getOrderForm = async (): Promise<void> => {
  const userToken = useCookie('userToken');
  if (userToken.value) {
    await navigateTo('/ordering');
  } else {
    await navigateTo('/checkout');
  }
};

function closeModal(param) {
  isShowModal.value = param;
}

onMounted(() => {
  if (cartStore.cartGetter) {
    getProductList();
  }

  totalSum.value = getCookie('cartSum');
  totalCount.value = getCookie('cartCount');
  console.log(getCookie('cartProducts'));
  if (getCookie('cartProducts')) cartList.value = JSON.parse(getCookie('cartProducts'));
});

watch(
  () => cartStore.addedCartProductGetter,
  (newValue) => {
    cartList.value = newValue;
  },
);

watch(
  () => cartStore.sumGetter,
  (newValue) => {
    totalSum.value = newValue;
  },
);

watch(
  () => cartStore.cartGetter,
  (newValue) => {
    totalCount.value = newValue;
  },
);
</script>
<style
  scoped
  lang="scss"
>
.page {
  padding: 0 0 $offset-xlarge;
}

.wrapper {
  display: grid;
  align-items: flex-start;
  grid-template-columns: calc(62% - 16px) 38%;
  gap: 16px;
}

.final-content {
  gap: 16px;
}

.final-result {
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: flex-start;
  background: #f3f3f3;
  border-radius: 8px;
  padding: 24px;
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