<template>
  <div>
    <h1>Авторизация</h1>
    <form
      action=''
      class='auth'
    >
      <TextInput
        placeholder='Имя'
        v-model:value='email'
        name='email'></TextInput>
      <TextInput placeholder='Пароль' v-model:value='password' name='password'></TextInput>
      <Button @click="getAuth">Вход</Button>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "pages",
  middleware: 'auth',
})
import { storeToRefs } from 'pinia';
import {useAuthStore} from "~/store/auth"
import {ref} from 'vue'

const authStore = useAuthStore()
const { authenticateAdmin } = authStore
const { authenticated, authStatusGetter, authUserStateGetter } = storeToRefs(authStore); // make authenticated state reactive with storeToRefs
const router = useRouter();

const email = ref()
const password = ref()

async function getAuth(e) {
  e.preventDefault()
  const formData = new FormData()
  formData.append("email", email.value);
  formData.append("password", password.value);
  await authenticateAdmin(formData)
  if (authUserStateGetter.value) {
    navigateTo('/admin');
  }
}
</script>
<style
  scoped
  lang='scss'
>
.auth {
  max-width: 300px;
  margin: $offset-large 0;
}
</style>