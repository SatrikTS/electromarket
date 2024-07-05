<template>
  <div>
    <ckeditor
      v-model="editorHtml"
      :editor="ClassicEditor"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>
<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

interface Props {
  /**
   * текст для редактора
   */
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const editorConfig = ref({
  language: 'ru',
});

const editorHtml = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
<style>
.ck-editor__editable {
  min-height: 500px;
}

.ck-file-dialog-button {
  display: none !important;
}
</style>
