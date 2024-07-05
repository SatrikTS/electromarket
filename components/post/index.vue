<template>
  <div class="post">
    <Head>
      <Title>Монолитстрой | {{ article?.data.keywords }}</Title>
      <Meta
        name="description"
        :content="article?.data.keywords"
      />
    </Head>
    <TitleItem
      :caption="article.data.title"
    />
    <div class="container">
      <v-breadcrumbs
        :items="[
         {
          title: 'Статьи',
          disabled: false,
          href: '/articles',
        },
        {
          title: `${article.data.title}`,
          disabled: true,
        },
      ]"
        divider="-"
      ></v-breadcrumbs>
      <div class="container">
        <img
          v-if="images"
          :src="MAIN_URL +'/'+ images[0]?.img"
          class="post__img"
          alt="Монолит строй СПб"
        >
        <div
          v-if="article.data.main_text"
          class="content"
          v-html="article.data.main_text"
        ></div>
        <div class="clear">
        </div>
        <div class="post__images">
          <ImagesList
            :images="images.slice(1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/store/posts-store'
// import { useRoute } from 'nuxt/app'
//
const { article } = storeToRefs(usePostsStore())
const { getPostItem } = usePostsStore()
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
await getPostItem(useRoute().params.id)
const images = ref(article.value.data.images)
</script>
<style
  scoped
  lang="scss"
>
.post {
  position: relative;

  .v-breadcrumbs {
    padding-left: 0;
  }

  &__img {
    width: 450px;
    max-width: 100%;
    padding: 0 $offset-base $offset-small 0;
  }

  &__images {
    margin: 0 0 $offset-xlarge;
  }

  &__video {
    max-width: 100%;
    margin: 0 0 $offset-xlarge;
  }
}
</style>