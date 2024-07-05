<template>
  <div>
    data:
    {{ data }}
    <br>
    test: {{ test }}
  </div>
</template>
<script setup lang="ts">

useHead({
  script: [
    {src: "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"}
  ]
})

const data = ref()
const test = ref(1)

onMounted(async () => {

    await window.YaSendSuggestToken("https://sevinstrument.ru/auth/", {
      "kek": true
    });
    test.value = 'post-complete'
})
</script>
<style scoped>
</style>