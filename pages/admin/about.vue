<template>
  <div class="about">
    <h2>{{ aboutPost.data.title }}</h2>
    <v-btn
      color="#27ae60"
      @click="saveData"
    >Сохранить запись
    </v-btn>
    <br>
    <br>
    <v-text-field
      v-model="title"
      label="Заголовок на главной"
    />
    <v-text-field
      v-model="keywords"
      label="Ключевые слова"
    />
    <h3>Загрузка изображений:</h3>
    <Uploader
      v-if="!isLoading"
      :file="images"
      @uploadImage="uploadImage"
      @removeImage="handleRemoveImage"
    />
    <br>
    <h3>Редактор основного текста:</h3>
    <br>
    <client-only>
      <Editor v-model="mainText"></Editor>
    </client-only>
    <v-btn
      color="#27ae60"
      @click="saveData"
    >Сохранить запись
    </v-btn>
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
import { useAboutStore } from '@/store/about-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { aboutPost, isLoading } = storeToRefs(useAboutStore());
const { getAboutData, putAboutData, uploadImages, removeImage } = useAboutStore();

await getAboutData();
const content = ref(aboutPost.value.data?.html_content);
const keywords = ref(aboutPost.value.data?.company_keywords);
const images = ref(aboutPost.value.data.images);
const mainText = ref(aboutPost.value.data.main_text);
const title = ref(aboutPost.value.data.title);

const newImagesList = ref();
const successMessage = ref();

const saveData = async (): Promise<void> => {
  const data = {
    title: title.value,
    company_keywords: keywords.value,
    main_text: mainText.value,
  };

  const response = await putAboutData(data, 1);
  successMessage.value = response;

  if (newImagesList.value) {
    await saveImage();
  }
};

const saveImage = async (): Promise<void> => {
  const formData = new FormData();
  formData.append('about_company_id', 1);
  for (let i = 0; i < newImagesList.value.length; i++) {
    formData.append('images[]', newImagesList.value[i])
  }

  const responseImageMessage = await uploadImages(formData);
  successMessage.value = responseImageMessage;
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
.about {

}
</style>