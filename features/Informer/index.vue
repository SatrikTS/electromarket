<template>
  <div class='informer'>
    <span v-if='status === "success"' class='informer-icon informer-icon--success'>
      <IconCheck/>
    </span>
    <span v-if='status === "danger"' class='informer-icon informer-icon--danger'>
      <IconCheck/>
    </span>
    <slot/>
  </div>
</template>
<script setup>
defineProps({
  status: String
})
import IconCheck from '../../assets/icons/IconCheck.vue'
</script>
<style scoped lang='scss'>
.informer {
  display: flex;
  align-items: center;
  background: $bg-main;
  border-radius: 3px;
  padding: $offset-small $offset-base;
  box-shadow: $shadows;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 10;
  font-size: 14px;
}

.informer-icon {
  display: flex;
  border-radius: 100%;
  padding: 4px;
  margin-right: 8px;

  &--success {
    border: 1px solid $success;
    background: $success;

    svg {
      fill: $bg-main
    }
  }

  &--danger {
    border: 1px solid $danger;
    background: $danger;

    svg {
      fill: $bg-main
    }
  }
}
</style>