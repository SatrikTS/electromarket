<template>
  <div class="personal-data">
    zakazi
  </div>
</template>
<script
  setup
  lang="ts"
>
import { useAuthorisationStore } from '~/store/auth-store';
import { storeToRefs } from 'pinia';
import { usePersonalStore } from '~/store/personal-store';

const { personalData } = storeToRefs(usePersonalStore());

definePageMeta({
  layout: 'personal',
  middleware: 'checkout',
});

interface Props {
  data: any;
}

const props = defineProps<Props>();
const { logoutUser } = useAuthorisationStore();

console.log(props, 1);

const logOut = () => {
  logoutUser();
  location.reload();
};
</script>
<style
  lang="scss"
  scoped
>
.personal-data {
  position: relative;
}
</style>