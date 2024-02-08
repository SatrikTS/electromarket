<template>
  <div class='textarea'>
    <label
      v-if="label"
      :for='name'
    >{{ label }}
    </label>
    <textarea
      :type='type'
      :id='name'
      :name='name'
      :placeholder='placeholder'
      :value='props.value'
      :min='min'
      :required='required'
      @input='updateInputValue'
    />
  </div>
</template>
<script setup lang='ts'>
import {ref} from 'vue'

enum InputType {
  text = 'text',
  number = 'number',
  hidden = 'hidden',
  email = 'email',
}

interface InputProps {
  name: string;
  label: string;
  type: InputType;
  disabled: boolean;
  value: string,
  min: number,
  placeholder: string,
  required: boolean
}

const props = defineProps({
  name: String,
  label: String,
  placeholder: String,
  value: String,
  min: Number,
  required: Boolean,
  type: {
    type: String,
    default: 'text',
    validator: (value: InputProps['type']) => ['text', 'number', 'hidden', 'email', 'button'].includes(value)
  },
})

const emit = defineEmits(['value'])

const inputValue = ref(props.value)

function updateInputValue(event: any) {
  inputValue.value = event.target.value;
  emit('update:value', inputValue.value);
}

</script>
<style scoped lang='scss'>
.textarea {
  display: flex;
  flex-direction: column;
  margin: 0 0 $offset-base;

  textarea {
    box-sizing: border-box;
    margin: 0;
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
    height: 140px;
    outline: none;
  }


  &:hover:not(.input-disabled) {
    border-color: #40a9ff;
    border-right-width: 1px;
  }

  &:focus {
    border-color: #40a9ff;
    box-shadow: $shadows;
    box-shadow: none;
    border-right-width: 1px;
    outline: 0;
  }

  &-disabled {
    cursor: not-allowed;
    background: #f5f5f5;
    color: #00000040;
    border-color: #d9d9d9;
    box-shadow: none;
  }

  label {
    font-size: 12px;
    font-weight: bold;
    margin: 0 $offset-small $offset-small 0;
  }
}


</style>