<template>
  <v-dialog v-model="showModal" class="modal" max-width="500">
    <v-card>
      <v-form ref="form" class="form" @submit.prevent>
        <v-toolbar
          color="#27ae60"
          title="Создать новый элемент в список"
        ></v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="title"
            :rules="requiredRules"
            class="input"
            label="Название"
          />
          <v-textarea
            v-model="description"
            clearable
            clear-icon="mdi-close-circle"
            label="Описание"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="emit('update:modelValue', false)"
            >Отмена
          </v-btn>
          <v-btn color="#27ae60" type="submit" @click="submitForm"
            >Добавить элемент
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { requiredRules } from '@/utils/validation';
import { watch, ref } from 'vue';

interface Props {
  modelValue: boolean;
}

interface IEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:titleOption', value: string): void;
  (e: 'update:descriptionOption', value: string): void;
  (e: 'confirm'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();

const showModal = ref();
const title = ref();
const description = ref();
const form = ref();

const submitForm = (): void => {
  if (form.value.isValid) {
    emit('confirm');
  }
};

watch(
  () => title.value,
  () => {
    emit('update:titleOption', title.value);
  },
);

watch(
  () => description.value,
  () => {
    emit('update:descriptionOption', description.value);
  },
);

watch(
  () => props.modelValue,
  (oldState) => {
    showModal.value = oldState;
    if (!showModal.value) {
      title.value = '';
      description.value = '';
    }
  },
);

watch(
  () => showModal.value,
  () => {
    if (!showModal.value) emit('update:modelValue', false);
  },
);
</script>
