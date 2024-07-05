<template>
  <div className="admin-articles">
    <h2>Раздел: статьи</h2>
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

const { isLoading } = storeToRefs(usePostsStore());
const { postPostItem, uploadImages, removeImage } = usePostsStore();
const { topics } = storeToRefs(useTopicsStore());
const { getTopics } = useTopicsStore();

const content = ref();
const keywords = ref();
const images = ref();
const articleName = ref();
const newImagesList = ref();
const successMessage = ref();
const form = ref();
const topicsChoice = ref()

await getTopics();

const saveData = async (e: Event): Promise<void> => {
  e.preventDefault();

  if (form.value.isValid) {
    const data = {
      title: articleName.value,
      keywords: keywords.value,
      main_text: content.value,
      main_title: articleName.value,
      topic_id: topicsChoice.value.id,
    };

    const response = await postPostItem(data)

    successMessage.value = response.message;

    if (newImagesList.value && response.post?.id) {
      await saveImage(response.post?.id);
    } else {
      setTimeout(() => location.reload(), 2000);
    }
  }

};

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('post_id', id);
  for (let index = 0; index < newImagesList.value.length; index++) {
    formData.append('images[]', newImagesList.value[index]);
  }
  await uploadImages(formData);
  successMessage.value = 'Изображения добавлены';
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