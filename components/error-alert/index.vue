<template>
  <v-alert v-if="errorMessage" class="alert" color="error" icon="$error"
    >{{ errorMessage }}
  </v-alert>
</template>
<script setup lang="ts">
import { useApiErrorsStore } from '@/store/api-errors-store';
import { storeToRefs } from 'pinia';

const { errorMessage } = storeToRefs(useApiErrorsStore());
</script>
<style scoped></style>
