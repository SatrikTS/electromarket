<template>
  <button
    :type='type'
    :class='[buttonStyle, size]'
    class='button'
    :disabled='disabled'
  >
    <slot/>
  </button>
</template>
<script
  setup
  lang='ts'
>
enum ButtonType {
  submit = 'submit',
  button = 'button',
}

enum ButtonStyle {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  inverse = 'inverse',
  ghost = 'ghost',
}

enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

interface ButtonProps {
  type: ButtonType,
  text: string,
  style: ButtonStyle,
  size: ButtonSize,
  disabled: boolean;
}

defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value: ButtonProps['type']) => ['button', 'submit'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: ButtonProps['size']) => ['small', 'medium', 'large'].includes(value),
  },
  buttonStyle: {
    type: String,
    default: 'default',
    // validator: (value: ButtonProps['style']) => ['success', 'warning', 'danger', 'default', 'inverse'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  text: String,
})
</script>
<style
  scoped
  lang='scss'
>
.button {
  background: $bg-base;
  border: 1px solid $bg-base;
  padding: $offset-base;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  width: max-content;
  transition: all 0.25s ease-in-out;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.inverse {
    background: #fff;
    border-color: #d9d9d9;
  }

  &.ghost {
    background: transparent;
    border: none;

    &:hover {
      border: none;
      background: $bg-base;
    }
  }

  &:hover {
    background: #fff;
  }

  &:active {
    background: #d9d9d9;
  }

  &:hover {
    border: 1px solid $secondary;
    color: $secondary;
  }

  &.active {
    border: 1px solid $active;
    color: $secondary;
  }

  &.success {
    background: $success;
    color: $bg-main;
    border: 1px solid $success;

    &.inverse {
      border: 1px solid $success;
      color: $success;
      background: $bg-main;

      &:hover {
        border: 1px solid $secondary;
        color: $secondary;
      }
    }

    &:hover {
      color: $success;
      background: $bg-main;
    }
  }

  &.danger {
    border: 1px solid $danger;
    background: $danger;
    color: $bg-main;

    &.inverse {
      border: 1px solid $danger;
      color: $danger;
      background: $bg-main;

      &:hover {
        border: 1px solid $secondary;
        color: $secondary;
      }
    }

    &:hover {
      color: $danger;
      background: $bg-main;
    }
  }

  &.warning {
    border: 1px solid $warning;
    background: $warning;
    color: $bg-main;

    &.inverse {
      border: 1px solid $warning;
      color: $warning;
      background: $bg-main;

      &:hover {
        border: 1px solid $secondary;
        color: $secondary;
      }
    }

    &.active {
      border: 1px solid $active;
      color: $secondary;
    }

    &:hover {
      color: $warning;
      background: $bg-main;
    }
  }

  &.small {
    padding: 8px;
    font-size: 10px;
    font-weight: 400;
    min-width: 31px;
    //border: 1px solid !important;
  }

  &.large {
    font-size: 14px;
    font-weight: 400;
    min-width: 31px;
    padding: $offset-base;
  }

  &.medium {
    height: 40px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}
</style>