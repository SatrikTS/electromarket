<template>
  <div class="sort">
    <span class="sort-caption">Сортировать по цене:</span>
    <div class="sort-wrap">
      <Button
        :class="{ active: sortByPrice === 'low' }"
        size="small"
        @click="getSortDataLow"
      >Сначала дешевые
      </Button>
      <Button
        :class="{ active: sortByPrice === 'high' }"
        size="small"
        @click="getSortDataHigh"
      >Сначала дорогие
      </Button>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';

interface IEmits {
  (e: 'sort', value: string): void,
}

const emit = defineEmits<IEmits>();
const sortByPrice = ref();

const getSortDataHigh = () => {
  sortByPrice.value = 'high';
  emit('sort', 'price_desc');
};

const getSortDataLow = () => {
  sortByPrice.value = 'low';
  emit('sort', 'price_asc');
};
</script>
<style
  scoped
  lang="scss"
>
.sort {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: $bg-base;
  padding: $offset-small;
  border-radius: 8px;

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    margin-left: 12px;
  }
}

.sort-wrap {
  display: flex;
  align-items: center;

  @media (max-width: $mobile) {
    margin: $offset-small 0 0;

    button {
      margin: 0;
    }
  }
}

.sort-caption {
  font-size: 12px;
}
</style>