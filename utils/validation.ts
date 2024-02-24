import { ref, computed } from 'vue';

export const emailRules = ref([
  value => !!value || 'Заполните поле.',
  value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Невалидный e-mail.';
  },
]);

export const passwordRules = ref([
  value => !!value || 'Заполните поле.',
  value => (value || '').length > 8 || 'Минимум 8 символов',
]);

export const matchingPasswords = ((param) => {
  return [
    value => !!value || 'Заполните поле.',
    (value) =>
      value === param || 'Пароли не совпадают',
  ];
});

export const requiredRules = ref([(v) => !!v || 'Поле обязательно']);

export const numberRules = ref([
    (v) => !!v || 'Поле обязательно',
    value => {
      const valid = /^[0-9.]+$/.test(value);
      return valid || 'Применять только цифры';
    },
  ],
);

export const phoneRules = ref([
    (v) => !!v || 'Поле обязательно',
    value => {
      const valid = /^((\+7|7|8)+([0-9]){10})$/.test(value);
      return valid || 'Введите правильный формат телефона 7(***)******* (11 цифр)';
    },
  ],
);