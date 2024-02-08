<template>
  <div class='caption'>
    <div class='container'>
      <h2>
        {{ caption }}
      </h2>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  caption: String
})
</script>
<style scoped lang='scss'>
.caption {
  background: $bg-base;
  padding: $offset-base 0;

  h2 {
    margin: 0;
  }
}
</style>