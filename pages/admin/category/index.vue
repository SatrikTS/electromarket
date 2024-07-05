<template>
  <h2>Список категорий</h2>
  <div class="row">
    <div class="column-4">
    <Button
      buttonStyle="success"
      @click="navigateTo({ path: `/admin/category/add` })"
    >Добавить категорию
    </Button>
    </div>
  </div>
  <ul class="special-list">
    <li>Поиск по названию -
      <small>минимум 2 символа из общего названия</small>
    </li>
  </ul>
  <div class="column-3 product-filters__row">
    <v-text-field
      v-model="titleSearch"
      label="Поиск по названию"
      minlength="3"
      required
      @input="handleSearchByTitle"
    />
  </div>
  <div class="category-list">
    <div class='category-list__header'>
      <div class='category-list__item'>
        ID
      </div>
      <div class='category-list__item'>Название категории</div>
      <div class='category-list__item'>Родительская категория</div>
      <div class='category-list__item category-list__item--btns'></div>
    </div>
    <div
      v-for='(item) in categoryList'
      :key='item.title'

    >
      <div v-if="item.id" class='category-list__content'>
        <div class='category-list__item category-list__item--id'>
          <NuxtLink :to="'/admin/category/' + item.id">
            {{ item.id }}
          </NuxtLink>
        </div>
        <div class='category-list__item'>{{ item.title }}</div>
        <div class='category-list__item'>{{ item.parent ? item.parent : 'Нет родительской' }}</div>
        <div class='category-list__item category-list__item--btns'>
          <Button
            size='small'
            buttonStyle='warning'
            type='button'
            @click='editCategory(item.id)'
          >
            <IconEdit />
          </Button>
          <Button
            size='small'
            buttonStyle='danger'
            type='button'
            @click='confirmRemoveModal(item.id)'
          >
            <IconRemove />
          </Button>
        </div>
      </div>

    </div>
  </div>
  <Modal
    v-model='isShowModal'
    title='Удаление категории'
  >
    Вы уверены, что хотите удалить категорию? Действие отменить будет невозможно
    <template #footer>
      <Button
        @click="isShowModal = false"
        size="small"
      >Отмена
      </Button>
      <Button
        @click="deleteCategory"
        size="small"
        buttonStyle="danger"
      >Удалить
      </Button>
    </template>
  </Modal>
  <v-alert
    v-if="alertErrorText"
    type="error"
    class="alert"
  >
    {{ alertErrorText }}
  </v-alert>
  <v-alert
    v-if="alertWarningText"
    type="warning"
    class="alert"
  >
    {{ alertWarningText }}
  </v-alert>
</template>
<script
  setup
  lang='ts'
>
definePageMeta({
  layout: "admin",
  middleware: 'auth'
});
import {ref} from 'vue'
import IconEdit from '@/assets/icons/IconEdit.vue'
import IconRemove from '@/assets/icons/IconDelete.vue'
import {useCategoryStore} from '../../../store/category'
import debounce from '~/utils/debounce'

const categoryStore = useCategoryStore()
const {getCategoryList, removeCategory} = categoryStore

const isShowModal = ref(false)
const removeCategoryId = ref()
const alertErrorText = ref()
const alertWarningText = ref()
const categoryList = ref()
const titleSearch = ref()

const responseCategory = await getCategoryList(1000)
categoryList.value = responseCategory.data


/**
 * Переходим на страницу редактирования категории
 * @param id
 */
function editCategory(id: number) {
  navigateTo({ path: `/admin/category/${ id }` })
}

/**
 * Подтверждение открытия модалки
 * @param id
 */
function confirmRemoveModal(id: number) {
  isShowModal.value = true
  removeCategoryId.value = id
}

/**
 * поиск товара по части названия
 */
function handleSearchByTitle() {
  if (titleSearch.value.length > 1 || titleSearch.value.length === 0) {
    debounce(async () => {
      const searchList = await getCategoryList(null, undefined, titleSearch.value)

      categoryList.value = searchList.data
    }, 1000)
  }
}

/**
 * Удаление категории
 */
async function deleteCategory() {
  const response = await removeCategory(removeCategoryId.value)

  if(!response.status) {
    alertErrorText.value = response.message
  }

  if(response.status) {
    alertWarningText.value = response.message
  }

  setTimeout(() => {
    alertErrorText.value = null
    alertWarningText.value = null
  }, 3000)
  isShowModal.value = false
  const responseCategory = await getCategoryList(1000)
  categoryList.value = responseCategory.data
}

</script>
<style
  scoped
  lang='scss'
>
.alert {
  position: fixed;
  top: 100px;
  left: calc(50% + 307px);
  transform: translate(-90%, 0);
}

.category-list {
  min-height: 600px;
  margin: 0 0 $offset-base;

  &__header {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    & > div {
      background: #f3f3f3;
    }
  }

  &__content {
    display: flex;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;

    &:hover {
      background: rgba($bg-base, 0.5);
    }
  }

  &__item {
    border: 1px solid $bg-base;
    border-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
    flex: 1;

    &--id {
      font-weight: 700;
      color: #0066FF;
      font-size: 16px;
    }

    &--btns {
      width: 150px;
      flex: none;

      button {
        margin: 0 4px;
      }
    }
  }
}
</style>