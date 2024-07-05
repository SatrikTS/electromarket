<template>
  <h2>Список заказов</h2>
  <div class="admin-orders">
    <div class="admin-orders__filter">
      <div class="row">
        <div class="column-4 product-filters__row">
          <v-text-field
            v-model="filter.user_email"
            label="Поиск по email"
            required
            clearable
          ></v-text-field>
        </div>
        <div class="column-4 product-filters__row">
          <v-text-field
            v-model="filter.user_phone"
            label="Поиск по телефону"
            minlength="3"
            clearable
          ></v-text-field>
        </div>
        <div class="column-4 product-filters__row">
          <v-text-field
            v-model="filter.user_name"
            label="Поиск по имени"
            clearable
          ></v-text-field>
        </div>
        <div class="column-4 product-filters__row">
          <v-select
            v-model="filter.status_order_id"
            :items="statusesList.data"
            item-text="title"
            item-value="id"
            label="Поиск по статусу"
            clearable
          ></v-select>
        </div>
      </div>
    </div>
    <div class="admin-list">
      <div class="admin-list__header">
        <div class="admin-list__item">ID заказа
          <v-btn size="small"
                 :active="hasSortDateActive ? true : false"
                 variant="text" @click="sortByDate">
            <v-icon
              icon="mdi-arrow-up"
            />
            <v-icon
              icon="mdi-arrow-down"
            />
          </v-btn>
        </div>
        <div class="admin-list__item admin-list__item--name">Имя клиента</div>
        <div class="admin-list__item admin-list__item--email">E-mail клиента</div>
        <div class="admin-list__item admin-list__item--phone">Телефон клиента</div>
        <div class="admin-list__item admin-list__item--address">Адрес</div>
        <div class="admin-list__item">Статус</div>
        <div class="admin-list__item">Дата заказа
          <v-btn size="small"
                 :active="hasSortDateActive ? true : false"
                 variant="text" @click="sortByDate">
            <v-icon
              icon="mdi-arrow-up"
            />
            <v-icon
              icon="mdi-arrow-down"
            />
          </v-btn>
        </div>
        <div class="admin-list__item admin-list__item--pay">Оплата</div>
        <div class="admin-list__item">Общая стоимость</div>
        <div class="admin-list__item "></div>
      </div>
      <div
        v-for="(item) in ordersList.data"
        :key="item.id"
        class="admin-list__content"
      >
        <div class="admin-list__item admin-list__item--id">
          <NuxtLink @click="navigateTo({ path: `/admin/orders/${item.id}` })">{{ item.id }}</NuxtLink>
        </div>
        <div class="admin-list__item admin-list__item--name">{{ item.user_name }}</div>
        <div class="admin-list__item admin-list__item--email">{{ item.user_email }}</div>
        <div class="admin-list__item admin-list__item--phone">{{ item.user_phone }}</div>
        <div class="admin-list__item admin-list__item--address">{{ item.delivery_address }}</div>
        <div class="admin-list__item">{{ item.status.title }}</div>
        <div class="admin-list__item">{{ formatDate(item.created_at) }}</div>
        <div class="admin-list__item admin-list__item--pay">{{ item.pay.title }}</div>
        <div class="admin-list__item">{{ item.total_cost }} ₽</div>
        <div class="admin-list__item admin-list__item--buttons">
          <Button
            size="small"
            buttonStyle="warning"
            type="button"
            @click="editProduct(item.id)"
          >
            <IconEdit />
          </Button>
        </div>
      </div>
    </div>
    <Pagination
      :totalCount="ordersList.meta.total"
      @goToPage="goToPage"
      @switchPageList="switchPageList"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrdersStore } from '~/store/orders-store';
import debounce from '../../../utils/debounce';
import IconEdit from '@/assets/icons/IconEdit.vue';
import {useStatusOrderStore} from '~/store/status-order-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { ordersList } = storeToRefs(useOrdersStore());
const { getAdminOrders } = useOrdersStore();
const limit = ref(20);
const page = ref(1);
const sortDate = ref('asc')
const hasSortDateActive = ref(false)
const filter = reactive({
  user_email: '',
  user_phone: '',
  user_name: '',
});
const { statusesList } = storeToRefs(useStatusOrderStore());
const { getStatusesList } = useStatusOrderStore();

await getAdminOrders({ limit: limit.value, page: page.value });
await getStatusesList()
/**
 * Пагинация. Выбор количества записей на странице
 * @param pageNum
 */
const switchPageList = (limitNum): void => {
  getAdminOrders({ ...filter, limit: limitNum, page: page.value });
};

/**
 * перейти к странице
 * @param pageNum
 */
const goToPage = (pageNum): void => {
  getAdminOrders({ ...filter, limit: limit.value, page: pageNum });
};

const sortByDate = () => {
  filter.sort_created_at = sortDate.value === 'asc' ? 'desc' : 'asc'
  sortDate.value = filter.sort_created_at
  hasSortDateActive.value = true
}

/**
 * Переходим на страницу заказа
 * @param id
 */
function editProduct(id) {
  navigateTo({ path: `/admin/orders/${id}` });
}

watch(filter, () => {
  console.log(filter);
  debounce(() => {
    getAdminOrders({ ...filter, limit: limit.value, page: page.value });
  }, 1000);
});
</script>
<style
  scoped
  lang="scss"
>
.admin-orders {
  &__filter {
    border: 1px solid #f3f3f3;
    padding: 8px 8px 0;
    margin: 0 0 16px;
    border-radius: 3px;
  }
}

.admin-list {
  min-height: 600px;
  margin: 0 0 $offset-base;

  &__header {
    display: grid;
    grid-template-columns: 110px 150px 250px 128px 160px 120px 150px 170px 80px 50px;
    font-size: 13px;
    line-height: 1.5;

    & > div {
      background: #f3f3f3;
    }
  }

  &__content {
    font-size: 13px;
    line-height: 1.5;
    display: grid;
    grid-template-columns: 110px 150px 250px 128px 160px 120px 150px 170px 80px 50px;

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
    gap: 4px;

    &--id {
      flex: none;
      cursor: pointer;
      color: #0066FF;
    }

  }

  &__img {
    max-width: 50px;
    height: 100px;
    overflow: hidden;

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>