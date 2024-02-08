<template>
  <div
    ref="componentRef"
    :class="[
      classes['select'],
      disabled && classes['is-disabled'],
    ]"
  >
    <div @click="toggleSelectList">
      <div
        :class="[
          classes['select__selector'],
          isActiveSelect && classes[`is-active`],
          size === 'large' && classes['select__selector-lg'],
          size === 'small' && classes['select__selector-sm'],
          disabled && classes['is-disabled'],
          required && inputValue?.length < 1 && classes[`is-error`]]"
      >
        <span
          v-if='!isFocusInput && inputValue'
          :class="classes['select__selection']"
        >
          {{ inputValue.title || inputValue.label || props.value?.value }}
        </span>
        <label
          :class="[
              label?.length && classes['label'],
              required && value?.length < 1 && classes['label-error'],
              value?.length && classes['label-active'],
              value?.length && size === 'small' && classes['label-active-sm'],
              size === 'small' && classes['label-sm'],
              size === 'large' && classes['label-lg'],
          ]"
        >{{ props.label }}
        </label>
        <div :class="classes['select__manage']">
          <span
            :class="classes['select__arrow']"
          >
            <IconArrow />
          </span>
          <span
            v-if='props.value?.value && isCross'
            :class="classes['select-_clear-cross']"
            @click='removeAll'
          >
            <IconClose />
          </span>
        </div>
      </div>
      <span
        v-if='!validity?.isErrorField'
        :disabled='disabled'
        :class="[ classes['supporting-text'], disabled && classes['input-disabled']]"
      > {{ supportingText }}</span>
    </div>
    <span
      v-if='required && isError'
      :class="classes['select__error']"
    >
      Заполните поле
    </span>
    <div
      v-if='!menuDisabled'
      :class="[
        classes['select__dropdown'],
        isActiveSelect && classes[`is-active`]
      ]"
    >
      <div
        v-for="(el) in optionsList"
        :key="el.value"
        :class="[
          classes['select__dropdown-item'],
          el.disabled && classes['is-disabled'],
          inputValue?.id === el.id && classes['is-active']
        ]"
        @click="selectElement(el)"
      >
        {{ el.label }}
      </div>
    </div>
    <input
      v-if='!isSearchComponent'
      ref='inputRef'
      :name='name'
      :value='inputValue.id'
      type='hidden'
      :required='required'
    >
  </div>
</template>
<script
  setup
  lang="ts"
>
import {ref, onMounted, computed, watch} from 'vue'
import IconArrow from '@/assets/icons/IconArrowDown.vue'
import IconClose from '@/assets/icons/MgntIconClose.vue'

enum SelectBoxSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

interface ElementsListInterface {
  value: string
  disabled?: boolean
  label: string
}

interface Validation {
  isErrorField: boolean
  value: string
}

const props = defineProps<{
  options: Array<ElementsListInterface>
  size: SelectBoxSize,
  required: boolean
  disabled: boolean,
  value: Array<string>
  menuDisabled: boolean,
  label: string
  name: string,
  supportingText: string,
  validity: Validation
  placeholder?: string,
  isCross?: boolean,
  isError?: boolean
}>()

const emit = defineEmits<{
  (e: 'selected', newSelect: Array<string>): void
  (e: 'update:value', newValue: Array<string>): void
}>()

const componentRef = ref<HTMLElement>()
const isActiveSelect = ref<boolean>(false)
const isFocusInput = ref<boolean>(false)
const inputRef = ref<HTMLInputElement>()
const inputValue = ref(props.value?.length ? props.value[0] : {})
const optionsList = computed(() =>
  props.options,
)

/**
 * Сброс селекта из вне
 */
watch(
  () => props.value,
  (value) => {
    if (value.length < 1) {
      inputValue.value = {}
    }
  },
)

onMounted(() => {
  // Клик вне элемента всегда закрывает выпадающий список селектбокса
  window.addEventListener('click', (event: Event) => {
    const componentRefValue = (componentRef.value as HTMLElement)
    if (!(event.target !== componentRefValue && event.composedPath().includes(componentRefValue))) {
      isActiveSelect.value = false
      switchOffFocus()
    }
  })
})

/**
 * Снятие фокуса с инпута
 */
const switchOffFocus = () => {
  isFocusInput.value = false
}

/**
 * Очищаем все
 */
const removeAll = () => {
  setTimeout(() => {
    isActiveSelect.value = false
  })
  handleValueChange([])
}

/**
 * Показываем/скрываем выпадающий список
 **/
const toggleSelectList = () => {
  isActiveSelect.value = !isActiveSelect.value
}

const handleValueChange = (newValue: any) => {
  emit('update:value', newValue)
  emit('selected', newValue)

  inputValue.value = newValue

  setTimeout(() => {
    inputRef.value?.dispatchEvent(new Event('input'))
  })
}

/**
 * Выбор активного селекта
 * @param el
 */
const singleChoice = (el: ElementsListInterface) => {
  if (props.value[0] === el.value) {
    handleValueChange([])
  } else {
    handleValueChange(el)
  }
}

/**
 * Выбираем елемент и делаем его активным
 **/
const selectElement = (el: ElementsListInterface) => {
  singleChoice(el)
  toggleSelectList()
  switchOffFocus()
}
</script>
<style
  lang="scss"
  module="classes"
>
.select {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 14px;
  line-height: 19px;
  list-style: none;
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-width: 181px;

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }

  &.is-disabled {
    color: #C4C4C4;
    cursor: not-allowed;
    pointer-events: none;

    .supporting-text {
      color: #C4C4C4;
    }

    label.label {
      color: #C4C4C4;
    }
  }

  &__selector {
    box-sizing: border-box;
    margin: 0;
    font-size: 14px;
    line-height: 19px;
    list-style: none;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #CECECE;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    height: 44px;
    padding: 4px 0px 4px 20px;
    border-radius: 2px;
    justify-content: space-between;

    &.is-disabled {
      border-radius: 2px;
      border: 1px solid rgba(219, 219, 219, 0.6);
    }

    &-lg {
      height: 56px;
    }

    &-sm {
      height: 36px;
    }

    &:hover {
      border-color: #969696;
    }

    &.is-active {
      border-color: #1C1B1F;

      .select__arrow {
        transform: rotate(-90deg);
      }
    }

    &.is-error {
      color: #FF0606;
      border-color: #FF0606;
    }

    .label {
      font-size: 12px;
      color: #49454F;
      top: -10px;
      left: 10px;
      background: #ffffff;
      padding: 0px 5px 0px 5px;
    }
  }

  &__selection-search {
    top: 0;
    inset-inline-start: 11px;
    inset-inline-end: 11px;
    bottom: 0;
    flex: 1;

    label.label-active {
      font-size: 12px;
      color: #49454F;
      top: -10px;
      left: 10px;
      background: #ffffff;
      padding: 0px 5px 0px 5px;

      &-sm {
        top: -14px;
      }
    }

    &.is-focus {
      flex: 1;
    }
  }

  &__selection-input {
    margin: 0;
    padding: 0;
    background: 0 0;
    border: none;
    outline: none;
    appearance: none;
    height: 30px;
    width: 100%;
    opacity: 1;

    &:focus {
      opacity: 1;
    }

    &-lg {
      margin-top: 8px;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    inset-inline-end: 16px;
    height: 12px;
    margin-top: -6px;
    font-size: 12px;
    pointer-events: none;
    transform: rotate(90deg);
    transition: transform 0.25s ease-in-out;
  }

  &__search {
    display: flex;
    align-items: center;
    line-height: 1;
    position: absolute;
    top: 50%;
    inset-inline-end: 11px;
    height: 12px;
    margin-top: -6px;
    font-size: 12px;
    pointer-events: none;
  }

  &__dropdown {
    min-width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 4px;
    color: #000;
    font-size: 14px;
    line-height: 1.5;
    position: absolute;
    overflow: hidden;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    transition: all 0.25s ease-in-out;
    max-height: 300px;
    box-shadow: $shadows;

    &.is-active {
      opacity: 1;
      z-index: 2;
      visibility: visible;
      overflow-y: auto;
      box-shadow: $shadows;
      border-radius: 2px;
    }
  }

  &__dropdown-item {
    position: relative;
    min-height: 32px;
    padding: 5px 12px;
    color: #000;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer;
    transition: background .3s ease;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.is-active {
      color: #000;
      font-weight: 600;
      background-color: #FAFAFA;

      &:hover {
        background-color: #F4F4F5;
      }
    }

    &.is-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    svg {
      fill: #4096ff;
    }

    &:hover {
      background: rgba(0, 0, 0, .04);
    }

  }

  &__selection {
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-inline-end: 18px;
    padding: 0;
    line-height: 30px;
    transition: all .3s;
    position: relative;
    user-select: none;
  }

  &__cross {
    margin-left: 4px;
    width: 10px;
    height: 10px;
    transition: fill 0.25s ease-in-out;
    fill: rgba(0, 0, 0, .5);

    &:hover {
      fill: rgba(0, 0, 0, 1);
    }
  }

  &-_clear-cross {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 35px;

    svg {
      fill: #000;
      width: 12px;
      height: 12px;

      &:hover {
        fill: #ff4d4f;
      }
    }
  }

  &__manage {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__error {
    color: #ff4d4f;
    font-size: 12px;
    margin-right: 12px;
    position: absolute;
    left: 0;
    bottom: -20px;
  }
}

.supporting-text {
  color: #49454F;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
  margin-left: 16px;
  position: absolute;
  cursor: not-allowed;
  pointer-events: none;

  &.is-disabled {
    color: #C4C4C4;
    cursor: not-allowed;
    pointer-events: none;
  }
}

label.label {
  font-size: 14px;
  color: #CECECE;
  position: absolute;
  top: 11px;
  left: 16px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  pointer-events: none;

  &-error {
    color: #FF0606;
  }

  &-sm {
    top: 8px;
  }

  &-lg {
    top: 18px;
  }
}

input:focus {
  outline: none;
}

.is-value + label.label + .label-active {
  font-size: 12px;
  color: #49454F;
  top: -10px;
  left: 10px;
  background: #ffffff;
  padding: 0px 5px 0px 5px;
}

input:focus + label.label, input:valid + label.label + input:required {
  font-size: 12px;
  color: #49454F;
  top: -10px;
  left: 10px;
  background: #ffffff;
  padding: 0px 5px 0px 5px;
}

input:focus + label.label-sm, input:valid + label.label + input:required {
  top: -14px;
}
</style>