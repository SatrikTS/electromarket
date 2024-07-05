<template>
  <div class="personal">
    <h3 class="personal__title">Мои заказы</h3>
    <OrderedList
      class="ordered-list"
      :data="ordersList.data"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import {useOrdersStore} from '~/store/orders-store';

definePageMeta({
  layout: 'personal',
  middleware: 'checkout',
});


const { ordersList } = storeToRefs(useOrdersStore());
const { getOrders } = useOrdersStore();

await getOrders()

</script>
<style
  lang="scss"
  scoped
>
.personal {
  position: relative;

  &__title {
    margin: 0 0 12px;
  }
}
</style>