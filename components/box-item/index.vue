<template>
  <div
    class="box-item"
    v-for="product in items"
    :key="product?.product_article"
  >
    <div class="box-item__images">
      <v-img
        cover
        :src="MAIN_URL+product.images[0]"
      />
    </div>
    <div class="box-item__data">
          <span class="box-item__title">
            {{ product.title }}
          </span>
      <span class="box-item__article">
             Арт: {{ product.article }}
           </span>
      <span class="box-item__count">
             Количество: {{ product.count }}
           </span>
      <span>Цена: {{ product.price }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">

interface Props {
  items: any;
}

const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.box-item {
  display: flex;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px #00000029;

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__images {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__data {
    display: flex;
    flex-direction: column;
  }

}
</style>