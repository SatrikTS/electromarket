<template>
  <div class='container'>
    <div class='wrapper'>
      <form
        novalidate
        @submit.prevent='handleSubmit'
      >
        <Form></Form>
      </form>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue"

// const name = ref("")
// const position = ref("")
// const age = ref("")
// const isError = ref(false)
const properties = ref([])
const errorList = ref({})

function handleSubmit(e) {
  // console.log(e.target.elements)
  [...e.target.elements].forEach((item) => {
    // console.log(item)
    console.log(JSON.parse(item.getAttribute("isRequired")))
    if (JSON.parse(item.getAttribute("isRequired"))) {
      // console.log(item)
    }

    properties.value.push(item.getAttribute("name"))
  })

  // console.log(properties)

}
</script>
<style
  lang='scss'
  scoped
>
.container {
  background: aliceblue;
  width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.wrapper {
  padding: 16px;
}

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

button {
  background: #27ae60;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  border: 1px solid #27ae60;
  box-shadow: none;
  cursor: pointer;
  transition: all 0.35s ease-in-out;

  &:hover {
    background: white;
    color: #27ae60;
  }
}
</style>