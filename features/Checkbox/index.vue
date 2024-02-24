<template>
<label :for='name' class='checkbox'>
  <span>{{ name }}</span>
  <input type='checkbox' :name='name' :id='id'>
  <span class='checkbox-inner'></span>
</label>
</template>
<script setup>
defineProps({
  name: String,
  id: String,
})
</script>
<style scoped lang='scss'>
.checkbox {
  padding: $offset-small 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  transition: color ease-in-out 0.25s;

  &:hover {
    color: #1890ff;

    .checkbox-inner {
      border-color: #1890ff;
    }
  }

}

input {
  display: none;
}

label {
  font-size: 16px;
  cursor: pointer;
}

input:checked + .checkbox-inner {
  border-color: #1890ff;
  background: #1890ff;
}

.checkbox-inner {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 20px;
  height: 20px;
  direction: ltr;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  border-collapse: separate;
  transition: all 0.3s;
  margin-right: $offset-small;

  &::after {
    position: absolute;
    top: 50%;
    left: 20.5%;
    display: table;
    width: 6.71428571px;
    height: 11.14285714px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    content: "";
  }
}
</style>