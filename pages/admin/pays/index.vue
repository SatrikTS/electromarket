<template>
  <AdminList
    title="Типы оплаты"
    :list="payTypesList.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
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
import { ref } from 'vue';
import { usePayTypeStore } from '~/store/pay-type-store';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

const alertWarningText = ref();
const {
  getPayTypesList,
  putPayTypesItem,
  postPayTypesItem,
  deletePayTypesItem,
} = usePayTypeStore();
const { payTypesList } = storeToRefs(usePayTypeStore());
const updateMsg = ref();

await getPayTypesList();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deletePayTypesItem(id);
  updateMsgStatus(response);
  await getPayTypesList();
};

/**
 * Сохраняем опцию при изменении
 * @param item
 * @param index
 */
const updateData = async (
  params: OptionListItem,
  id: number,
): Promise<void> => {
  const response = await putPayTypesItem(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postPayTypesItem(params);
  updateMsgStatus(response);
  await getPayTypesList();
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  updateMsg.value = response;
  setTimeout(() => (updateMsg.value = ''), 2000);
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