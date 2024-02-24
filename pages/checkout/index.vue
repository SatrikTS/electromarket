<template>
  <div class="checkout">
    <h3 v-if="auth && !codeState">Авторизация</h3>
    <h3 v-if="!auth && !codeState">Регистрация</h3>
    <h3 v-if="codeState">Верификация</h3>
    <CheckoutFormAuthorisation v-if="auth && !codeState" />
    <CheckoutFormRegistration
      v-if="!auth && !codeState"
      @successRegistration="successRegistration"
    />
    <CheckoutFormVerification v-if="codeState" />
    <br>
    <v-btn
      v-if="!auth && !codeState"
      variant="text"
      @click="toggleForm"
    >Авторизация
    </v-btn>
    <v-btn
      v-if="auth &&  !codeState"
      variant="text"
      @click="toggleForm"
    >Регистрация
    </v-btn>
  </div>
  <ErrorAlert />
  <SuccessMessage :message="registrationMessage" />
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';

definePageMeta({
  layout: 'checkout',
  middleware: 'checkout',
});

const auth = ref(true);
const codeState = ref(false);
const registrationMessage = ref();

const toggleForm = () => {
  auth.value = !auth.value;
};

const successRegistration = (value) => {
  codeState.value = true;
  registrationMessage.value = value;

  setTimeout(() => {
    registrationMessage.value = null;
  }, 3000);
};
</script>
<style
  scoped
  lang="scss"
>
.checkout {
  max-width: 100%;
  width: 400px;
  margin: 0 auto;

  h3 {
    margin: 0 0 12px;
  }

  button {
    width: 100%;
  }
}
</style>