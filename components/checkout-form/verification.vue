<template>
  <div>
    <h5>Введите регистрационный код, высланный на указанную почту</h5>
    <br>
    <v-form
      ref="formVerification"
      class="form"
      @submit.prevent
    >
      <v-text-field
        v-model="verificationEmail"
        label="Email"
        :rules="emailRules"
        outlined
      />
      <v-text-field
        v-model="verificationCode"
        label="Введите код из письма"
        :rules="requiredRules"
        outlined
      />
      <v-btn
        type="submit"
        color="#27ae60"
        @click="submitVerificationForm"
      >Подтвердить код
      </v-btn>
    </v-form>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { emailRules, requiredRules } from '~/utils/validation';
import { useAuthorisationStore } from '~/store/auth-store';

const { verificationUser } = useAuthorisationStore();

const verificationEmail = ref();
const verificationCode = ref();
const formVerification = ref();
const code = ref();

onMounted(() => {
  if (getCookie('verificationEmail')) {
    verificationEmail.value = getCookie('verificationEmail');
  }
});

const submitVerificationForm = async () => {
  if (formVerification?.value.isValid) {
    const dataForm = new FormData();
    dataForm.append('email', verificationEmail.value);
    dataForm.append('registr_code', verificationCode.value);
    const response = await verificationUser(dataForm);

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