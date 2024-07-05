<template>
  <div
    class="profile"
    @click="navigateTo('/personal')"
  >
    <div
      v-if="personalData?.name"
      class="profile__user"
    >
      <span class="profile__user-name">{{ personalData?.name }}</span>
      <UserLogo class="profile-icon" />
    </div>
    <div
      v-else
      class="profile__enter"
    >
      <span>Войти</span>
      <UserLogo class="profile-icon" />
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import UserLogo from '../../assets/icons/IconUser.vue';
import { storeToRefs } from 'pinia';
import { usePersonalStore } from '~/store/personal-store';

const { personalData } = storeToRefs(usePersonalStore());

</script>
<style
  scoped
  lang="scss"
>
.profile {
  position: relative;
  cursor: pointer;

  &__enter {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      @media (max-width: $mobile) {
        display: none;
      }
    }

    &:hover {
      color: $primary;

      .profile-icon {
        fill: $primary;
      }
    }

    svg {
      @media (max-width: $mobile) {
        width: 32px;
        height: 32px;
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: $primary;

      .profile-icon {
        fill: $primary;
      }
    }
  }

  &__user-name {
    @media (max-width: $mobile) {
      display: none;
    }
  }

  &-icon {
    min-width: 26px;
    width: 26px;
    height: 24px;
    fill: #000;

    @media (max-width: $mobile) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>