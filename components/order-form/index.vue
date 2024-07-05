<template>
  <div class="order-form">
    <h2>Оформление заказа</h2>
    <br />
    <v-form
      ref="form"
      class="order-form__form"
      @submit.prevent
    >
      <div class="order-form__main">
        <section class="order-form__section">
          <h3>1. Укажите данные получателя заказа</h3>
          <v-text-field
            v-model="personalData.name"
            label="Имя"
            :rules="requiredRules"
            variant="outlined"
            bg-color="white"
          />
          <v-text-field
            v-model="personalData.phone"
            label="Телефон"
            :rules="phoneRules"
            variant="outlined"
            bg-color="white"
            hide-spin-buttons
            type="number"
          />
          <v-text-field
            v-model="personalData.email"
            label="email"
            :rules="emailRules"
            variant="outlined"
            bg-color="white"
          />
        </section>
        <section class="order-form__section">
          <h3>2. Выберите способ доставки</h3>
          <div class="order-form-row">
            <Button
              v-for="item in deliveryTypesList.data"
              name="pickup"
              class="order-btn"
              size="medium"
              :buttonStyle='orderInfo.deliverytype_id === item.id ? "success": "inverse"'
              @click="setDeliveryType(item.id)"
            >{{ item.title }}
            </Button>
          </div>
        </section>
        <section
          class="order-form__section"
          v-if="orderInfo.deliverytype_id  !== 1 && orderInfo.deliverytype_id  !== 2"
        >
          <div class="order-form-mark">
            <p>Рассчитать стоимость доставки из Севастополя в ваш пункт выдачи можно рассчитать на официальных сайтах
               компаний
            </p>
            <p>Посмотреть ссылки на официальные сайты транспортных компаний можно
              <NuxtLink
                to="/delivery"
                target="_blank"
                class="link"
              >здесь
              </NuxtLink>
            </p>
          </div>
          <v-text-field
            v-model="personalData.address"
            label="Введите адрес доставки"
            :rules="requiredRules"
            variant="outlined"
            bg-color="white"
          />
        </section>
        <section class="order-form__section">
          <h3>3. Оплата заказ</h3>
          <div class="order-form-row">
            <Button
              v-for="item in payTypesList.data"
              :key="item.id"
              class="order-btn"
              :buttonStyle='orderInfo.paytype_id ===  item.id ? "success": "inverse"'
              @click='setPaymentType(item.id)'
            >
              {{ item.title }}
            </Button>
          </div>
        </section>
      </div>
      <div class="order-form__final">
        <h3>Ваш заказ</h3>
        <p>
          <b>Доставка: </b>
          <span v-if="orderInfo.deliverytype_id">{{ DeliveryTypes[orderInfo.deliverytype_id] }}</span>
        </p>
        <p>
          <b>Оплата:</b>
          <span v-if="orderInfo.paytype_id">{{ PayTypes[orderInfo.paytype_id] }}</span>
        </p>
        <p>
          <b>Общая сумма заказа:</b>
          {{ totalSum }} ₽
        </p>
        <br>
        <v-btn
          :disabled="countOfTrue < 2 ? true : false"
          color="#27ae60"
          type="submit"
          @click="confirmOrder"
        >Подтвердить заказ
        </v-btn>
        <div class="order-form__notation">
          Если доставка осуществляется транспортной компанией, сумма может изменится в зависимости от вашего
          населенного пункта и транспортной компании.
          Точную сумму уточнит наш менеджер после обращения в транспортную компанию
        </div>
        <div v-if="productList">
          <ProductCheckout
            v-for="item in productList"
            :data="item"
          />
        </div>
      </div>
    </v-form>
    <v-alert
      v-if="updateMsg"
      type="success"
      class="alert"
    >
      {{ updateMsg }}
    </v-alert>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '~/store/cart'
import { emailRules, requiredRules, phoneRules } from '~/utils/validation'
import { usePersonalStore } from '~/store/personal-store';
import { storeToRefs } from 'pinia';
import { usePayTypeStore } from '~/store/pay-type-store';
import { useDeliveryTypeStore } from '~/store/delivery-type-store';
import { useOrdersStore } from '~/store/orders-store';
import {PayTypes, DeliveryTypes} from './types'

const emit = defineEmits(['orderComplete'])

const { personalData } = storeToRefs(usePersonalStore());
const cartStore = useCartStore()
const { resetState } = cartStore
const form = ref()
const name = ref('')
const email = ref('')
const phone = ref('')
const totalSum = ref()
const updateMsg = ref('')

const orderInfo = ref({})
const productList = ref()
const { getPayTypesList } = usePayTypeStore();
const { payTypesList } = storeToRefs(usePayTypeStore());
const { getDeliveryTypesList } = useDeliveryTypeStore();
const { postOrder } = useOrdersStore();
const { deliveryTypesList } = storeToRefs(useDeliveryTypeStore());
const { getPersonalData } = usePersonalStore();

await getPersonalData();
await getPayTypesList();
await getDeliveryTypesList();

onMounted(() => {
  if (getCookie('cartProducts')) {
    totalSum.value = getCookie('cartSum')
    productList.value = JSON.parse(getCookie('cartProducts'))
  }
})

const countOfTrue = computed(() => {
  let count = 0

  for (let prop in orderInfo.value) {
    if (orderInfo.value[prop]) {
      count++
    }
  }

  return count
})

function resetObjectvalues() {
  for (let prop in orderInfo.value) {
    orderInfo.value[prop] = false
  }
}

const setPaymentType = (type) => {
  Object.assign(orderInfo.value, { paytype_id: type })
}

const setDeliveryType = (type) => {
  Object.assign(orderInfo.value, { deliverytype_id: type })
}

function resetCartState(form) {
  resetObjectvalues()

  const keysToRemove = ['cartCount', 'cartSum', 'cartProducts'];

  document.cookie.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=');
    const trimmedKey = key.trim();

    if (keysToRemove.includes(trimmedKey)) {
      document.cookie = `${trimmedKey}=;expires=${ new Date(0).toUTCString() };path=/`;
    }
  });

  navigateTo('/personal')
}

async function confirmOrder() {
  if (form.value.isValid) {

    let productBox = JSON.parse(getCookie('cartProducts')).map((item) => {
      return {
        product_article: item.productData.article,
        product_id: item.productId,
        product_count: item.count
      }
    })

    const orderData = {
      user_id: personalData.value.id,
      user_name: personalData.value.name,
      user_email: personalData.value.email,
      user_phone: personalData.value.phone,
      deliverytype_id: orderInfo.value.deliverytype_id,
      paytype_id: orderInfo.value.paytype_id,
      statusorder_id: 1,
      delivery_address: personalData.value.address,
      product_box: productBox,
    }

    const response = await postOrder(orderData)
    updateMsg.value = response
    setTimeout(() => {
      updateMsg.value = ''
      resetCartState()
    }, 3000)
  }
}
</script>
<style
  scoped
  lang="scss"
>
.order-form {

  h3 {
    margin: 0 0 16px;
  }

  &__form {
    display: grid;
    align-items: flex-start;
    grid-template-columns: calc(62% - 16px) 38%;
    gap: 16px;

    @media (max-width: $mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__main {

  }

  &__section {
    margin: 0 0 16px;
    background: $bg-base;
    border-radius: 8px;
    padding: $offset-large $offset-large $offset-small;
  }

  &__notation {
    padding: 12px 0;
    font-size: 14px;
    line-height: 1.5;
  }

  button.success:hover {
    background: $success;
    color: $bg-base;
  }

  b {
    font-size: 14px;
    margin-right: $offset-small;
  }
}

.order-btn {
  margin: $offset-small;
}

.order-form-mark {
  margin: 0 0 8px;
}

.order-form-row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: 8px;

  button {
    margin-top: 0;
  }
}

.order-form-input {
  margin: $offset-small 0 0;
}

.order-form__final {
  background: $bg-base;
  border-radius: 8px;
  padding: $offset-large $offset-large $offset-small;
}
</style>