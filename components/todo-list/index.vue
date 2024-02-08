<template>
  <div class="todo-list">
    <span class="label">{{ label }}</span>
    <div
      class="todo-list__wrap"
    >
      <div
        v-for="(item, index) in inputValue"
        :key="index"
        class="todo-list__item"
      >
        <input
          v-model="item.key"
          placeholder="Ключ"
        />
        <input
          v-model="item.value"
          placeholder="Значение"
        />
        <v-btn
          depressed
          @click="removeItem(index)"
        >-
        </v-btn>
      </div>
    </div>
    <v-btn
      type="button"
      class="todo-list__btn"
      size="small"
      color="primary"
      @click="addItem"
    >Добавить
    </v-btn>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';

interface Props {
  /**
   * Список значений
   */
  dataList: { key: '', value: '' }[],
  /**
   * Текст для обозначения компонента
   */
  label: string
}

const props = defineProps<Props>();
const inputValue = ref(props.dataList);

/**
 * Добавляем значение
 */
const addItem = () => {
  inputValue.value.push({ key: '', value: '' });
};

/**
 * Удаляем значение
 */
const removeItem = (index: number): void => {
  inputValue.value.splice(index, 1);
};
</script>
<style lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 $offset-small;
  }

  &__btn {
    margin: 0 0 $offset-small;
  }

  .label {
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
  }

  input {
    box-sizing: border-box;
    margin: 0 4px;
    font-variant: tabular-nums;
    list-style: none;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: #000000d9;
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s;
    box-shadow: none;
    height: 40px;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
