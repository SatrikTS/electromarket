<template>
  <div class='brand'>
    <h3>Создание Бренда</h3>
    <form
      v-if='brandsItemGetter'
      class='brand__form'
      @submit.prevent='saveBrandData'
    >
      <div class='row'>
        <div class='column'>
          <b class='label'>id: {{ brandsItemGetter.id }}</b>
          <br>
          <TextInput
            placeholder='Название бренда'
            label='Название бренда'
            v-model:value='brandsItemGetter.title'
            name='title'
            required
          />
          <TextArea
            placeholder='Описание'
            label='Описание'
            name='description'
            v-model:value='brandsItemGetter.description'
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
            :file='brandsItemGetter.images'
            :single='true'
            name='image'
            @uploadImage='uploadImage'
            @removeImage='removeImage'
            @updateData='updateBrandData'
          />
        </div>
      </div>
    </form>
    <Alert
      class='alert'
      title='Добавлено'
      bodyText='Бренд успешно обновлен'
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

import {computed, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useBrandsStore} from '../../../store/brands'

const brandsStore = useBrandsStore()
const {brandsItemGetter} = storeToRefs(brandsStore)
const {postBrandImages, getBrandItem, putBrand, removeBrandImages} = brandsStore

const route = useRoute()
const pageId = computed(() => route.params.id)
const brandImage = ref()
const alertShow = ref()

getBrandItem(pageId.value)

function uploadImage(value: File) {
  brandImage.value = value
}

async function removeImage(id: number) {
  removeBrandImages(id)
}

function updateBrandData() {
  setTimeout(() => {
    getBrandItem(pageId.value)
  }, 1000)
}

/**
 * Созранение данных при изменении brand
 * @param event
 */
async function saveBrandData(event: any) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const jsonData = {}
  for (let [key, value] of formData.entries()) {
    // encodeURIComponent
    jsonData[key] = value
  }

  if (brandsItemGetter.value) {
    putBrand(jsonData, brandsItemGetter.value.id)

    alertShow.value = true
    setTimeout(() => {
      alertShow.value = false
    }, 2000)

    if (brandImage.value) {
      const formData = new FormData()
      formData.append('brand_id', brandsItemGetter.value.id)
      formData.append('image', brandImage.value[0])
      postBrandImages(formData)
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  }

}
</script>
<style
  scoped
  lang='scss'
>
.brand {
  position: relative;

  &__form {

  }
}
</style>