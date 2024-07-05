<template>
  <div class="about">
    <h1>{{ aboutPost.data.title }}</h1>
    <div v-if="!isLoading" v-html="aboutPost.data.main_text"></div>
    <div class="about__images">
      <CardSlider :images="aboutPost.data.images"></CardSlider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAboutStore } from '@/store/about-store';

definePageMeta({
  layout: "pages",
})

const { getAboutData, isLoading } = useAboutStore();
const { aboutPost} = storeToRefs(useAboutStore());

await getAboutData();

</script>
<style scoped lang="scss">
.about {
  position: relative;

  &__images {
    max-width: 900px;
    margin: 16px auto;
  }
}
</style>