<template>
  <section class="ordered-list">
    <div
      v-for="item in data"
      class="ordered-list__item"
      :key="item.id"
    >
      <span
        class="ordered-list__link"
      >
        Заказ №
        {{ item.id }}

      </span>
      <small> от {{ formatDate(item.created_at) }}</small>
      <div class="ordered-list__statuses">
        <div class="ordered-list__status">
          <span class="ordered-list__key">Общая стоимость:</span>
          <span class="ordered-list__value">{{ item.total_cost }} ₽</span>
        </div>
        <div class="ordered-list__status">
          <span class="ordered-list__key">Способ доставки:</span>
          <span class="ordered-list__value">{{ item.delivery.title }}</span>
        </div>
        <div class="ordered-list__status">
          <span class="ordered-list__key">Статус заказа:</span>
          <span class="ordered-list__value">{{ item.status.title }} от {{ formatDate(item.updated_at) }}</span>
        </div>
        <div class="ordered-list__status">
          <span class="ordered-list__key">Оплата:</span>
          <span class="ordered-list__value">{{ item.pay.title }}</span>
        </div>
      </div>
      <div class="ordered-list__box">
        <BoxItem
          :items="item.product_box"
        />
      </div>
    </div>
  </section>
</template>
<script
  setup
  lang="ts"
>
import { formatDate } from '~/utils/formatDate';

interface Props {
  data: any;
}

const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.ordered-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: "DM Sans", sans-serif;

  &__link {
    display: flex;
    align-items: center;
    color: $active;
  }

  &__item {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 0, 0, 0.1);
    gap: 16px;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__status {
    display: flex;
    gap: 10px;
  }

  &__key {
    color: $bg-light-grey;
    font-size: 14px;
    font-family: "DM Sans", sans-serif;
    width: 125px;
  }

  &__value {
    color: $text;
    font-size: 14px;

    @media (max-width: $mobile) {
      width: calc(100% - 150px);
    }
  }

  &__statuses {
    display: flex;
    flex-direction: column;
    gap: 8px
  }

}
</style>