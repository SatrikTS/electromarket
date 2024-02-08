<template>
  <div>
    <Header/>
    <main>
      <slot />
    </main>
    <Footer/>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
const screenWidth = ref()

onMounted(() => {
  screenWidth.value = window.innerWidth
})

</script>
<style scoped>
</style>