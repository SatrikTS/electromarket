<template>
  <div>
    <h3>Товар: {{ newProductData.title }}</h3>
    <b>ID товара: {{ newProductData.id }}</b>
    <v-form
      ref="form"
      @submit.prevent
      @submit="saveProductData"
    >
      <div class="row">
        <div class="column">
          <v-text-field
            v-model="newProductData.article"
            class="input"
            label="Артикл"
            name="article"
            :rules="requiredRules"
          />
          <v-text-field
            v-model="newProductData.title"
            class="input"
            label="Наименование товара"
            name="title"
            :rules="requiredRules"
          />
          <div class="form-group">
            <v-text-field
              v-model="newProductData.price"
              class="input"
              label="Цена"
              name="price"
              :rules="numberRules"
              required
            />
            <v-text-field
              v-model="newProductData.balance"
              class="input"
              label="Остаток товара"
              name="balance"
              :rules="numberRules"
              required
            />
          </div>
          <div
            v-if="categoryList"
            class="form-group"
          >
            <div
              class="form-group__column"
            >
              <label class="label">Категория:</label>
              <v-select
                v-model="categoryValue"
                :items="categoryList"
                :rules="requiredRules"
                return-object
              />
            </div>
            <div
              class="form-group__column"
            >
              <label class="label">Бренд:</label>
              <v-select
                v-model="brandValue"
                :items="brandList"
                :rules="requiredRules"
                return-object
              />
            </div>
          </div>
          <v-textarea
            v-model="newProductData.description"
            label="Описание"
            name="description"
          />
          <v-textarea
            v-model="newProductData.info"
            label="Дополнительная информация"
            name="info"
          />
        </div>
        <div class="column">
          <TodoList
            label="Характеритсики"
            v-model:dataList="productChar"
            name="characteristics"
          />
          <span class="label">Изображения</span>
          <Uploader
            name="image"
            @uploadImage="uploadImage"
          />
        </div>
      </div>
      <v-btn
        class="btn submit-btn"
        type="submit"
      >
        Сохранить
      </v-btn>
    </v-form>
    <Alert
      class="alert"
      title="Добавлено"
      bodyText="Товар успешно добавлен в магазин"
      :alertShow="true"
      v-if="alertShow"
    />
  </div>
</template>
<script setup>
import './styles.scss'
import { computed, onMounted, ref } from 'vue'
import { useCatalogStore } from '~/store/products-list'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '../../../store/category'
import { useBrandsStore } from '../../../store/brands'
import { useImagesStore } from '../../../store/images-store'
import { requiredRules, numberRules } from '../../../utils/validation'

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
const brandsStore = useBrandsStore()
const { getBrandsList } = brandsStore
const { postProductItem } = catalogStore
const { productItemGetter, categoryGetter } = storeToRefs(catalogStore)
const { categoryListGetter } = storeToRefs(categoryStore)
const { brandsListListGetter } = storeToRefs(brandsStore)
const { postImages } = imagesStore

const categoryValue = ref(null)
const brandValue = ref(null)
const productChar = ref([])
const productImage = ref()
const alertShow = ref(false)
const form = ref()
const categoryList = ref()
const brandList = ref()

const newProductData = ref({
  name: '',
  price: '',
})

onMounted(async () => {
  const categoryResponse = await getCategoryList(1000)
  categoryList.value = categoryResponse.data.map((item) => {
    return { title: item.title, id: item.id }
  })

  const brandResponse = await getBrandsList()
  brandList.value = brandResponse.data
})

const charList = ref(productItemGetter.value.char ? productItemGetter.value.char : '')

function savedList(list) {
  charList.value = list
  newProductData.value.char = charList.value
}

/**
 * Сохранение нового товара
 * @param event
 * @returns {Promise<void>}
 */
async function saveProductData(event) {
  event.preventDefault()

  if (form.value.isValid) {
    const formData = new FormData(event.target)
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    formData.append('brand_id', brandValue.value.id)
    formData.append('category_id', categoryValue.value.id)
    formData.append('characteristics', JSON.stringify(productChar.value))
    postProductItem(formData)
    .then((response) => {
      if (response.product.id && productImage.value) {
        const formData = new FormData()

        formData.append('product_id', response.product.id)

        for (let i = 0; i < productImage.value.length; i++) {
          formData.append('images[]', productImage.value[i])
        }

        postImages(formData).then(() => {
          alertShow.value = true
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        alertShow.value = true
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    })
  }
}

function uploadImage(value) {
  productImage.value = value
}

function getSelectData(param) {

}
</script>
<style
  scoped
  lang="scss"
>
</style>