<template>
  <section class="brands">
    <div
      class="brand-item"
      v-for="item in brandsList.data"
      :key="item.id"
    >
      <NuxtLink
        class="brand-item__wrap"
        :to="{path: `/brands/${item.id}`}"
      >
        <img
          v-if="item.images[0]"
          :src="MAIN_URL + item.images[0]?.img"
          alt="item.title"
          width="218"
          height="143"
          key="item.id"
        >
        <span v-else>{{ item.title }}</span>
      </NuxtLink>
    </div>
  </section>
</template>
<script
  setup
  lang="ts"
>
import { useBrandsStore } from '../../store/brands';
import { storeToRefs } from 'pinia';

interface Props {
  maxView: number;
}

const props = defineProps<Props>();

const { getBrandsList } = useBrandsStore();
const { brandsList } = storeToRefs(useBrandsStore());

const MAIN_URL = useRuntimeConfig().public.MAIN_URL;

await getBrandsList(props.maxView);
</script>
<style
  scoped
  lang="scss"
>
.brands {
  display: grid;
  flex-wrap: wrap;
  padding: $offset-xlarge 0 $offset-large-2;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: $laptop) {
    padding: $offset-base 0;
  }

  @media (max-width: $mobile) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

.brand-item {
  margin: 0;
  height: 150px;
  display: flex;
  align-items: center;
  transition: box-shadow 0.25s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e5e5;

  &:hover {
    box-shadow: $shadows;
  }

  &__wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    padding: 8px;
  }
}
</style>