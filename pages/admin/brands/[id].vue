<template>
  <div class="brand">
    <h3>Создание Бренда</h3>
    <form
      class="brand__form"
      @submit.prevent="saveBrandData"
    >
      <div class="row">
        <div class="column">
          <b class="label">id: {{ brandItem.id }}</b>
          <br>
          <TextInput
            placeholder="Название бренда"
            label="Название бренда"
            v-model:value="brandItem.title"
            name="title"
            required
          />
          <TextArea
            placeholder="Описание"
            label="Описание"
            name="description"
            v-model:value="brandItem.description"
          />
          <Button
            buttonStyle="success"
            type="submit"
          >
            Сохранить
          </Button>
        </div>
        <div class="column">
          <div class="label">Изображение</div>
          <Uploader
            :file="brandItem.images"
            :single="true"
            name="image"
            @uploadImage="uploadImage"
            @removeImage="removeImage"
            @updateData="updateBrandData"
          />
        </div>
      </div>
    </form>
    <Alert
      class="alert"
      title="Добавлено"
      bodyText="Бренд успешно обновлен"
      :alertShow="true"
      v-if="alertShow"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBrandsStore } from '~/store/brands';

const brandsStore = useBrandsStore();
const { brandItem } = storeToRefs(brandsStore);
const { postBrandImages, getBrandItem, putBrand, removeBrandImages } = useBrandsStore();
const pageId = computed(() => useRoute().params.id);
const brandImage = ref();
const alertShow = ref();

await getBrandItem(pageId.value);

function uploadImage(value: File) {
  brandImage.value = value;
}

async function removeImage(id: number) {
  await removeBrandImages(id);
}

function updateBrandData() {
  setTimeout(() => {
    getBrandItem(pageId.value);
  }, 1000);
}

/**
 * Сохранение данных при изменении brand
 * @param event
 */
async function saveBrandData(event: any) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const jsonData = {};
  for (let [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  await putBrand(jsonData, pageId.value);

  if (brandImage.value) {
    const formData = new FormData();
    formData.append('brand_id', pageId.value);
    formData.append('image', brandImage.value[0]);
    await postBrandImages(formData);
    alertShow.value = true;
    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    alertShow.value = true;
    setTimeout(() => {
      alertShow.value = false;
    }, 2000);
  }

}
</script>
<style
  scoped
  lang="scss"
>
.brand {
  position: relative;
}
</style>