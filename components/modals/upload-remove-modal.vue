<template>
  <v-dialog v-model="showModal" class="modal" max-width="500">
    <v-card>
      <v-toolbar
        color="#e74c3c"
        title="Вы точно хотите удалить элемент?"
      ></v-toolbar>
      <v-card-text> Действие невозможно будет отменить </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="emit('update:modelValue', false)"
        >Отмена
        </v-btn>
        <v-btn color="#e74c3c" @click="emit('confirm')">Подтвердить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { watch } from 'vue';

interface Props {
  modelValue: boolean;
}

interface IEmits {
  (e: 'update:modelValue', value: boolean): void;
  /**
   * Подтверждение действия
   * @param e
   */
  (e: 'confirm'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();
const showModal = ref();

watch(
  () => props.modelValue,
  (oldState) => {
    showModal.value = oldState;
  },
);

watch(
  () => showModal.value,
  () => {
    if (!showModal.value) emit('update:modelValue', false);
  },
);
</script>
