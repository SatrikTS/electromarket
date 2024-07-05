<template>
  <div class="admin-articles">
    <h4>Статья: {{ articleName }}</h4>
    <v-form
      ref="form"
      @submit.prevent
      @submit="saveData"
    >
      <v-btn
        color="#27ae60"
        type="submit"
      >Сохранить запись
      </v-btn>
      <br>
      <br>
      <v-text-field
        v-model="articleName"
        :rules="requiredRules"
        label="Название статьи"
      />
      <v-text-field
        v-model="keywords"
        label="Ключевое описание для СЕО"
      />
      <v-select
        v-model="topicsChoice"
        :items="topics.data"
        label="Категория"
        :rules="requiredRules"
        return-object
      ></v-select>
      <h3>Загрузка изображений:</h3>
      <Uploader
        v-if="!isLoading"
        :file="images"
        @uploadImage="uploadImage"
        @removeImage="handleRemoveImage"
      />
    </v-form>
    <h3>Редактор основного текста:</h3>
    <client-only>
      <Editor v-model="content" />
    </client-only>
    <br>
    <Alert
      class="alert"
      :bodyText="successMessage"
      :alertShow="true"
      v-if="successMessage"
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
import { requiredRules } from '@/utils/validation';
import { useTopicsStore } from '@/store/topics-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { article, isLoading } = storeToRefs(usePostsStore());
const { topics } = storeToRefs(useTopicsStore());
const { getPostItem, putPostItem, uploadImages, removeImage } = usePostsStore();
const { getTopics } = useTopicsStore();
const articleID = useRoute().params.id;

await getPostItem(articleID);
await getTopics();
const content = ref(article.value.data?.main_text);
const keywords = ref(article.value.data?.keywords);
const images = ref(article.value.data.images);
const articleName = ref(article.value.data.title);
const topicsChoice = ref(article.value.data.topic);

const newImagesList = ref();
const successMessage = ref();
const form = ref();

const saveData = async (): Promise<void> => {
  if (form.value.isValid) {
    const data = {
      title: articleName.value,
      main_text: content.value,
      keywords: keywords.value,
      topic_id: topicsChoice.value.id,
    };
    const response = await putPostItem(data, articleID);
    successMessage.value = response.message;

    if (newImagesList.value) {
      await saveImage();
    }
  }
};

const saveImage = async (): Promise<void> => {
  const formData = new FormData();
  formData.append('post_id', articleID);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  const responseImageMessage = await uploadImages(formData);
  successMessage.value = 'Изображения обновлены';
  setTimeout(() => location.reload(), 3000);
};

const uploadImage = (value: File[]): void => {
  newImagesList.value = value;
};

const handleRemoveImage = async (id: number): Promise<void> => {
  const response = await removeImage(id);
  successMessage.value = response;
  await saveData();
  setTimeout(() => location.reload(), 3000);
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