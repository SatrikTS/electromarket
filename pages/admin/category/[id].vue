<template>
  <div class="category">
    <h3>Редактирование категории</h3>
    <form
      v-if="categoryItemGetter"
      class="category__form"
      @submit.prevent="saveCategoryData"
    >
      <div class="row">
        <div class="column">
          <b class="label">id: {{ categoryItemGetter.id }}</b>
          <br>
          <TextInput
            placeholder="Название категории"
            label="Название категории"
            v-model:value="categoryItemGetter.title"
            name="title"
            required
          />
          <div>
            <v-select
              v-model="categoryValue"
              :items="categoryList"
              item-text="title"
              item-value="id"
              label="Родительская категория"
            ></v-select>
          </div>
          <TextArea
            placeholder="Описание"
            label="Описание"
            name="description"
            v-model:value="categoryItemGetter.description"
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
            :file="categoryItemGetter.images"
            :single="true"
            name="image"
            @uploadImage="uploadImage"
            @removeImage="removeImage"
            @updateData="updateCategoryData"
          />
        </div>
      </div>
    </form>
    <Alert
      class="alert"
      title="Добавлено"
      bodyText="Категория успешно создана"
      :alertShow="true"
      v-if="alertShow"
    />
    <Alert
      class="alert"
      title="Добавлено"
      :bodyText="alertShowUpdateText"
      :alertShow="true"
      v-if="alertShowUpdate"
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

import { computed, ref, watch } from 'vue';
import { useCategoryStore } from '../../../store/category';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const { postCategoryImages, getCategoryItem, putCategory, removeCategoryImages } = categoryStore;
const { categoryItemGetter } = storeToRefs(categoryStore);

const route = useRoute();
const pageId = computed(() => route.params.id);
const categoryImage = ref();
const alertShow = ref();
const categoryValue = ref();
const alertShowUpdate = ref();
const alertShowUpdateText = ref();
const { getCategoryList } = categoryStore;
const categoryList = ref();

getCategoryItem(pageId.value);
const responseCategoryList = await getCategoryList(1000);

categoryList.value = responseCategoryList.data;
categoryList.value.unshift({ id: null, title: 'Без категории' });
categoryValue.value = categoryItemGetter.value?.parent;

function uploadImage(value: File) {
  categoryImage.value = value;
}

function removeImage(id: number) {
  removeCategoryImages(id);
}

function updateCategoryData() {
  setTimeout(() => {
    getCategoryItem(pageId.value);
  }, 1000);
}

/**
 * Созранение данных при изменении категории
 * @param event
 */
async function saveCategoryData(event: any) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const jsonData = {};
  for (let [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  jsonData['parent'] = categoryValue.value ? categoryValue.value : null;

  const response = await putCategory(jsonData, pageId.value);
  alertShowUpdate.value = true;
  alertShowUpdateText.value = response.message;
  setTimeout(() => {
    alertShowUpdate.value = null;
    alertShowUpdateText.value = null;
  }, 2000);

  if (categoryImage.value) {
    const formData = new FormData();
    formData.append('category_id', pageId.value);
    formData.append('image', categoryImage.value[0]);
    await postCategoryImages(formData);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
</script>
<style
  scoped
  lang="scss"
>
.category {
  position: relative;

  &__form {

  }
}
</style>