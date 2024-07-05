<template>
  <div class="images-list">
    <div
      v-for="image in images"
      :key="image.id"
      class="images-list__item"
    >
      <img
        :src="MAIN_URL +'/'+ image.img"
        alt="Строительство домов в Санкт Петербурге"
      >
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  images: [];
}

defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
</script>
<style
  scoped
  lang="scss"
>
.images-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  &__item {
    width: calc(33% - 10px);

    //@media (max-width: $laptop) {
    //  width: 100%;
    //}

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>