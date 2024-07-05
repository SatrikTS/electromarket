<template>
  <div class="order">
    <h3>Подробная информация о заказе № {{ useRoute().params.id }}</h3>
    <br>
    <div class="order__data">
      <v-text-field
        label="Имя"
        v-model="ordersItem.user_name"
        readonly
        variant="solo"
      />
      <v-text-field
        label="Телефон"
        v-model="ordersItem.user_phone" readonly variant="solo"/>
      <v-text-field
        label="Почта"
        v-model="ordersItem.user_email" readonly variant="solo"/>
      <v-text-field
        label="Адрес доставки"
        v-model="ordersItem.delivery_address" readonly variant="solo"/>
      <v-text-field
        label="Доставка"
        v-model="ordersItem.delivery.title" readonly variant="solo"/>
      <v-text-field
        label="Оплата"
        v-model="ordersItem.pay.title" readonly variant="solo"/>
      <v-select
        v-model="ordersItem.status"
        :items="statusesList.data"
        item-text="title"
        item-value="id"
        label="Заказ в статусе"
        return-object="false"
        clearable
      ></v-select>
      <span>
        от {{ formatDate(ordersItem.updated_at) }}
      </span>
      <v-btn color="success" size="x-large" @click="changeOrder">Принять изменения</v-btn>
    </div>
    <br>
    <h3>
      Список товаров в корзине
    </h3>
    <div class="order__cart">
      <BoxItem
        :items="ordersItem.product_box"
      />
    </div>
    <SuccessMessage :message="message" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useOrdersStore} from '~/store/orders-store';
import {useStatusOrderStore} from '~/store/status-order-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { ordersItem } = storeToRefs(useOrdersStore());
const { statusesList } = storeToRefs(useStatusOrderStore());
const { getOrder, putOrderAdmin } = useOrdersStore();
const { getStatusesList } = useStatusOrderStore();
const message = ref()

await getOrder(useRoute().params.id);
await getStatusesList();

const changeOrder = async () => {
  message.value = await putOrderAdmin(useRoute().params.id, {statusorder_id: ordersItem.value.status.id})

  setTimeout(() => {
    message.value = null;
  }, 3000);
}

</script>
<style scoped lang="scss">
.order {
  position: relative;

  &__data {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $offset-base;
    align-items: flex-start;
  }

  &__cart {
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>