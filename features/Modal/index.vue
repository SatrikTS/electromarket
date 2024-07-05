<template>
  <transition name="fade-bounce">
    <div
      v-if="modelValue"
      class="modal-overlay"
    >
      <div class="modal">
        <div class="modal__header">
          <span class="modal__title">{{ title }}</span>
          <Button
            size="small"
            buttonStyle="ghost"
            @click="emit('update:modelValue', false)"
          >
            <IconCross />
          </Button>
        </div>
        <div class="modal__content">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="modal__footer"
        >
          <slot name='footer' />
        </div>
      </div>
    </div>
  </transition>
</template>
<script
  setup
  lang='ts'
>
import IconCross from '../../assets/icons/MgntIconClose.vue'

interface Props {
  modelValue: boolean,
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>
<style lang='scss' scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__content {
    font-size: 14px;
    line-height: 1.5;
    padding: $offset-base 0;
    max-width: max-content;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: $offset-small;
    }
  }
}

</style>
