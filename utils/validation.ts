import { ref } from 'vue';

export const emailRules = ref([
  value => !!value || 'Заполните поле.',
  value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Невалидный e-mail.'
  },
])

export const passwordRules = ref([
  value => !!value || 'Заполните поле.',
  value => (value || '').length > 8 || 'Минимум 8 символов',
])

export const requiredRules = ref([(v) => !!v || 'Поле обязательно'])

export const numberRules = ref([
  (v) => !!v || 'Поле обязательно',
  value => {
    const valid = /^[0-9.]+$/.test(value);
    return valid || 'Применять только цифры';
  }]
)