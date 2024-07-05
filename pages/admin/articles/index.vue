<template>
  <div class="admin-articles">
    <h2>Статьи</h2>
    <v-btn
      color="#27ae60"
      @click="navigateTo({ path: `/admin/articles/add` }, { external: true })"
    >Создать запись
    </v-btn>
    <br>
    <br>
    <AdminList
      title="Доставка"
      :list="posts.data"
      :noneEdit="true"
      :category="true"
      :updateMsg="successMessage"
      @removeData="removeData"
      @handleEdit="(id) => navigateTo({ path: `/admin/articles/${id}` }, { external: true })"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/store/posts-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { posts } = storeToRefs(usePostsStore());
const { getPosts, removePost } = usePostsStore();

const successMessage = ref();

await getPosts();

const removeData = async (id: number): Promise<void> => {
  const response = await removePost(id);
  updateMsgStatus(response);
  await getPosts();
};

/**
 * Обновляем показ успешных сообщений
 * @param response
 */
const updateMsgStatus = (response: string): void => {
  successMessage.value = response;
  setTimeout(() => (successMessage.value = ''), 2000);
};

watch(successMessage, () => {
  setTimeout(() => successMessage.value = null, 3000);
});
</script>
<style lang="scss">
.admin-articles {
  position: relative;
}
</style>