<template>
  <div>
    <h3>Создание бренда</h3>
    <form @submit.prevent='saveBrandData'>
      <div class='row'>
        <div class='column'>
          <TextInput
            placeholder='Название бренда'
            label='Название бренда'
            v-model:value='newBrandData.name'
            name='title'
            required
          />
          <TextArea
            placeholder='Описание'
            label='Описание'
            name='description'
            v-model:value='newBrandData.description'
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
      bodyText='Бренд успешно создан'
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
import {useBrandsStore} from '../../../store/brands'

const brandsStore = useBrandsStore()
const {postBrand, postBrandImages} = brandsStore

const brandImage = ref()
const alertShow = ref()

const newBrandData = ref({
  name: '',
  description: '',
})

function saveBrandData(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  postBrand(formData)
  .then((response) => {

    if (response.id && brandImage.value) {
      const formData = new FormData()
      formData.append('brand_id', response.id)
      for (let i = 0; i < brandImage.value.length; i++) {
        formData.append('image', brandImage.value[i])
      }

      postBrandImages(formData).then((responseImages) => {
        if (responseImages.id) {
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
  brandImage.value = value
}
</script>
<style scoped>
</style>