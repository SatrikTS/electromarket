<template>
  <div>
    <h2>Панель!</h2>
    <p>
      Панель магазина инструментов
    </p>
    <div class="button-group">
      <v-btn
        color="success"
        @click="navigateTo({ path: `/admin/products/add` })"
      >Добавить товар
      </v-btn>
      <v-btn
        color="success"
        @click="navigateTo({ path: `/admin/category/add` })"
      >Добавить категорию
      </v-btn>
      <v-btn
        color="success"
        @click="navigateTo({ path: `/admin/brands/add` })"
      >Добавить бренд
      </v-btn>
    </div>
    <div class="refresh-group">
      <h2 class="mb-5">Массовое обновление данных</h2>
      <div class="mb-5">Загружать только xlsx файлы</div>
      <file-uploader
        inputTitle="Обновление цен"
        btnTitle="Обновить цены"
        @handleUpdate="handlePrices"
      />
      <br>
      <br>
      <file-uploader
        inputTitle="Обновление остатков"
        btnTitle="Обновить остатки"
        @handleUpdate="handleBalances"
      />
    </div>
    <v-progress-circular
      v-if="loadingStatus"
      class="loader"
      :model-value="loadingStatus"
      :rotate="360"
      :size="100"
      :width="15"
      color="teal"
    >
      {{ loadingStatus }}
    </v-progress-circular>
  </div>
  <Alert
    class="alert"
    title="Цены"
    bodyText="Цены успешно обновлены"
    :alertShow="true"
    v-if="alertShowPrice"
  />
  <Alert
    class="alert"
    title="Баланс"
    bodyText="Остатки успешно обновлены"
    :alertShow="true"
    v-if="alertShowBalance"
  />
  <v-alert
    v-if="alertError"
    type="warning"
    class="alert-message"
    title="Ошибка"
  >Убедитесь что вы загружаете валидный файл</v-alert>
</template>
<script setup>
import { useProductsUpdate } from '../../store/products-update'
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const productsUpdateStore = useProductsUpdate()
const {updateBalance, updatePrices} = productsUpdateStore

const alertShowPrice = ref(false)
const alertShowBalance = ref(false)
const loader = ref(null)
const loadingStatus = ref(null)
const alertError = ref(false)
const files = ref([])
const interval = ref()

const handlePrices = async (file) => {
  const dataForm = new FormData()
  dataForm.append('file_price', file)
  showLoader()
  const response = await updatePrices(dataForm)
  clearInterval(interval.value)
  if(response.result) {
    alertShowPrice.value = true
    setTimeout(() => {
      alertShowPrice.value = false
      loadingStatus.value = null
      location.reload()
    }, 2000)
  }
}

const showLoader = () => {
  interval.value = setInterval(() => {
    if (loadingStatus.value === 100) {
      return (loadingStatus.value = 0)
    }
    loadingStatus.value += 10
  }, 1200)
}

const handleBalances = async (file) => {
  const dataForm = new FormData()
  dataForm.append('file_balance', file)

  try {
    showLoader()
    const response = await updateBalance(dataForm)
    clearInterval(interval.value)
    if(response.result) {
      alertShowBalance.value = true
      setTimeout(() => {
        alertShowBalance.value = false
        loadingStatus.value = null
        location.reload()
      }, 2000)
    }
  } catch (error) {
    alertError.value = true
    setTimeout(() => {
      alertError.value = false
    }, 2000)
  }
}

</script>
<style
  scoped
  lang="scss"
>
.button-group {
  display: flex;
  flex-direction: row;

  button {
    margin: 0 $offset-base $offset-base 0;
  }
}

.upload-group {
  display: flex;

  button {
    height: 56px;
  }
}

.v-file-input {
  max-width: 300px;
}

.loader {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  margin-left: -75px;
}
</style>