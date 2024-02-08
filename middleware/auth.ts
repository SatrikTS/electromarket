import { storeToRefs } from 'pinia';
import {useAuthStore} from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const maxAge = 28800
  const authStore = useAuthStore()
  const { authenticated, authUserStateGetter } = storeToRefs(authStore);
  const token = useCookie('token', {maxAge: maxAge});

  if (token.value) {
    authenticated.value = true
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/admin');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    // abortNavigation();
    return navigateTo('/login');
  }
})