<template>
  <div>
    <h3>Создание бренда</h3>
    <form @submit.prevent="saveBrandData">
      <div class="row">
        <div class="column">
          <TextInput
            placeholder="Название бренда"
            label="Название бренда"
            v-model:value="newBrandData.name"
            name="title"
            required
          />
          <TextArea
            placeholder="Описание"
            label="Описание"
            name="description"
            v-model:value="newBrandData.description"
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
            :single="true"
            name="image"
            @uploadImage="uploadImage"
          />
        </div>
      </div>
    </form>
    <Alert
      class="alert"
      title="Добавлено"
      bodyText="Бренд успешно создан"
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
import { ref } from 'vue';
import { useBrandsStore } from '../../../store/brands';
const { postBrand, postBrandImages } = useBrandsStore();

const brandImage = ref();
const alertShow = ref();

const newBrandData = ref({
  name: '',
  description: '',
});

const saveImage = async (id: number): Promise<void> => {
  const formData = new FormData();
  formData.append('brand_id', id);
  for (let index = 0; index < brandImage.value.length; index++) {
    formData.append('image', brandImage.value[index]);
  }
  await postBrandImages(formData);
  alertShow.value = true;
  setTimeout(() => location.reload(), 3000);
};

const saveBrandData = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const response = await postBrand(formData);

  if (response.brand.id && brandImage.value) {
    await saveImage(response.brand.id);
  } else {
    alertShow.value = true;
    setTimeout(() => location.reload(), 3000);
  }
};

function uploadImage(value: File) {
  brandImage.value = value;
}
</script>
<style scoped>
</style>