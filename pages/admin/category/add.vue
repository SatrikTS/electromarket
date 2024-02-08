<template>
  <div>
    <h3>Создание категории</h3>
    <form @submit.prevent='saveCategoryData'>
      <div class='row'>
        <div class='column'>
          <TextInput
            placeholder='Название категории'
            label='Название категории'
            v-model:value='newCategoryData.name'
            name='title'
            required
          />
          <div>
            <v-select
              v-model="categoryValue"
              :items="categoryList"
              item-text="title"
              item-value="id"
              label="Родительская категория"
              name="parent"
            ></v-select>
          </div>
          <TextArea
            placeholder='Описание'
            label='Описание'
            name='description'
            v-model:value='newCategoryData.description'
          />
          <Button
            buttonStyle='success'
            type='submit'
          >
            Сохранить
          </Button>
        </div>
        <div class='column'>
          <div class='label'>Изображение</div>
          <Uploader
            :single='true'
            name='image'
            @uploadImage='uploadImage'
          />
        </div>
      </div>
    </form>
    <Alert
      class='alert'
      title='Добавлено'
      bodyText='Категория успешно создана'
      :alertShow='true'
      v-if='alertShow'
    />
  </div>
</template>
<script
  setup
  lang='ts'
>
definePageMeta({
  layout: "admin",
  middleware: 'auth'
});

import {ref} from 'vue'
import {useCategoryStore} from '../../../store/category'

const categoryStore = useCategoryStore()
const {postCategory, postCategoryImages, getCategoryList} = categoryStore

const categoryValue = ref();
const categoryList = ref();
const categoryImage = ref()
const alertShow = ref()


const responseCategoryList = await getCategoryList(1000);

categoryList.value = responseCategoryList.data;
categoryList.value.unshift({ id: null, title: 'Без категории' });

const newCategoryData = ref({
  name: '',
  description: '',
})

function saveCategoryData(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  postCategory(formData)
  .then((response) => {

    if (response.id && categoryImage.value) {
      const formData = new FormData()
      formData.append('category_id', response.id)
      for (let i = 0; i < categoryImage.value.length; i++) {
        formData.append('image', categoryImage.value[i])
      }

      postCategoryImages(formData).then((responseImages) => {
        if(responseImages.id) {
          alertShow.value = true
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      })
    } else {
      alertShow.value = true
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  })

}

function uploadImage(value: File) {
  categoryImage.value = value
}
</script>
<style scoped>
</style>