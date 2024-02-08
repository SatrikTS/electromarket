<template>
  <form @submit='handleForm'>
    <slot/>
<!--    <InputGroup-->
<!--      :inputName='nameInputData'-->
<!--      isRequired-->
<!--      name='name'-->
<!--      @inputName='inputDataName'-->
<!--    ></InputGroup>-->
<!--    <InputGroup-->
<!--      :inputName='inputAgeData'-->
<!--      isRequired-->
<!--      name='age'-->
<!--      @inputName='inputDataAge'-->
<!--    ></InputGroup>-->
<!--    <InputGroup-->
<!--      :inputName='inputPositionData'-->
<!--      name='position'-->
<!--      @inputName='inputDataPosition'-->
<!--    ></InputGroup>-->
<!--    <button type='submit'>submit</button>-->
  </form>
</template>
<script setup>
import {ref} from "vue"


const nameInputData = ref("Aleksandr")
const inputAgeData = ref("")
const inputPositionData = ref("worker")

function inputDataName(data) {
  nameInputData.value = data
}

function inputDataAge(data) {
  inputAgeData.value = data
}

function inputDataPosition(data) {
  inputPositionData.value = data
}

function handleForm(e) {
  e.preventDefault()
  console.log(e)
}
</script>
<style scoped>
</style>