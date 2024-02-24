<template>
  <v-form
    ref="form"
    class="form"
    @submit.prevent
  >
    <v-text-field
      v-model="email"
      label="Введите email"
      :rules="emailRules"
      outlined
    />
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      label="Введите пароль"
      :rules="requiredRules"
      @click:append="show1 = !show1"
      outlined
    />
    <v-btn
      type="submit"
      color="#27ae60"
      @click="submitForm"
    >Войти
    </v-btn>
  </v-form>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { emailRules, requiredRules } from '~/utils/validation';
import { useAuthorisationStore } from '~/store/auth-store';

interface Props {
  email: string,
  password: string
}

interface IEmits {
  (e: 'update:email', email: string): void;
  (e: 'update:password', password: string): void;
  (e: 'submitForm'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();
const show1 = ref(false);
const form = ref();
const email = ref();
const password = ref();
const { authUser } = useAuthorisationStore();

const submitForm = async () => {
  if (form?.value.isValid) {
    const dataForm = new FormData();
    dataForm.append('email', email.value);
    dataForm.append('password', password.value);
    await authUser(dataForm);
    const userToken = useCookie('userToken');
    if (userToken.value && useRouter().options.history.state.back === '/cart') {
      navigateTo('/ordering');
    } else {
      navigateTo('/personal');
    }
  }
};
</script>
<style scoped>
</style>