<template>
  <v-alert
    v-if="message"
    class="alert"
    color="green"
    icon="$success"
  >{{ message }}
  </v-alert>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  message: string;
}

defineProps<Props>();
</script>
<style scoped>
</style>