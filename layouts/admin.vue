<template>
  <div>
    admin
    <div class="admin" style="display:flex; height: 100%; min-height: 100vh;">
      <div class="admin-column">
        <div class="admin-top">
          <div class="admin-logo">
            <Logo />
          </div>
        </div>
        <h4 class="admin-column__caption">Меню админ-панели</h4>
        <div class="admin-menu">
          <NuxtLink to="/admin">Главная</NuxtLink>
          <NuxtLink to="/admin/orders">Заказы</NuxtLink>
          <NuxtLink to="/admin/products">Товары</NuxtLink>
          <NuxtLink to="/admin/category">Категории</NuxtLink>
          <NuxtLink to="/admin/brands">Бренды</NuxtLink>
          <NuxtLink to="/admin/delivery">Доставка</NuxtLink>
          <NuxtLink to="/admin/pays">Типы оплаты</NuxtLink>
          <NuxtLink to="/admin/articles">Статьи</NuxtLink>
          <NuxtLink to="/admin/topics">Темы постов</NuxtLink>
          <NuxtLink to="/admin/about">О компании</NuxtLink>
        </div>
        <div class="admin-service">
          <Button @click="logOut">Выход из админ-панели</Button>
        </div>
      </div>
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
import { useAuthStore } from '~/store/auth'

const { logUserOut } = useAuthStore()

const logOut = () => {
  logUserOut()
  navigateTo({
    path: '/login',
  })
}
</script>
<style
  scoped
  lang="scss"
>
.admin {
  display: flex;
  height: 100%;
  min-height: 100vh;
}

.admin-logo {
  background: $bg-base;
  border-radius: 3px;
  padding: $offset-small;
}

.admin-menu {
  display: flex;
  flex-direction: column;
}

.admin-column {
  background: $bg-dark;

  &__caption {
    padding: $offset-large;
    background: #3c4b64;
    color: $bg-light;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    margin: 0;
  }
}

.admin-top {
  padding: $offset-large;
}

.admin-menu {
  a {
    background: $bg-dark;
    color: $bg-light;
    padding: $offset-base;

    &:hover {
      background: $bg-main;
      color: $bg-dark;
    }

    &.router-link-active {
      background: $bg-main;
      color: $bg-dark;
    }
  }
}

.admin-content {
  flex: 1;
  padding: $offset-base;
}

.admin-service {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
</style>