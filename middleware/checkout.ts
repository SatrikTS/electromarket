export default defineNuxtRouteMiddleware((to, from) => {
  const maxAge = 28800;
  const userToken = useCookie('userToken', { maxAge });

  if (userToken.value && to?.name === 'auth' && from.name === 'cart') {
    return navigateTo('/ordering');
  }

  // if token doesn't exist redirect to log in
  if (!userToken.value && to?.name !== 'auth' && to?.name !== 'personal') {
    return navigateTo('/');
  }

  if (!userToken.value && to?.name === 'personal') {
    return navigateTo('/auth/', {
      external: true,
    });
  }

  // if (!userToken.value && from?.name === 'auth') {
  //   return navigateTo('/auth/', {
  //     external: true,
  //   });
  // }

  if (userToken.value && to?.name === 'checkout' && from.name !== 'cart') {
    return navigateTo('/personal');
  }
});
