<template>
  <div>
    <div class="container">
      <div class="main-top">
        <div class="main-banner">
          <NuxtLink
            to="/category"
            class="main-banner-link"
          >
            <img
              src="@/assets/img/banner.jpeg"
              alt="Севастополь электроинструмент"
            >
            <h1 class="main-title">Электроинструмент в Севастополе и Крыму</h1>
          </NuxtLink>
        </div>
        <div class="main-category">
          <Category
            :categoryList="categoryList"
            :columns="2"
            @navigate="handleNavigate"
          />
          <v-btn
            depressed
            color="primary"
            @click="navigateTo('/categories')"
          >
            Все категории
          </v-btn>
        </div>
      </div>
    </div>
    <Caption caption="Мы на Авито" />
    <div class="container">
      <NuxtLink
        to="https://www.avito.ru/user/074560d62a981302e478b6f82d84f7dd4cbebcd6c1d7ab2b1a2c1c85f43b5015/profile?src=sharing"
        target="_blank"
        class="avito-banner"
      >
        <img
          src="@/assets/img/avito-banner.jpeg"
          alt="Севастополь электроинструмент авито"
        >
      </NuxtLink>
    </div>
    <Caption caption="Популярные" />
    <div class="container">
      <div class="main-recommendation">
        <ProductsList
          :productList="productListPopular.data"
        />
      </div>
    </div>
    <Caption caption="Рекомендуем" />
    <div class="container">
      <div class="main-recommendation">
        <ProductsList
          :productList="productList.data"
        />
      </div>
    </div>
    <Caption caption="Бренды" />
    <div class="container">
      <Brands :maxView="8" />
    </div>
    <Caption caption="Контакты" />
    <div class="container">
      <Contacts />
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/store/category';
import { useProductsStore } from '~/store/products-store';
import { ref, reactive } from 'vue';

const { getProducts, getProductsPopular } = useProductsStore();
const { productList, productListPopular } = storeToRefs(useProductsStore());
const categoryStore = useCategoryStore();
const { getCategoryList } = categoryStore;
const categoryList = ref();
const popularProductsFilters = reactive({
  page: 1,
  limit: 8,
  categories: 'УШМ',
});

await getProducts({ limit: 4 });
await getProductsPopular(popularProductsFilters);
const response = await getCategoryList(6, 0);

categoryList.value = response.data;

const handleNavigate = async (param) => {
  await navigateTo(`${location.origin}/categories/subcategories?parent=${param}`, {
    external: true,
  });
};
</script>
<style
  scoped
  lang="scss"
>
.main-top {
  display: flex;
  margin: $offset-xlarge 0;

  @media (max-width: $laptop) {
    flex-direction: column;
    margin: $offset-base 0;
  }
}

.main-banner {
  padding-right: 8px;
  min-width: 50%;
  width: 50%;
  height: 396px;
  position: relative;
  overflow: hidden;

  @media (max-width: $laptop) {
    width: 100%;
    padding: 0;
    margin: 0 0 $offset-base;
  }

  @media (max-width: $mobile) {
    height: 250px;
  }

  .main-title {
    position: absolute;
    bottom: $offset-base;
    left: $offset-base;
    color: $bg-base;
    margin: 0;
    width: 90%;
    z-index: 2;

    @media (max-width: $mobile) {
      font-size: 22px;
    }
  }

  .main-banner-link {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: calc(100%);
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.25s ease-in-out;
  }
}

.main-category {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .category {
    min-width: 50%;
    grid-template-columns: 1fr 1fr;
  }

  .main-link {
    display: flex;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
    margin-left: $offset-small;

    @media (max-width: $laptop) {
      margin: $offset-small 0 0;
    }

    &:hover {
      color: $primary;
    }

  }
}

.main-recommendation {
  padding: $offset-large-2 0;

  @media (max-width: $mobile) {
    padding: $offset-base 0;
  }
}

.avito-banner {
  max-width: 100%;
  margin: 48px 0;
  display: block;
  transition: box-shadow 0.25s ease-in-out;
  border: 1px solid #e5e5e5;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    display: flex;
  }
}
</style>