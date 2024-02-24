<template>
  <div class="profile">
    <UserLogo @click="navigateTo('/personal')"/>
  </div>
</template>
<script setup lang="ts">
import UserLogo from '../../assets/icons/IconUser.vue'
</script>
<style scoped lang="scss">
.profile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>