<template>
  <div class="title">
    <div class="container">
      <h2>
        {{ caption }}
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  /**
   * Заголовок
   */
  caption: string;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.title {
  background: #b9b9b9;
  padding: $offset-base 0;

  h2 {
    margin: 0;
  }
}
</style>
