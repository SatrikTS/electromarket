<template>
  <div>
    <h2>Сортировка категорий</h2>
    <Button
      @click="saveNewQueue"
      size="medium"
      buttonStyle="success"
    >Сохранить новый порядок
    </Button>
    <VueDraggableNext
      v-if="categoryList"
      :list="categoryList"
      class="category-list"
    >
      <div
        v-for="(item, index) in categoryList"
        class="category-item"
        :key="item.id"
        :style="{ order: item.position }"
        :data-text="item.title"
      >
          <span
            v-if="item.images?.length"
            class="category-item__image"
          >
            <v-img
              cover
              :src="MAIN_URL + item.images[0]?.img"
            />
          </span>
        <div class="category-item__data">
          <span class="category-item__name">{{ item.title }}</span>
          <span class="category-item__position">Позиция: {{ index }}</span>
        </div>
      </div>
    </VueDraggableNext>
    <Alert
      class="alert"
      bodyText="Порядок категорий успешно обновлен"
      :alertShow="true"
      v-if="alertShow"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { useCategoryStore } from '../../store/category';
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const categoryStore = useCategoryStore();
const { getCategoryList, updateCategoryQueue } = categoryStore;
const categoryList = ref();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const alertShow = ref();

const responseCategory = await getCategoryList(1000, 0);
categoryList.value = responseCategory.data;

const saveNewQueue = async () => {
  const newOrderList = categoryList.value.map((item, index) => {
    return {
      id: item.id,
      queue: index,
    };
  });

  await updateCategoryQueue({ 'categories-queue': newOrderList });
  alertShow.value = true;
  setTimeout(() => location.reload(), 3000);
};
</script>
<style
  scoped
  lang="scss"
>
.category-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 110px;
  padding: 24px 0;

  @media (max-width: $laptop) {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  @media (max-width: $mobile) {
    grid-auto-rows: 130px;
  }

}

.category-item {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: $shadows;
  display: grid;
  grid-template-columns: 100px calc(100% - 100px);
  border: 1px solid #ccc;

  &:hover {
    .category-item__name {
      color: $primary;
    }
  }

  @media (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px;
  }

  &__image {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: $mobile) {
      width: 70px;
      height: 70px;
    }

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
    padding: 8px;

    @media (max-width: $mobile) {
      padding: 0;
    }
  }
}
</style>