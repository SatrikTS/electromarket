<template>
  <div class="article">
    <TitleItem
      :caption="title"
    />
    <div class="container">
      <div class="article__wrap">
        <div
          v-for="post in list"
          :key="post.id"
          class="post"
        >
          <NuxtLink :to="{ path: `/${path}/${post.id}` }">
            <div class="post__image">
              <img
                :src="MAIN_URL +'/'+ post.images[0]?.img"
                :alt="post.title"
              >
            </div>
          </NuxtLink>
          <div class="post__title">
            <NuxtLink :to="{ path: `/${path}/${post.id}` }">
              {{ post.title }}
            </NuxtLink>
          </div>
          <small>Тема: {{ post.topic.title }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  title: string,
  list: any[],
  path: string
}

defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
</script>
<style
  scoped
  lang="scss"
>
.article {
  position: relative;

  &__wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    padding: 40px 0;

    @media (max-width: $laptop) {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }

    @media (max-width: $mobile) {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }
  }

  .post {
    text-align: left;

    &__title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      padding: $offset-small 0;
    }

    &__keywords {
      font-size: 13px;
      line-height: 1.4;
    }

    &__image {
      width: 100%;
      height: 250px;
      position: relative;
      overflow: hidden;

      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.25);
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}
</style>