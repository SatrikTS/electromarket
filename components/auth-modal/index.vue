<template>
  <Modal v-if="isShowModal">
    <div class="auth-modal">
      <div class="auth-modal-header">
        <h3 v-if="isAuthBtn">Авторизация</h3>
        <h3 v-if="!isAuthBtn">Регистрация</h3>
        <Button
          buttonStyle="danger"
          size="small"
          @click="isAuthBtn = !isAuthBtn"
        >
          <span v-if="!isAuthBtn">к авторизации</span>
          <span v-if="isAuthBtn">к регистрации</span>
        </Button>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="getAuth">
      <div class="auth-modal-bottom">
        <v-text-field
          v-if="!isAuthBtn"
          label="Имя"
        ></v-text-field>
        <v-text-field
          label="Email"
          :rules="emailRules"
          v-model="email"></v-text-field>
        <v-text-field
          :rules="passwordRules"
          label="Пароль"
          v-model="password"
        ></v-text-field>
        <v-text-field
          v-if="!isAuthBtn"
          label="Повторите пароль"
        ></v-text-field>
      </div>
      <div class="auth-modal-btn-group">
        <Button
          v-if="isAuthBtn"
          buttonStyle="success"
          type="submit"
        >
          Войти
        </Button>
        <Button
          v-if="!isAuthBtn"
          buttonStyle="success"
          @click="isAuthBtn = !isAuthBtn"
        >
          Зарегистрироваться
        </Button>
      </div>
      </v-form>
    </div>
  </Modal>
</template>
<script
  lang="ts"
  setup
>
import {useAuthStore} from "~/store/auth"
import {emailRules, passwordRules} from '../../utils/validation'
import Modal from '../modal/index';
import {ref} from 'vue'

interface Props {
  isShowModal: boolean;
}

const props = defineProps<Props>();
const isAuthBtn = ref(true);
const email = ref()
const password = ref()
const inputEmail = ref()
const valid = ref()
const form = ref()
const authStore = useAuthStore()
const { authUser } = authStore

const getAuth = async () => {
  if(form.value.isValid) {
    // console.log(email.value);
    // console.log(password.value);

    const formData = new FormData()
    formData.append("email", email.value);
    formData.append("password", password.value);

    await authUser(formData).then((response) => {
      console.log(response);
    })
    if (authUserStateGetter.value) {

    }
  }
}
</script>
<style
  scoped
  lang="scss"
>
.auth-modal {
  width: 320px;
}

.auth-modal-header {
  margin: 0 0 12px;
  display: flex;
  justify-content: space-between;
}

.auth-modal-btn-group {
  margin: 0 0 12px;
}

.auth-modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>