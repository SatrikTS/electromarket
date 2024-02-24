<template>
  <v-form
    ref="formRegistration"
    class="form"
    @submit.prevent
  >
    <v-text-field
      v-model="name"
      label="Введите имя"
      :rules="requiredRules"
      outlined
    />
    <v-text-field
      v-model="email"
      label="Введите email"
      :rules="emailRules"
      outlined
    />
    <v-text-field
      v-model="password"
      label="Введите пароль"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      counter
      @click:append="show1 = !show1"
      outlined
    />
    <v-text-field
      v-model="password2"
      label="Повторите пароль"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="matchingPasswords(password)"
      :type="show1 ? 'text' : 'password'"
      counter
      @click:append="show1 = !show1"
      outlined
    />
    <v-btn
      type="submit"
      color="#27ae60"
      @click="submitRegistrationForm"
    >Зарегистрироваться
    </v-btn>
  </v-form>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { setCookie } from '~/utils/cookie';
import { useAuthorisationStore } from '~/store/auth-store';
import { emailRules, requiredRules, passwordRules, matchingPasswords } from '~/utils/validation';

interface IEmits {
  (e: 'successRegistration', value: string): void;
}

const emit = defineEmits<IEmits>();

const { registrationUser } = useAuthorisationStore();
const email = ref();
const name = ref();
const password = ref();
const password2 = ref();
const formRegistration = ref();
const verificationEmail = ref();
const show1 = ref(false);

const submitRegistrationForm = async () => {
  if (formRegistration?.value.isValid) {
    const dataForm = new FormData();
    dataForm.append('name', name.value);
    dataForm.append('email', email.value);
    dataForm.append('password', password.value);

    setCookie('verificationEmail', email.value, 2);
    verificationEmail.value = email.value;
    const response = await registrationUser(dataForm);
    setTimeout(() => emit('successRegistration', response.message), 2000);
  }
};
</script>
<style scoped>
</style>