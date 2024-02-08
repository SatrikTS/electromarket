<template>
  <h2>Список товаров</h2>
  <div class="product-list">
    <div>
      <ul class="special-list">
        <li>Поиск по артиклю -
          <small>необходимо полное соответствие</small>
        </li>
        <li>Поиск по названию -
          <small>минимум 4 символа из общего названия</small>
        </li>
      </ul>
    </div>
    <div class="product-filters">
      <div class="row">
        <div class="column-4 product-filters__row">
          <v-text-field
            v-model="articleSearch"
            label="Поиск по артиклю"
            required
            outlined
            @input="handleSearchByArticle"
          ></v-text-field>
        </div>
        <div class="column-4 product-filters__row">
          <v-text-field
            v-model="titleSearch"
            label="Поиск по названию"
            minlength="3"
            required
            @input="handleSearchByTitle"
          ></v-text-field>
        </div>
        <div class="column-4 product-filters__row">
          <v-select
            v-model="categoryValue"
            :items="categoryList"
            item-text="title"
            item-value="id"
            label="Категории"
            clearable
          ></v-select>
        </div>
        <div class="column-4 product-filters__row">
          <v-select
            v-model="brandValue"
            :items="brandList"
            item-text="title"
            item-value="id"
            label="Бренды"
            size="small"
            clearable
          ></v-select>
        </div>
      </div>
      <div class="row">
        <div class="column-4 product-filters__row">
          <Button size="large" @click="clearFilters" >Сбросить все фильтры</Button>
        </div>
        <div class="column-4 product-filters__row">
          <Button
            size="large"
            buttonStyle="success"
            @click="navigateTo({ path: `/admin/products/add` })"
          >Добавить товар
          </Button>
        </div>
      </div>
    </div>
    <div class="product-content">
      <div class="product-item product-item--top">
        <div class="product-item-id">ID товара</div>
        <div class="product-item-article">Артикул</div>
        <div class="product-item-name">Название товара</div>
        <div class="product-item-category">Категория</div>
        <div class="product-item-brand">Бренд</div>
        <div class="product-item-price">Цена</div>
        <div class="product-item-price">Остаток</div>
        <div class="product-item-price">
        </div>
      </div>
      <div
        v-for="(item) in productListGetter"
        :key="item.title"
        class="product-item"
      >
        <div class="product-item-id">{{ item.id }}</div>
        <div class="product-item-article">{{ item.article }}</div>
        <div class="product-item-name">{{ item.title }}</div>
        <div class="product-item-category">{{ item.category?.title }}</div>
        <div class="product-item-brand">{{ item.brand?.title }}</div>
        <div class="product-item-price">{{ item.price }} ₽.</div>
        <div class="product-item-price">{{ parseInt(item.balance) }} шт.</div>
        <div class="product-item-price product-item-price--buttons">
          <Button
            size="small"
            buttonStyle="warning"
            type="button"
            @click="editProduct(item.id)"
          >
            <IconEdit />
          </Button>
          <Button
            size="small"
            buttonStyle="danger"
            type="button"
            @click="confirmRemoveModal(item.id)"
          >
            <IconRemove />
          </Button>
        </div>
      </div>
    </div>
    <Pagination
      :totalCount="productsTotalGetter"
      @goToPage="goToPage"
      @switchPageList="switchPageList"
    />
  </div>
  <Alert
    class="alert"
    type="warning"
    title="Удален"
    bodyText="Товар удален из магазина"
    :alertShow="true"
    v-if="alertShow"
  />
  <Modal
    v-model="isShowModal"
    title="Удаление товара"
  >
    Вы уверены, что хотите удалить товар? Действие отменить будет невозможно
    <template #footer>
      <Button
        @click="isShowModal = false"
        size="small"
      >Отмена
      </Button>
      <Button
        @click="removeProduct"
        size="small"
        buttonStyle="danger"
      >Удалить
      </Button>
    </template>
  </Modal>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
import IconEdit from '@/assets/icons/IconEdit.vue'
import IconRemove from '@/assets/icons/IconDelete.vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '~/store/products-list'
import { useCategoryStore } from '../../../store/category'
import { useBrandsStore } from '../../../store/brands'
import Button from '../../../features/Button/Button'
import debounce from '~/utils/debounce'
// stores
const categoryStore = useCategoryStore()
const catalogStore = useCatalogStore()
const brandsStore = useBrandsStore()

// getters
const { categoryListGetter } = storeToRefs(categoryStore)
const { productListGetter, productsTotalGetter } = storeToRefs(catalogStore)
const { productQueryGetter } = storeToRefs(catalogStore)
const { brandsListListGetter } = storeToRefs(brandsStore)

// actions
const { getCategoryList } = categoryStore
const { getProductList, removeProductItem } = catalogStore
const { getBrandsList } = brandsStore

// const
const categoryValue = ref()
const brandValue = ref()
const alertShow = ref(false)
const isShowModal = ref(false)
const removeProductId = ref()
const articleSearch = ref()
const titleSearch = ref()
const categoryList = ref()
const brandList = ref()

getProductList()

onMounted(async () => {
  const categoryResponse = await getCategoryList(1000)
  categoryList.value = categoryResponse.data

  const brandResponse = await getBrandsList()
  brandList.value = brandResponse.data
})

/**
 * Поиск товара по артиклю
 */
function handleSearchByArticle() {
  debounce(() => {
    productQueryGetter.value.article = articleSearch.value
    getProductList(productQueryGetter.value)
  }, 1000)
}

/**
 * поиск товара по части названия
 */
function handleSearchByTitle() {
  if (titleSearch.value.length > 3 || titleSearch.value.length === 0) {
    debounce(() => {
      productQueryGetter.value.partial_title = titleSearch.value
      getProductList(productQueryGetter.value)
    }, 1000)
  }
}

/**
 * Пагинация. клик по номеру страницы
 * @param pageNum
 */
function goToPage(pageNum) {
  productQueryGetter.value.page = pageNum
  getProductList(productQueryGetter.value)
}

/**
 * Пагинация. Выбор количества записей на странице
 * @param pageNum
 */
function switchPageList(param) {
  productQueryGetter.value.page = 1
  productQueryGetter.value.limit = param
  getProductList(productQueryGetter.value)
}

/**
 * Переходим на страницу редактирования товара
 * @param id
 */
function editProduct(id) {
  navigateTo({ path: `/admin/products/${ id }`})
}

/**
 * Удаляем товар из базы
 * @param id
 */
function removeProduct() {
  removeProductItem(removeProductId.value).then((response) => {
    alertShow.value = true

    removeProductId.value = false
    isShowModal.value = false

    setTimeout(() => {
      getProductList(productQueryGetter.value)
      alertShow.value = false
    }, 2000)
  })
}

/**
 * Модалка на подтверждение удаления
 * @param id
 */
function confirmRemoveModal(id) {
  isShowModal.value = true
  removeProductId.value = id
}

/**
 * Выбор в селекте для фильтрации товаров в админке по категориям
 */
function selectCategory() {
  const category = categoryList.value.find(item => item.id === categoryValue.value)
  productQueryGetter.value.categories = category?.title
  getProductList(productQueryGetter.value)
}

/**
 * Выбор в селекте для фильтрации товаров в админке по брендам
 */
function selectBrand() {
  const brand = brandList.value.find(item => item.id === brandValue.value)
  productQueryGetter.value.brands = brand?.title
  getProductList(productQueryGetter.value)
}

/**
 * Сброс всех фильтров
 * @param param
 */
function clearFilters() {
  productQueryGetter.value.categories = ''
  productQueryGetter.value.brands = ''
  productQueryGetter.value.article = ''
  productQueryGetter.value.partial_title = ''

  titleSearch.value = ''
  articleSearch.value = ''

  categoryValue.value = ''
  brandValue.value = ''

  getProductList(productQueryGetter.value)
}

watch(categoryValue, () => {
  selectCategory()
})

watch(brandValue, () => {
  selectBrand()
})
</script>
<style
  scoped
  lang="scss"
>
.heading {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 $offset-base;
}

.product-list {
  display: flex;
  flex-direction: column;
}

.product-item {
  display: flex;
  width: 100%;
  font-size: 13px;
  line-height: 1.5;

  &:hover {
    background: rgba($bg-base, 0.5);
  }

  &--top {
    div {
      background: $bg-base;
    }
  }
}

.product-item div {
  border: 1px solid $bg-base;
  border-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px;
}

.product-item-id {
  width: 70px;
}

.product-item-article {
  width: 140px;
}

.product-item-category {
  width: 200px;
}

.product-item-brand {
  width: 120px;
}

.product-item-price {
  width: 120px;

  &--buttons {

    button {
      margin: 0 10px;
    }
  }
}

.product-item-name {
  flex: 1
}

.product-filters {
  border: 1px solid $bg-base;
  padding: $offset-small;
  margin: 0 0 $offset-base;
  border-radius: 3px;

  &__row {
    button {
      width: 100%;
    }
  }
}

.product-content {
  min-height: 600px;
  margin: 0 0 $offset-base;
}

.alert {
  position: fixed;
  top: 40px;
  left: 50%;
  z-index: 1;
}
</style>