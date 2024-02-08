<template>
  <div class='input-group'>
    <label for='text'>{{ name }}: {{ inputName }}</label>
    <input
      :isRequired='isRequired'
      :name='name'
      :value='inputName'
      type='text'
      @input='updateInput'
    >
    <span v-if='isError'>error 3</span>
  </div>
</template>
<script setup>
const props = defineProps({
  inputName: String,
  isError: Boolean,
  name: String,
  isRequired: Boolean,
})
const emit = defineEmits(["inputName"])

function updateInput(data) {
  emit("inputName", data.target.value)
}
</script>
<style
  lang='scss'
  scoped
>
.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 16px;

  label {
    font-size: 14px;
    margin: 0 0 12px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }
}
</style>