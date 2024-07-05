<template>
  <div>
    vk auth
  </div>
</template>
<script setup lang="ts">
import { useAuthorisationStore } from '~/store/auth-store';

const { saveVKSilentToken } = useAuthorisationStore();
const temporaryToken = ref()
const temporaryUUID = ref()
// Функция для получения параметра из URL по его названию
const getQueryParam =(param) => {
  let params = new URLSearchParams(window.location.search);
  return params.get(param);
}

let payload = getQueryParam('payload');

if (payload) {
  try {
    const decodedPayload = decodeURIComponent(payload);
    const payloadObject = JSON.parse(decodedPayload);
    await saveVKSilentToken(JSON.stringify({
      silent_token: payloadObject.token,
      uuid: payloadObject.uuid}))

      const userToken = useCookie('userToken');
      if (userToken.value && useRouter().options.history.state.back === '/cart') {
        navigateTo('/ordering');
      } else {
        navigateTo('/personal');
      }
  } catch (e) {
    console.error("Error parsing payload:", e);
  }
} else {
  console.error("No payload found in URL");
}

const getUserDataVK = async (token) => {

}

</script>
<style scoped>
</style>