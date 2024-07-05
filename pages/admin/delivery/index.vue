<template>
    <AdminList
      title="Доставка"
      :list="deliveryTypesList.data"
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

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

import { ref } from 'vue';
import { useDeliveryTypeStore } from '~/store/delivery-type-store';
import { storeToRefs } from 'pinia';

interface OptionListItem {
  id?: number;
  title: string;
  description?: string;
}

const alertWarningText = ref();
const { getDeliveryTypesList,
  putDeliveryTypesItem,
  deleteDeliveryTypesItem,
  postDeliveryTypesItem,
} = useDeliveryTypeStore();
const { deliveryTypesList } = storeToRefs(useDeliveryTypeStore());
const updateMsg = ref();

await getDeliveryTypesList();

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteDeliveryTypesItem(id);
  updateMsgStatus(response);
  await getDeliveryTypesList();
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
  const response = await putDeliveryTypesItem(params, id);
  updateMsgStatus(response);
};

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionListItem): Promise<void> => {
  const response = await postDeliveryTypesItem(params);
  updateMsgStatus(response);
  await getDeliveryTypesList();
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