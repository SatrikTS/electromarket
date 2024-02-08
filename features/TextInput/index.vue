<template>
  <div class='input'>
    <label
      v-if="label"
      :for='name'
    >{{ label }}
    </label>
    <input
      :type='type'
      :id='name'
      :name='name'
      :placeholder='placeholder'
      :value='value'
      :min='min'
      :required='required'
      :autocomplete="name"
      :disabled='disabled'
      @input='(event) => emit("update:value", event.target.value)'
    />
  </div>
</template>
<script
  setup
  lang='ts'
>

enum InputType {
  text = 'text',
  number = 'number',
  hidden = 'hidden',
  email = 'email',
}

interface Props {
  name: string;
  label: string;
  type: InputType;
  disabled: boolean;
  value: string,
  min: number,
  placeholder: string,
  required: boolean
}

interface IEmits {
  (e: 'value'): void
}

const props = defineProps<Props>()
const emit = defineEmits<IEmits>()

</script>
<style
  scoped
  lang='scss'
>
.input {
  display: flex;
  flex-direction: column;
  margin: 0 0 $offset-base;

  label {
    font-weight: bold;
    font-size: 12px;
    margin: 0 $offset-small $offset-small 0;
  }

  input {
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
    height: 40px;

    &:disabled {
      opacity: 0.5;
      background: #d9d9d9;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
}
</style>