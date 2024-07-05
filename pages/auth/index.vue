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
    <span class="checkout-label">Или войдите следующим образом: </span>
    <div id="buttonContainerId" class="checkout-ya-btn"></div>
    <div id="VkIdSdkOneTap"></div>
  </div>
  <ErrorAlert />
  <SuccessMessage :message="registrationMessage" />
</template>
<script
  setup
  lang="ts"
>
import { ref, nextTick } from 'vue';
import { useAuthorisationStore } from '~/store/auth-store';
import * as VKID from '@vkid/sdk';


useHead({
  bodyAttrs: {
    class: "checkout",
  },
  script: [
    {src: "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"},
  ]
})

definePageMeta({
  layout: 'checkout',
  middleware: 'checkout',
});

const auth = ref(true);
const codeState = ref(false);
const registrationMessage = ref();
const { authYandex } = useAuthorisationStore();

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

onMounted(() => {
// Создание экземпляра кнопки.
  const oneTap = new VKID.OneTap();

  VKID.Config.set({
    app: '51930076', // Идентификатор приложения.
    redirectUrl: 'https://sevinstrument.ru/vk', // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82...' // Произвольная строка состояния приложения.
  });

  const container = document.getElementById('VkIdSdkOneTap');

  if (container) {
    oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS, styles: {height: 36, borderRadius: 4} });
  }


})

onMounted(() => {
  window?.YaAuthSuggest?.init(
    {
      client_id: "c53de71d2ae943b39d93c2f8efdcb822",
      response_type: "token",
      redirect_uri: "https://sevinstrument.ru/suggest/token"
    },
    "https://sevinstrument.ru",
    {
      view: "button",
      parentId: "buttonContainerId",
      buttonSize: 'xs',
      buttonView: 'main',
      buttonTheme: 'light',
      buttonBorderRadius: "4",
      buttonIcon: 'ya',
    }
  )
  .then(({handler}) => handler())
  .then(async (data) => {
    getYandexUserData(data)
  })
  .catch(error => console.log('Обработка ошибки', error))
})

const getYandexUserData = async (data) => {

  await fetch(`https://login.yandex.ru/info?format=json`, {
    method: 'GET',
    headers: {
      'Authorization': `OAuth ${data.access_token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(async user => {
    await authYandex(user)
    const userToken = useCookie('userToken');
    if (userToken.value && useRouter().options.history.state.back === '/cart') {
      navigateTo('/ordering');
    } else {
      navigateTo('/personal');
    }
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

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

.checkout-ya-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.checkout-label {
  font-size: 14px;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>