<template>
  <div class="card-slider">
      <div class="card-slider__big-img">
        <img
          :src="MAIN_URL + activeImage?.img"
          alt="Строительство домов"
        >
      </div>
      <div class="card-slider__select">
        <div
          v-for="(item, index) in images"
          :key="item.id"
          class="card-slider__item"
        >
          <div 
            class="card-slider__img"
            :class="activeImage?.id === item.id ? 'active' : ''"
            @click="setActiveImage(index)"
          >
            <img
              :src="MAIN_URL + item?.img" 
              alt="фотография проекта" 
            >
          </div>
        </div>
      </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';

interface Props {
  images: any,
}

const props = defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const activeImage = ref(props.images[0]);

const setActiveImage = (index: number): void => {
  activeImage.value = props.images[index];
};
</script>
<style
  scoped
  lang="scss"
>
.card-slider {
  &__big-img {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 15px rgba(0,0,0,0.25);
    
    img {
      position: absolute; 
      width: 100%;
      height: 100%;
      top: 0; 
      left: 0;
      object-fit: contain;
    }
  }

  &__select {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &__item {
    width: 25%;
    min-width: 100px;
    padding: 4px;
    cursor: pointer;
  }

  &__img {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.15s ease;

    img {
      position: absolute; 
      width: 100%;
      height: 100%;
      top: 0; 
      left: 0;
      object-fit: cover;
    }

    &:hover {
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.20), 0 5px 10px rgba(0, 0, 1, 0.20);
    }

    &.active {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 15px rgba(0,0,0,0.25);
    }
  }
}
</style>