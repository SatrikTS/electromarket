<template>
  <div class="upload-group">
    <div class="file-input-wrapper">
      <input
        type="file"
        ref="inputUploadRef"
        class="file-input"
        id="fileInput"
        :label="inputTitle"
        show-size
        @change="prepareUploadData"
        @click:clear="clearUploadData"
      >
      <label
        for="fileInput"
        class="file-input-label"
      >
        <span v-if="fileProperties?.name">{{ fileProperties?.name }}</span>
        <span v-else>Выберите файл</span>
      </label>
    </div>
    <v-btn
      color="danger"
      :loading="loading"
      :disabled="!isPrepareData"
      @click="handleUploadInput"
    >
      {{ btnTitle }}
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';

interface Props {
  inputTitle: string,
  btnTitle: string,
}

interface IEmits {
  (e: 'handleUpdate', file: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();

const loading = ref(false);
const files = ref([]);
const isPrepareData = ref(false);
const inputUploadRef = ref();
const fileProperties = ref();

const prepareUploadData = (event) => {
  if (event.target.files[0]) {
    isPrepareData.value = true;
    fileProperties.value = event.target.files[0];
    console.log(fileProperties.value);
  }
};

const clearUploadData = () => {
  isPrepareData.value = false;
};

const handleUploadInput = () => {
  const selectedFile = inputUploadRef.value.files[0];
  loading.value = true;
  emit('handleUpdate', selectedFile);
  loading.value = false;
};
</script>
<style
  scoped
  lang="scss"
>
.upload-group {
  display: flex;

  button {
    height: 56px;
  }
}

.file-input-wrapper {
  position: relative;
  overflow: hidden;
}

.file-input {
  position: absolute;
  font-size: 100px;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}


.file-input-label {
  display: inline-block;
  padding: 15px 25px;
  border:1px solid #4CAF50;
  color: #4CAF50;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 12px;
}

</style>