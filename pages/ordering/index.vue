<template>
  <div class="ordering">
    <OrderForm
      @orderComplete="orderComplete"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
// import { usePersonalStore } from '~/store/personal-store';

definePageMeta({
  layout: 'checkout',
  middleware: 'checkout',
});

// const { getPersonalData } = usePersonalStore();

// await getPersonalData();

const orderComplete = () => {

};
</script>
<style
  scoped
  lang="scss"
>
.ordering {
  position: relative;
}
</style>