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
              name="pickup"
              class="order-btn"
              size="medium"
              :buttonStyle='orderInfo.isPickup ? "success": "inverse"'
              @click="setPickup"
            >Самовывоз
            </Button>
            <input
              v-if="orderInfo.isPickup"
              type="hidden"
              name="pickup"
              :value="orderInfo.isPickup"
            >
            <Button
              name="delivery"
              size="medium"
              :buttonStyle='orderInfo.isDelivery ? "success": "inverse"'
              class="order-btn"
              @click="setDelivery"
            >Транспортная компания
            </Button>
            <input
              v-if="orderInfo.isDelivery"
              type="hidden"
              name="delivery"
              :value="orderInfo.isDelivery"
            >
          </div>
        </section>
        <section
          class="order-form__section"
          v-if="orderInfo.isPickup && !orderInfo.isDelivery"
        >
          <small>
            <p>Самовывоз доступен только в Севастополе и Ялте</p>
          </small>
          <div class="order-form-row">
            <Button
              :buttonStyle='orderInfo.cityPickupSevastopol ? "success": "inverse"'
              class="order-btn"
              @click='setPickupCity("Севастополь")'
            >
              299029, г. Севастополь, ул Шабалина, д. 10-А
            </Button>
            <Button
              :buttonStyle='orderInfo.cityPickupYalta  ? "success": "inverse"'
              class="order-btn"
              @click='setPickupCity("Ялта")'
            >
              299029, г. Ялта, ул Ялтинская, д. 99
            </Button>
          </div>
        </section>
        <section
          class="order-form__section"
          v-if="orderInfo.isDelivery && !orderInfo.isPickup"
        >
          <small class="order-form-mark">
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
          </small>
          <div class="order-form-row">
            <Button
              :buttonStyle='orderInfo.deliveryCdek ? "success": "inverse"'
              class="order-btn"
              @click="setDeliveryCompany(DELIVERY_CDEK)"
            >
              {{ DELIVERY_CDEK }}
            </Button>
            <Button
              :buttonStyle='orderInfo.deliveryPost  ? "success": "inverse"'
              class="order-btn"
              @click="setDeliveryCompany(DELIVERY_POST)"
            >
              {{ DELIVERY_POST }}
            </Button>
            <Button
              :buttonStyle='orderInfo.deliveryDellin  ? "success": "inverse"'
              class="order-btn"
              @click="setDeliveryCompany(DELIVERY_DELOVIE_LINII)"
            >
              {{ DELIVERY_DELOVIE_LINII }}
            </Button>
          </div>
          <v-text-field
            v-model="personalData.address"
            label="Введите ваш адрес"
            :rules="requiredRules"
            variant="outlined"
            bg-color="white"
          />
        </section>
        <section class="order-form__section">
          <h3>3. Оплата заказ</h3>
          <div class="order-form-row">
            <Button
              class="order-btn"
              :buttonStyle='orderInfo.paymentTypeCard  ? "success": "inverse"'
              @click='setPaymentType("card")'
            >Онлайн оплата банковской картой
            </Button>
            <Button
              v-if="!orderInfo.isDelivery"
              class="order-btn"
              :buttonStyle='orderInfo.paymentTypeCash  ? "success": "inverse"'
              @click='setPaymentType("cash")'
            >Наличными или картой в Магазине
            </Button>
            <Button
              class="order-btn"
              :buttonStyle='orderInfo.paymentTypeBankTransfer  ? "success": "inverse"'
              @click='setPaymentType("bankTransfer")'
            >Банковский перевод
            </Button>
            <Button
              class="order-btn"
              :buttonStyle='orderInfo.paymentTypeCOD  ? "success": "inverse"'
              @click='setPaymentType("COD")'
            >Наложенный платеж
            </Button>
          </div>
        </section>
      </div>
      <div class="order-form__final">
        <h3>Ваш заказ</h3>
        <p v-if="orderInfo.isPickup">
          <b>Самовывоз:</b>
          <span v-if="orderInfo.cityPickupSevastopol">299029, г. Севастополь, ул Шабалина, д. 10-А</span>
          <span v-if="orderInfo.cityPickupYalta">299029, г. Ялта, ул Ялтинская, д. 99</span>
        </p>
        <p v-if="orderInfo.isDelivery">
          <b>Доставка:</b>
          <span v-if="orderInfo.deliveryCdek">{{ DELIVERY_CDEK }}</span>
          <span v-if="orderInfo.deliveryPost">{{ DELIVERY_POST }}</span>
          <span v-if="orderInfo.deliveryDellin">{{ DELIVERY_DELOVIE_LINII }}</span>
        </p>
        <p v-if="deliveryAddress">
          <b>Населенный пункт:</b>
          {{ deliveryAddress }}
        </p>
        <p>
          <b>Оплата:</b>
          <span v-if="orderInfo.paymentTypeCard">Банковской картой</span>
          <span v-if="orderInfo.paymentTypeCash">Наличными при получении</span>
          <span v-if="orderInfo.paymentTypeBankTransfer">Банковский перевод по реквизитам</span>
          <span v-if="orderInfo.paymentTypeCOD">Наложенным платежом</span>
        </p>
        <p>
          <b>Общая сумма заказа:</b>
          {{ totalSum }} ₽
        </p>
        <br>
        <v-btn
          :disabled="countOfTrue < 3 ? true : false"
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
  </div>
</template>
<script setup>
import { DELIVERY_CDEK, DELIVERY_POST, DELIVERY_DELOVIE_LINII } from '~/constants'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '~/store/cart'
import { emailRules, requiredRules, phoneRules } from '~/utils/validation'
import { usePersonalStore } from '~/store/personal-store';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['orderComplete'])

const { personalData } = storeToRefs(usePersonalStore());
const cartStore = useCartStore()
const { resetState } = cartStore
const form = ref()
const name = ref('')
const email = ref('')
const phone = ref('')
const totalSum = ref()
const isFormSend = ref(false)

const orderInfo = ref({})
const deliveryType = ref()
const deliveryCompany = ref()
const deliveryAddress = ref()
const paymentType = ref()
const pickupAddress = ref()
const productList = ref()

onMounted(() => {
  if (getCookie('cartProducts')) {
    totalSum.value = getCookie('cartSum')
    productList.value = JSON.parse(getCookie('cartProducts'))
  }
})

const countOfTrue = computed(() => {
  let count = 0
  for (let prop in orderInfo.value) {
    if (orderInfo.value[prop] === true) {
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

function setPickup() {
  resetObjectvalues()
  orderInfo.value.isPickup = true
  deliveryType.value = 'pickup'
}

function setDelivery() {
  resetObjectvalues()
  orderInfo.value.isDelivery = true
  deliveryType.value = 'delivery'
}

function setPickupCity(city) {
  if (city === 'Севастополь') {
    orderInfo.value.cityPickupSevastopol = true
    orderInfo.value.cityPickupYalta = false
  }
  if (city === 'Ялта') {
    orderInfo.value.cityPickupYalta = true
    orderInfo.value.cityPickupSevastopol = false
  }

  orderInfo.value.deliveryCdek = false
  orderInfo.value.deliveryPost = false
  orderInfo.value.deliveryDellin = false
  pickupAddress.value = city
  deliveryCompany.value = null
}

const setDeliveryCompany = (company) => {
  const deliveryCompanies = {
    [DELIVERY_CDEK]: { deliveryCdek: true, deliveryPost: false, deliveryDellin: false },
    [DELIVERY_POST]: { deliveryPost: true, deliveryCdek: false, deliveryDellin: false },
    [DELIVERY_DELOVIE_LINII]: { deliveryDellin: true, deliveryCdek: false, deliveryPost: false },
  }

  Object.assign(orderInfo.value, deliveryCompanies[company])
  orderInfo.value.cityPickupSevastopol = false
  orderInfo.value.cityPickupYalta = false
  deliveryCompany.value = company
  pickupAddress.value = null
}

const setPaymentType = (type) => {
  const paymentTypes = {
    card: { paymentTypeCard: true, paymentTypeCash: false, paymentTypeBankTransfer: false, paymentTypeCOD: false },
    cash: { paymentTypeCash: true, paymentTypeCard: false, paymentTypeBankTransfer: false, paymentTypeCOD: false },
    bankTransfer: {
      paymentTypeBankTransfer: true,
      paymentTypeCard: false,
      paymentTypeCash: false,
      paymentTypeCOD: false,
    },
    COD: { paymentTypeCOD: true, paymentTypeBankTransfer: false, paymentTypeCard: false, paymentTypeCash: false },
  }

  Object.assign(orderInfo.value, paymentTypes[type])
  paymentType.value = type
}

function resetCartState(form) {
  resetObjectvalues()
  form.reset()
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
    .replace(/^ +/, '')
    .replace(/=.*/, `=;expires=${ new Date(0).toUTCString() };path=/`)
  })
  resetState()
}

function confirmOrder() {
  if (form.value.isValid) {

    const orderData = {
      name: personalData.value.name,
      email: personalData.value.email,
      phone: personalData.value.phone,
      deliveryType: pickupAddress.value ? pickupAddress.value : deliveryType.value,
      // pickupAddress: pickupAddress.value,
      deliveryCompany: deliveryCompany.value,
      deliveryAddress: personalData.value.address,
      paymentType: paymentType.value,
      productList: getCookie('cartProducts'),
    }

    console.log(orderData)
  }

  // isFormSend.value = true

  // resetCartState(e.target)
  // setTimeout(() => {
  //   isFormSend.value = false
  // emit('orderComplete')
  // }, 2000)
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