<template>
  <div>
    <NuxtLink to="/admin/products">Назад</NuxtLink>
    <h3>Товар: {{ productItem.title }}</h3>
    <b>ID товара: {{ productItem.id }}</b>
    <form @submit.prevent="saveProductData">
      <div class="row">
        <div class="column">
          <TextInput
            placeholder="Артикл"
            label="Артикл"
            v-model:value="productItem.article"
            name="article"
            required
          />
          <TextInput
            placeholder="Наименование"
            label="Наименование товара"
            v-model:value="productItem.title"
            name="title"
            required
          />
          <div class="form-group">
            <TextInput
              placeholder="Цена"
              label="Цена"
              v-model:value="productItem.price"
              name="price"
            />
            <TextInput
              placeholder="Остаток"
              label="Остаток товара"
              v-model:value="productItem.balance"
              name="balance"
            />
          </div>
          <div
            v-if="categoryList"
            class="form-group">
            <div
              class="form-group__column"
            >
              <label class="label">Категория:</label>
              <v-select
                v-model="productItem.category"
                :items="categoryList"
                item-text="title"
                item-value="id"
              ></v-select>
            </div>
            <div
              class="form-group__column"
            >
              <label class="label">Бренд:</label>
              <v-select
                v-model="productItem.brand"
                :items="brandsList.data"
                item-text="title"
                item-value="id"
              ></v-select>
            </div>
          </div>
          <TextArea
            placeholder="Описание"
            label="Описание"
            name="description"
            v-model:value="productItem.description"
          />
          <TextArea
            placeholder="Дополнительная информация"
            label="Дополнительная информация"
            name="info"
            v-model:value="productItem.info"
          />
        </div>
        <div class="column">
          <TodoList
            label="Характеритсики"
            v-model:dataList="charList"
          />
          <span class="label">Изображения</span>
          <Uploader
            :file="productItem.images"
            name="image"
            @uploadImage="uploadImage"
            @updateData="updateProduct"
            @removeImage="removeImage"
          />
        </div>
      </div>
      <Button
        buttonStyle="success"
        type="submit"
      >
        Сохранить
      </Button>
    </form>
    <Alert
      class="alert"
      title="Добавлено"
      bodyText="Товар успешно обновлен"
      :alertShow="true"
      v-if="alertShow"
    />
  </div>
</template>
<script setup>
import './styles.scss'
import { computed, onMounted, ref, watch } from 'vue'
import { useCatalogStore } from '~/store/products-list'
import { useImagesStore } from '~/store/images-store'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '../../../store/category'
import { useBrandsStore } from '../../../store/brands'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const route = useRoute()
const pageId = computed(() => route.params.id)

const categoryStore = useCategoryStore()
const { getCategoryList } = categoryStore
const catalogStore = useCatalogStore()
const imagesStore = useImagesStore()

const { getItemProduct, putProductItem } = catalogStore
const { postImages, removeItemImage } = imagesStore
const productChar = ref()
const productImage = ref()
const productItem = ref()

const categoryList = ref()

const { getBrandsList } = useBrandsStore();
const { brandsList } = storeToRefs(useBrandsStore());

// Данные по брендам
const alertShow = ref(false)

productItem.value = await getItemProduct(pageId.value, route.query.categoryId)
const charList = ref(productItem.value.characteristics ? productItem.value.characteristics : [])


onMounted(async () => {
  const categoryResponse = await getCategoryList(1000)

  categoryList.value = categoryResponse.data.map((item) => {
    return { title: item.title, id: item.id }
  })

  await getBrandsList()
})

watch(() => {
  productChar.value = productItem.value.characteristics ? productItem.value.characteristics : []
})

function uploadImage(value) {
  productImage.value = value
}

function removeImage(id) {
  removeItemImage(id)
}

function updateProduct() {
  setTimeout(() => {
    getItemProduct(pageId.value)
  }, 1000)
}

/**
 * Перезаписываем данные о продукте на сервере
 * @param event
 */
async function saveProductData(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const jsonData = {}
  for (let [key, value] of formData.entries()) {
    if (jsonData[key] === 'description' || jsonData[key] === 'info') {
      jsonData[key] = encodeURIComponent(value)
    } else {
      jsonData[key] = value
    }
  }

  jsonData.price = parseInt(jsonData.price)
  jsonData.brand_id = parseInt(productItem.value.brand.id ? productItem.value.brand.id : productItem.value.brand)
  jsonData.category_id = parseInt(productItem.value.category.id ? productItem.value.category?.id : productItem.value.category)
  jsonData.balance = parseInt(jsonData.balance)
  jsonData.characteristics = charList.value

  putProductItem(jsonData, productItem.value.id)
  .then((response) => {
    alertShow.value = true

    setTimeout(() => {
      alertShow.value = false
    }, 3000)
  })

  if (productImage.value) {
    const formData = new FormData()
    formData.append('product_id', productItem.value.id)
    for (let i = 0; i < productImage.value.length; i++) {
      console.log(productImage.value[i])
      formData.append('images[]', productImage.value[i])
    }

    await postImages(formData).then(() => {
      alertShow.value = true
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    })
    .catch((error) => {
      console.log(error)
    })
  }

}
</script>
<style
  scoped
  lang="scss"
>
</style>