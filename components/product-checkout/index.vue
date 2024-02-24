<template>
  <div class="product-checkout">
    <div class="product-checkout__img">
      <img
        :src="MAIN_URL + data.productData.images[0]?.img"
        :alt="caption"
      >
    </div>
    <div class="product-checkout__data">
      <span class="product-checkout__caption">{{ data.productData.title }}</span>
      <span class="product-checkout__count"><b>Количество:</b> {{ data.count }} шт.</span>
      <span class="product-checkout__price"><b>Цена:</b> {{ data.productData.price }} ₽</span>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  data: any;
}

defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
</script>
<style
  scoped
  lang="scss"
>
.product-checkout {
  display: grid;
  grid-template-columns: 33% 66%;
  gap: 1%;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 0 16px;
  background: #fff;

  &__img {
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    height: 120px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: 80%;
      right: 0;
      top: 10%;
      background: #f3f3f3;
    }

    img {
      max-width: 100%;
      height: auto;
      padding: 10px;
    }
  }

  &__data {
    overflow: hidden;
    border-radius: 8px;
    padding: 8px;
    display: grid;
    gap: 10px;
  }

  &__caption {
    font-size: 14px;
  }

  &__price {
    font-size: 14px;
  }

  &__count {
    font-size: 14px;
  }
}
</style>