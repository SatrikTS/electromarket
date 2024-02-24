<template>
  <div class="personal-page">
    <header class="personal-page__header">
      <div class="container">
        <div class="personal-page__wrapper">
          <Logo />
          <div
            class="personal-page__header-section"
          >
            <Profile />
            <HeaderCart />
          </div>
        </div>
      </div>
    </header>
    <main class="container">
      <div class="personal-page__content">
        <div class="personal-page__column">
          <h3>Мой кабинет</h3>
          <v-btn @click="logOut">Выход из личного кабинета</v-btn>
          <PersonalMenu />
        </div>
        <slot />
      </div>
    </main>
    <footer class="personal-page__footer">
      <div class="container">
        <div class="personal-page__wrapper">
          <Address />
          <Phones />
        </div>
      </div>
    </footer>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { useAuthorisationStore } from '~/store/auth-store';
import { usePersonalStore } from '~/store/personal-store';

const { getPersonalData } = usePersonalStore();
const { logoutUser } = useAuthorisationStore();

await getPersonalData();

const logOut = () => {
  logoutUser();
  location.reload();
};
</script>
<style
  scoped
  lang="scss"
>
.personal-page {

  &__content {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 30% calc(70% - 16px);
    gap: 16px;
  }

  &__column {
    margin: 0 0 16px;
    background: $bg-base;
    border-radius: 8px;
    padding: $offset-large $offset-large $offset-small;
  }

  &__header {
    width: 100%;
    background: #f2f3f5;
  }

  &__footer {
    width: 100%;
    background: #f2f3f5;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }

  &__header-section {
    display: flex;
    align-items: flex-start;
  }

  main {
    padding: 16px 0;
  }
}
</style>