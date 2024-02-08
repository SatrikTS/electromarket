<template>
  <div
    v-if="isAlert"
    :class="[
            classes['alert'],
            classes[type],
            classes[size],
        ]"
  >
    <div :class="classes['alert-wrapper']">
            <span
              v-if="statusIcon"
              :class="[
                    props.size === AlertSize.medium && classes['alert-medium'],
                    props.size === AlertSize.large && classes['alert-large']
                ]"
            >
                <statusIcon />
            </span>
      <div :class="classes['alert-text']">
                <span
                  v-if="props.title && props.size === AlertSize.large"
                  :class="classes['alert-title']"
                >
                    {{ title }}
                </span>
        <span> {{ bodyText }}</span>
        <div
          v-if="isButton"
          :class="classes['alert-btn-group']"
        >
          <slot name="button" />
        </div>
      </div>
    </div>
    <div
      v-if="isClose"
      @click="handleClose"
      :class="classes['alert-close']"
    >
      <MgntIconClose />
    </div>
  </div>
</template>
<script
  lang='ts'
  setup
>
// TODO: Сменить Button на новый.
import MgntIconSuccess from '@/assets/icons/MgntIconSuccess.vue'
import MgntIconInfo from '@/assets/icons/MgntIconInfo.vue'
import MgntIconWarning from '@/assets/icons/MgntIconWarning.vue'
import MgntIconNeutral from '@/assets/icons/MgntIconNeutral.vue'
import MgntIconClose from '@/assets/icons/MgntIconClose.vue'
import MgntIconError from '@/assets/icons/MgntIconError.vue'
import {computed, onMounted, ref} from 'vue'
import {AlertType, AlertSize} from './AlertTypes'

interface Props {
  /**
   * Тип уведомления
   */
  type?: AlertType,
  /**
   * Заголовок
   */
  title?: string,
  /**
   * Основной текст
   */
  bodyText?: string,
  /**
   *  Размер алерта
   */
  size?: AlertSize,
  /**
   * Время автозакрытия
   */
  timeClosing: number
  /**
   * Нужны кнопки?
   */
  isButton?: boolean
  /**
   * Нужен значок закрытия?
   */
  isClose?: boolean
  /**
   * Показывает алерт?
   */
  alertShow: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alertShow: false,
  isClose: false,
  size: AlertSize.medium,
  type: AlertType.info,
})

const isAlert = ref<boolean>(props.alertShow)

const timeClosing = ref<number>(props.timeClosing)

const statusIcon = computed(() => {
  switch (props.type) {
    case AlertType.success:
      return MgntIconSuccess
    case AlertType.info:
      return MgntIconInfo
    case AlertType.warning:
      return MgntIconWarning
    case AlertType.error:
      return MgntIconError
    case AlertType.neutral:
      return MgntIconNeutral
    default:
      return ''
  }
})

const handleClose = () => {
  isAlert.value = false
}

onMounted(() => {
  if (timeClosing.value > 0) {
    setTimeout(() => {
      handleClose()
    }, timeClosing.value)
  }
})
</script>
<style
  lang="scss"
  module="classes"
>
.alert {
  padding: 16px;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #222529;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &-text {
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  &-medium {
    display: flex;
    margin-right: 12px;
  }

  &-large {
    display: flex;
    margin-right: 16px;
  }

  &-close {
    cursor: pointer;
  }

  &-wrapper {
    display: flex;
  }

  &-btn-group {
    display: flex;
    margin: 20px 0 0;
  }
}

.large {
  padding: 24px;
  display: flex;
  align-items: flex-start;
}

.info {
  background: #F0F6FF;
  border: 1px solid #0066FF;
}

.warning {
  background: #FFF8F1;
  border: 1px solid #FF621F;
}

.error {
  background: #FDF2F2;
  border: 1px solid #E02424;
}

.success {
  background: #F3FAF7;
  border: 1px solid #0E9F6E;
}

.neutral {
  background: #FAFAFA;
  border: 1px solid #CFD4D9;
}
</style>