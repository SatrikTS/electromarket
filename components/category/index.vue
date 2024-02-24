<template>
  <div class="category">
    <div
      class="category__wrap"
      :style="columnsStyled"
    >
      <template v-for="item in categoryList">
        <NuxtLink
          v-if="item.id"
          class="category-item"
          :key="item.id"
          @click="handleCategory(item)"
        >
        <span
          v-if="item.images?.length"
          class="category-item__image"
        >
          <v-img
            cover
            :src="MAIN_URL+item.images[0]?.img"
          />
        </span>
          <div class="category-item__data">
            <span class="category-item__name">{{ item.title }}</span>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { computed } from 'vue';

interface Props {
  columns: number,
  categoryList: any
}

interface IEmits {
  (e: 'navigate', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();

const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const route = useRoute();

const columnsStyled = computed(() => {
  if (!props.columns) {
    return 'grid-template-columns: repeat(4, 1fr)';
  }

  return `grid-template-columns: repeat(${props.columns}, 1fr)`;
});

const handleCategory = async (item) => {
  if (item.child == '[]' || !item.child) {
    await navigateTo(`${location.origin}/products?categories=${item.title}`, {
      external: true,
    });
  } else {
    emit('navigate', item.id);
  }
};
</script>
<style
  scoped
  lang="scss"
>
.category {

  &__wrap {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 110px;

    @media (max-width: $laptop) {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    @media (max-width: $mobile) {
      grid-template-columns: repeat(1, 1fr) !important;
      grid-auto-rows: 130px;
    }

  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.category-item {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: $shadows;
  display: grid;
  grid-template-columns: 100px calc(100% - 100px);

  &:hover {
    .category-item__name {
      color: $primary;
    }
  }

  @media (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__image {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      font-size: 10px;
    }
  }

  &__name {
    font-size: 14px;

    @media (max-width: $mobile) {
      font-size: 14px;
    }
  }

  &__data {
    display: flex;
    flex-direction: column;
    padding: 8px
  }
}
</style>