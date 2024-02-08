<template>
  <div class='order-form'>
    <h2>Оформление заказа</h2>
    <form
      @submit.prevent='confirmOrder'
      id='order-form'
    >
      <section class='order-form-section'>
        <h3>1. Укажите данные получателя заказа</h3>
        <TextInput
          required
          placeholder='Имя'
          name='name'
          :value="name"
          @update:value="name = $event"
        />
        <TextInput
          required
          placeholder='Телефон'
          name='phone'
          :value="phone"
          @update:value="phone = $event"
        />
        <TextInput
          required
          placeholder='Email'
          type='email'
          name='email'
          :value="email"
          @update:value="email = $event"
        />
      </section>
      <section class='order-form-section'>
        <h3>2. Выберите способ доставки</h3>
        <div class='order-form-row'>
          <Button
            name='pickup'
            class='order-btn'
            size='large'
            :buttonStyle='orderInfo.isPickup ? "success": "default"'
            @click='setPickup'
          >Самовывоз
          </Button>
          <input
            v-if='orderInfo.isPickup'
            type="hidden"
            name="pickup"
            :value="orderInfo.isPickup"
          >
          <Button
            name='delivery'
            size='large'
            :buttonStyle='orderInfo.isDelivery ? "success": "default"'
            class='order-btn'
            @click='setDelivery'
          >Транспортная компания
          </Button>
          <input
            v-if='orderInfo.isDelivery'
            type="hidden"
            name="delivery"
            :value="orderInfo.isDelivery"
          >
        </div>
      </section>
      <div
        class='order-form-info-delivery'
        v-if='orderInfo.isPickup && !orderInfo.isDelivery'
      >
        <small>
          <p>Самовывоз доступен только в Севастополе и Ялте</p>
        </small>
        <div class='order-form-row'>
          <Button
            :buttonStyle='orderInfo.cityPickupSevastopol ? "success": "default"'
            class='order-btn'
            @click='setPickupCity("Севастополь")'
          >
            299029, г. Севастополь, ул Шабалина, д. 10-А
          </Button>
          <Button
            :buttonStyle='orderInfo.cityPickupYalta  ? "success": "default"'
            class='order-btn'
            @click='setPickupCity("Ялта")'
          >
            299029, г. Ялта, ул Ялтинская, д. 99
          </Button>
          <input
            v-if='orderInfo.cityPickupSevastopol'
            type="hidden"
            name="pickupAddress"
            value="Севастополь"
          >
          <input
            v-if='orderInfo.cityPickupYalta '
            type="hidden"
            name="pickupAddress"
            value="Ялта"
          >
        </div>
      </div>
      <div
        class='order-form-info-delivery'
        v-if='orderInfo.isDelivery && !orderInfo.isPickup'
      >
        <small class='order-form-mark'>
          <p>Рассчитать стоимость доставки из Севастополя в ваш пункт выдачи можно рассчитать на официальных сайтах
             компаний
          </p>
          <p>Посмотреть ссылки на официальные сайты транспортных компаний можно
            <NuxtLink
              to='/delivery'
              target="_blank"
              class='link'
            >здесь
            </NuxtLink>
          </p>
        </small>
        <div class='order-form-row'>
          <Button
            :buttonStyle='orderInfo.deliveryCdek ? "success": "default"'
            class='order-btn'
            @click='setDeliveryCompany(DELIVERY_CDEK)'
          >
            {{ DELIVERY_CDEK }}
          </Button>
          <input
            v-if='orderInfo.deliveryCdek '
            type="hidden"
            name="deliveryType"
            :value="DELIVERY_CDEK"
          >
          <Button
            :buttonStyle='orderInfo.deliveryPost  ? "success": "default"'
            class='order-btn'
            @click='setDeliveryCompany(DELIVERY_POST)'
          >
            {{ DELIVERY_POST }}
          </Button>
          <input
            v-if='orderInfo.deliveryPost '
            type="hidden"
            name="deliveryType"
            :value="DELIVERY_POST"
          >
          <Button
            :buttonStyle='orderInfo.deliveryDellin  ? "success": "default"'
            class='order-btn'
            @click='setDeliveryCompany(DELIVERY_DELOVIE_LINII)'
          >
            {{ DELIVERY_DELOVIE_LINII }}
          </Button>
          <input
            v-if='orderInfo.deliveryDellin '
            type="hidden"
            name="deliveryType"
            :value="DELIVERY_DELOVIE_LINII"
          >
        </div>
        <TextInput
          required
          placeholder='Введите ваш населенный пункт'
          class='order-form-input'
          name='location'
          :value="location"
          @update:value="location = $event"
        />
      </div>
      <section class='order-form-section'>
        <h3>3. Оплата заказ</h3>
        <div class='order-form-row'>
          <Button
            class='order-btn'
            :buttonStyle='orderInfo.paymentTypeCard  ? "success": "default"'
            @click='setPaymentType("card")'
          >Онлайн оплата банковской картой
          </Button>
          <input
            v-if='orderInfo.paymentTypeCard '
            type="hidden"
            name="paymentType"
            value="Оплата картой"
          >
          <Button
            v-if='!orderInfo.isDelivery'
            class='order-btn'
            :buttonStyle='orderInfo.paymentTypeCash  ? "success": "default"'
            @click='setPaymentType("cash")'
          >Наличными или картой в Магазине
          </Button>
          <input
            v-if='orderInfo.paymentTypeCash '
            type="hidden"
            name="paymentType"
            value="Оплата наличными"
          >
          <Button
            class='order-btn'
            :buttonStyle='orderInfo.paymentTypeBankSend  ? "success": "default"'
            @click='setPaymentType("bankSend")'
          >Банковский перевод
          </Button>
          <input
            v-if='orderInfo.paymentTypeBankSend '
            type="hidden"
            name="paymentType"
            value="Оплата банковским переводом"
          >
        </div>
      </section>
      <div
        v-if='Object.keys(orderInfo).length'
        class='order-form-final'
      >
        <p v-if='orderInfo.isPickup'>
          <b>Самовывоз:</b>
          <span v-if='orderInfo.cityPickupSevastopol'>299029, г. Севастополь, ул Шабалина, д. 10-А</span>
          <span v-if='orderInfo.cityPickupYalta'>299029, г. Ялта, ул Ялтинская, д. 99</span>
        </p>
        <p v-if='orderInfo.isDelivery'>
          <b>Доставка:</b>
          <span v-if='orderInfo.deliveryCdek'>{{ DELIVERY_CDEK }}</span>
          <span v-if='orderInfo.deliveryPost'>{{ DELIVERY_POST }}</span>
          <span v-if='orderInfo.deliveryDellin'>{{ DELIVERY_DELOVIE_LINII }}</span>
        </p>
        <p v-if='location'>
          <b>Населенный пункт:</b>
          {{ location }}
        </p>
        <p>
          <b>Оплата:</b>
          <span v-if='orderInfo.paymentTypeCard'>Банковской картой</span>
          <span v-if='orderInfo.paymentTypeCash'>Наличными при получении</span>
          <span v-if='orderInfo.paymentTypeBankSend'>Банковский перевод по реквизитам</span>
        </p>
        <p>
          <b>Общая сумма заказа:</b>
          {{ totalSum }} ₽
        </p>
        <Button
          :disabled='countOfTrue < 3 ? true : false'
          buttonStyle='danger'
          type='submit'
        >Подтвердить заказ
        </Button>
        <div>
          <p>Если доставка осуществляется транспортной компанией, сумма может изменится в зависимости от вашего
             населенного пункта и транспортной компании.
             Точную сумму уточнит наш менеджер после обращения в траспортную компанию
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import {DELIVERY_CDEK, DELIVERY_POST, DELIVERY_DELOVIE_LINII} from "~/constants"
import {computed} from "vue"
import { useCartStore } from '~/store/cart'
defineProps({
  totalSum: Number,
})

const emit = defineEmits(['orderComplete'])

const cartStore = useCartStore()
const { resetState } = cartStore
const name = ref("")
const email = ref("")
const phone = ref("")
const location = ref("")
const isFormSend = ref(false)

const orderInfo = ref({})

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
}

function setDelivery() {
  resetObjectvalues()
  orderInfo.value.isDelivery = true
}

function setPickupCity(city) {
  if (city === "Севастополь") {
    orderInfo.value.cityPickupSevastopol = true
    orderInfo.value.cityPickupYalta = false
  }
  if (city === "Ялта") {
    orderInfo.value.cityPickupYalta = true
    orderInfo.value.cityPickupSevastopol = false
  }

  orderInfo.value.deliveryCdek = false
  orderInfo.value.deliveryPost = false
  orderInfo.value.deliveryDellin = false
}

function setDeliveryCompany(company) {
  if (company === DELIVERY_CDEK) {
    orderInfo.value.deliveryCdek = true
    orderInfo.value.deliveryPost = false
    orderInfo.value.deliveryDellin = false
  }

  if (company === DELIVERY_POST) {
    orderInfo.value.deliveryPost = true
    orderInfo.value.deliveryCdek = false
    orderInfo.value.deliveryDellin = false
  }

  if (company === DELIVERY_DELOVIE_LINII) {
    orderInfo.value.deliveryDellin = true
    orderInfo.value.deliveryCdek = false
    orderInfo.value.deliveryPost = false
  }

  orderInfo.value.cityPickupSevastopol = false
  orderInfo.value.cityPickupYalta = false
}

function setPaymentType(type) {
  if (type === "card") {
    orderInfo.value.paymentTypeCard = true
    orderInfo.value.paymentTypeCash = false
    orderInfo.value.paymentTypeBankSend = false
  }

  if (type === "cash") {
    orderInfo.value.paymentTypeCash = true
    orderInfo.value.paymentTypeCard = false
    orderInfo.value.paymentTypeBankSend = false
  }

  if (type === "bankSend") {
    orderInfo.value.paymentTypeBankSend = true
    orderInfo.value.paymentTypeCard = false
    orderInfo.value.paymentTypeCash = false
  }
}

function resetCartState(form) {
  resetObjectvalues()
  form.reset()
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
    .replace(/^ +/, "")
    .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
  resetState()
}

function confirmOrder(e) {

  const formData = new FormData(e.target)
  formData.append('sum', getCookie("cartSum"))
  formData.append('count', getCookie("cartCount"))
  formData.append('productList', getCookie("cartProducts"))

  for (const pair of formData.entries()) {
    console.log(`${ pair[0] }, ${ pair[1] }`)
  }

  // isFormSend.value = true

  resetCartState(e.target)
  setTimeout(() => {
    // isFormSend.value = false
    emit('orderComplete')
  }, 2000)
}
</script>
<style
  scoped
  lang='scss'
>
.order-form {
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

.order-form-info-delivery {
  display: flex;
  flex-direction: column;
}

.order-form-mark {
  margin: 0 0 8px;
}

.order-form-row {
  display: flex;
  margin-left: -8px;
  margin-right: 8px;
}

.order-form-input {
  margin: $offset-small 0 0;
}

.order-form-final {
  background: $bg-base;
  border-radius: 3px;
  padding: $offset-small $offset-large;
}
</style>