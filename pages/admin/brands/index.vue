<template>
  <h2>Список брендов</h2>
  <div class="row">
    <div class="column-4">
      <Button
        buttonStyle="success"
        @click="navigateTo({ path: `/admin/brands/add` })"
      >Добавить бренд
      </Button>
    </div>
  </div>
  <div class="category-list">
    <div class="category-list__header">
      <div class="category-list__item">ID</div>
      <div class="category-list__item">Название бренда</div>
      <div class="category-list__item category-list__item--btns"></div>
    </div>
    <div
      v-for="(item) in brandsList.data"
      :key="item.title"
      class="category-list__content"
    >
      <div class="category-list__item">{{ item.id }}</div>
      <div class="category-list__item">{{ item.title }}</div>
      <div class="category-list__item category-list__item--btns">
        <Button
          size="small"
          buttonStyle="warning"
          type="button"
          @click="navigateTo({ path: `/admin/brands/${ item.id }` })"
        >
          <IconEdit />
        </Button>
        <Button
          size="small"
          buttonStyle="danger"
          type="button"
          @click="confirmRemoveModal(item.id)"
        >
          <IconRemove />
        </Button>
      </div>
    </div>
  </div>
  <Modal
    v-model="isShowModal"
    title="Удаление бренда"
  >
    Вы уверены, что хотите удалить бренд? Действие отменить будет невозможно
    <template #footer>
      <Button
        @click="isShowModal = false"
        size="small"
      >Отмена
      </Button>
      <Button
        @click="deleteBrand"
        size="small"
        buttonStyle="danger"
      >Удалить
      </Button>
    </template>
  </Modal>
  <v-alert
    v-if="alertWarningText"
    type="warning"
    class="alert-message"
  >
    {{ alertWarningText }}
  </v-alert>
</template>
<script
  setup
  lang="ts"
>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

import { ref } from 'vue';
import IconEdit from '@/assets/icons/IconEdit.vue';
import IconRemove from '@/assets/icons/IconDelete.vue';
import { useBrandsStore } from '~/store/brands';
import { storeToRefs } from 'pinia';

const isShowModal = ref(false);
const removeBrandId = ref();
const alertWarningText = ref();
const { getBrandsList, removeBrand } = useBrandsStore();
const { brandsList } = storeToRefs(useBrandsStore());

await getBrandsList();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const confirmRemoveModal = (id: number) => {
  isShowModal.value = true;
  removeBrandId.value = id;
};

/**
 * Удаление brand
 */
const deleteBrand = async () => {
  const response = await removeBrand(removeBrandId.value);
  alertWarningText.value = response;
  await getBrandsList();
  isShowModal.value = false;
  setTimeout(() => {
    alertWarningText.value = '';
  }, 3000);
};
</script>
<style
  scoped
  lang="scss"
>
.category-list {
  min-height: 600px;
  margin: 0 0 $offset-base;

  &__header {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    & > div {
      background: #f3f3f3;
    }
  }

  &__content {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    &:hover {
      background: rgba($bg-base, 0.5);
    }
  }

  &__item {
    border: 1px solid $bg-base;
    border-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
    flex: 1;

    &--btns {
      width: 150px;
      flex: none;

      button {
        margin: 0 4px;
      }
    }
  }
}
</style>