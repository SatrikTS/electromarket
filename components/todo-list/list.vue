<template>
  <div>
    <div
      class='todo-list__wrap'
      v-for="(item, index) in dataList"
      :key="index"
    >
      <input
        v-model="item.key"
        placeholder="Ключ"
      />
      <input
        v-model="item.value"
        placeholder="Значение"
        @blur='updateData'
      />
      <Button @click="removeItem(index)">-</Button>
      <input
        type='hidden'
        ref='inputTodo'
        :name='name'
        :value='inputValue'
      >
    </div>
    <Button @click="addItem">Add</Button>
  </div>
</template>
<script setup lang='ts'>
import {ref} from 'vue'

const props = defineProps({
  dataList: [],
  name: String
})

const items = ref(props.dataList ? props.dataList : [{ key: "", value: "" }])
const inputTodo = ref()
const inputValue = ref()

const addItem = () => {
  inputValue.value = JSON.stringify(items.value)
  setTimeout(() => {
    inputTodo.value?.dispatchEvent(new Event("input"))
  })

  items.value.push({ key: "", value: "" })
}

const updateData = () => {
  inputValue.value = JSON.stringify(items.value)
  setTimeout(() => {
    inputTodo.value?.dispatchEvent(new Event("input"))
  })
}

const removeItem = (index) => {
  items.value.splice(index, 1)

  inputValue.value = JSON.stringify(items.value)
  setTimeout(() => {
    inputTodo.value?.dispatchEvent(new Event("input"))
  })
}
</script>
<style scoped>
</style>