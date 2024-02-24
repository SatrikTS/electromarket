<template>
  <div class="personal">
    <h3>Персональные данные</h3>
    <p>Заполните или измените свои персональные данные.
       Данные полностью конфиденциальны и доступны только Вам и нашей службе поддержки</p>
    <v-form
      ref="form"
      class="form"
      @submit.prevent
    >
      <v-text-field
        v-model="personalData.name"
        label="Ваше имя"
        :rules="requiredRules"
        outlined
      />
      <v-text-field
        v-model="personalData.email"
        label="Введите email"
        :rules="emailRules"
        outlined
      />
      <v-text-field
        v-model="personalData.phone"
        label="Ваш телефон"
        :rules="phoneRules"
        type="number"
        hide-spin-buttons
        outlined
      />
      <v-textarea
        v-model="personalData.address"
        label="Ваш адрес"
        outlined
      />
      <v-btn
        type="submit"
        color="#27ae60"
        @click="submitForm"
      >Сохранить
      </v-btn>
    </v-form>
    <SuccessMessage :message="successMessage" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { usePersonalStore } from '~/store/personal-store';
import { storeToRefs } from 'pinia';
import { emailRules, requiredRules, phoneRules } from '@/utils/validation';
import { ref } from 'vue';

definePageMeta({
  layout: 'personal',
  middleware: 'checkout',
});

const { personalData } = storeToRefs(usePersonalStore());
const { putPersonalData } = usePersonalStore();
const form = ref();
const successMessage = ref()

const submitForm = async () => {

  const params = {
    name: personalData.value.name,
    phone: personalData.value.phone,
    email: personalData.value.email,
    address: personalData.value.address
  }

  if (form?.value.isValid) {
    const response = await putPersonalData(personalData.value.id, params)
    successMessage.value = response

    setTimeout(() => successMessage.value = null, 3000)
  }
};
</script>
<style scoped src="./styles.scss">
</style>