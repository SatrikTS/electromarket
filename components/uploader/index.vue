<template>
  <div class='uploader'>
    <input
      v-if='single'
      type="file"
      ref="fileInputRef"
      class='uploader__input'
      @change="onFileChange"
    >
    <input
      v-else
      type="file"
      ref="fileInputRef"
      multiple
      class='uploader__input'
      @change="onFileChange"
    >
    <div class='uploader__list'>
      <Button
        class="uploader__btn"
        @click="triggerFileInput"
      >
        <span class="uploader__btn-icon"> <IconPlus /></span>
        Загрузить картинки
      </Button>
      <div
        v-for='(file, index) in uploadedFiles'
        :key='file'
        class='uploader__img uploader__img--temporary'
      >
        <img
          v-if='uploadedFiles.length'
          :src='getFileDataURL(file)'
          alt='каринка продукта'
        >
        <Button
          size='small'
          buttonStyle='danger'
          type='button'
          @click='removeImage(index)'
        >
          <IconRemove />
        </Button>
      </div>
      <div
        v-if='publishedFiles'
        v-for='(file, index) in publishedFiles'
        :key='file.img'
        class='uploader__img'
      >
        <img
          :src='MAIN_URL+file.img'
          :alt='file.id'
        >
        <Button
          size='small'
          buttonStyle='danger'
          type='button'
          @click='confirmRemoveModal(file.id)'
        >
          <IconRemove />
        </Button>
      </div>
    </div>
    <Modal
      v-model='isShowModal'
      title='Удаление изображения'
    >
      Вы уверены, что хотите удалить изображение? Действие отменить будет невозможно
      <template #footer>
        <Button
          @click="isShowModal = false"
          size="small"
        >Отмена
        </Button>
        <Button
          @click="removeImageFromServer"
          size="small"
          buttonStyle="danger"
        >Удалить
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import IconRemove from "@/assets/icons/IconDelete.vue"
import IconPlus from "@/assets/icons/IconPlus.vue"
import {ref, watch, toRefs} from "vue"
import {useImagesStore} from "~/store/images-store"
import Button from "../../features/Button/Button"

const props = defineProps({
  name: String,
  file: Object,
  single: Boolean,
})

const emit = defineEmits(["uploadImage", "updateData", "removeImage"])

const MAIN_URL = useRuntimeConfig().public.MAIN_URL
const fileInputRef = ref(null)
const inputValue = ref()
const uploadedFiles = ref([])
const isShowModal = ref(false)
const removeImageId = ref()
const publishedFiles = ref(props.file)


function onFileChange(event) {
  inputValue.value = event.target.files[0]
  const files = event.target.files

  if (!uploadedFiles.value) {
    uploadedFiles.value = Array.from(files)
  } else {
    for (const file of files) {
      uploadedFiles.value.push(file)
    }
  }

  emit("uploadImage", uploadedFiles.value)
  // setTimeout(() => {
  //   inputFile.value?.dispatchEvent(new Event("input"))
  // })
}

/**
 * Формируем урл для показа локальной загрузки картинки
 * @param file
 * @returns {string}
 */
function getFileDataURL(file) {
  if (uploadedFiles.value.length) {
    return URL.createObjectURL(file)
  }
}

/**
 * Удаление картинки из локального хранилища до загрузки
 * @param index
 */
function removeImage(index) {
  uploadedFiles.value.splice(index, 1)
}

/**
 * Удаление картинки с запросом на сервер
 * @param index
 */
function removeImageFromServer() {
  isShowModal.value = false
  emit("removeImage", removeImageId.value)
  emit("updateData")
}

function confirmRemoveModal(imageId) {
  isShowModal.value = true
  removeImageId.value = imageId
}

function upload(e) {
  e.preventDefault()
  const fileInput = fileInputRef.value
  const file = fileInput.files[0]
  const formData = new FormData()
  formData.append("image", file)
}

/**
 * Триггер через кнопку на инпут
 */
function triggerFileInput() {
  fileInputRef.value.click()
}

watch(
  () => props.file,
  (newFile, oldFile) => {
    publishedFiles.value = newFile
  },
)
</script>
<style
  scoped
  lang='scss'
>
.uploader {

  &__input {
    font-size: 0;
    opacity: 0;
    display: none;
  }

  &__list {
    margin: 0 -4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  &__btn {
    width: 120px;
    height: 120px !important;
    border: 3px solid #f3f3f3;
    margin: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  &__btn-icon {
    margin: 0 0 16px;

    svg {
      fill: $secondary;
    }
  }

  &__img {
    width: 120px;
    height: 120px;
    border: 3px solid $bg-base;
    margin: 4px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: relative;

    &--temporary {

      &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        border: 3px solid transparent;
        border-radius: inherit;
        animation: borderBlink 1s infinite;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
    }

    button {
      position: relative;
      z-index: 1;
    }
  }
}

@keyframes borderBlink {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: $bg-gold;
  }
  100% {
    border-color: transparent;
  }
}
</style>