<template>
  <AdminList
    title="Категории/Темы постов"
    :list="topics.data"
    :updateMsg="updateMsg"
    @updateData="updateData"
    @removeData="removeData"
    @createData="createData"
  />
</template>
<script
  lang="ts"
  setup
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTopicsStore } from '@/store/topics-store';
import type { OptionsListItem } from '@/utils/types';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getTopics, postTopic, putTopicItem, deleteTopic } = useTopicsStore();
const { topics } = storeToRefs(useTopicsStore());
await getTopics();
const updateMsg = ref();

/**
 * Создаем новую опцию в список
 */
const createData = async (params: OptionsListItem): Promise<void> => {
  const response = await postTopic(params);
  updateMsgStatus(response);
  await getTopics();
};

/**
 * Сохраняем опцию при изменении
 * @param item
 * @param index
 */
const updateData = async (
  params: OptionsListItem,
  id: number,
): Promise<void> => {
  const response = await putTopicItem(params, id);
  updateMsgStatus(response);
};

/**
 * Подтверждение открытия модалки
 * @param id
 */
const removeData = async (id: number): Promise<void> => {
  const response = await deleteTopic(id);
  updateMsgStatus(response);
  await getTopics();
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
<style scoped>
</style>