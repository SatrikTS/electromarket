<template>
  <div>
    <div class="personal-menu">
      <NuxtLink to="/cart">Моя корзина</NuxtLink>
      <NuxtLink to="/personal">Мои заказы</NuxtLink>
      <NuxtLink to="/personal/settings">Мои данные</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.personal-menu {
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  a {
    padding: 8px;

    &:hover {
      background: $bg-light;
    }

    &.router-link-active {
      background: $bg-light;
    }
  }
}
</style>