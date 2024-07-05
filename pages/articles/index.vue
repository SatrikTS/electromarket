<template>
  <ArticleList
    title="Статьи"
    :list="posts.data"
    path="articles"
  />
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/store/posts-store';
import ArticleList from '~/components/articles-list';

const { posts } = storeToRefs(usePostsStore());
const { getPosts } = usePostsStore();
await getPosts(1);
</script>