<template>
  <div class="product-cart">
    <NuxtLink
      :to="{path: `/catalog/${id}`, query: {param: data?.category.title}}"
      class="product-cart-img"
    >
      <img
        :src="MAIN_URL + data.images[0]?.img"
        :alt="data.caption"
      >
    </NuxtLink>
    <div class="product-cart-common">
      <div class="product-cart-common-top">
        <NuxtLink
          :to="{path: `/products/${id}`, query: {param: data?.category.title}}"
          class="product-cart-caption"
        >{{ data.title }}
        </NuxtLink>
        <span class="product-cart-price"><small>Цена:</small> {{ data.price }} ₽.</span>
      </div>
      <div class="product-cart-common-bottom">
        <div class="product-cart-features">
          <div class="product-cart-control">
            <Button
              size="small"
              @click="minusProductCount(id, count)"
            >-
            </Button>
            <b class="product-cat-number">{{ count }}</b>
            <Button
              size="small"
              @click="plusProductCount(id, count)"
            >+
            </Button>
          </div>
          <span class="product-cart-price"><small>Общая цена:</small> {{ count * data.price }} ₽.</span>
        </div>
        <div class="product-cart-btns">
          <Button
            buttonStyle="danger"
            size="small"
            @click='emit("removeProductFromCart")'
          >Удалить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { useCartStore } from '~/store/cart';

interface Props {
  data: any,
  count: number,
  id: number,
}
defineProps<Props>();

const emit = defineEmits(['removeProductFromCart']);
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const cartStore = useCartStore();
const { plusProductItemCount, minusProductItemCount } = cartStore;

const minusProductCount = (id: string | number, count: number) => {
  if (count > 1) minusProductItemCount(id, count);
};

const plusProductCount = (id: string | number, count: number) => {
  plusProductItemCount(id, count);
};
</script>
<style
  scoped
  lang="scss"
>
.product-cart {
  display: flex;
  margin: 0 0 $offset-base;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  &:last-child {
    margin: 0;
  }
}

.product-cart-img {
  min-width: 150px;
  width: 250px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: $mobile) {
    min-width: 120px;
    width: 120px;
  }

  &:hover {
    img {
      transform: scale(1.3);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    transition: all 0.25s ease-in-out;
  }
}

.product-cart-common {
  width: 100%;
  padding: $offset-base;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: $mobile) {
    padding: $offset-base $offset-base 0;
  }
}

.product-cart-common-top {
  display: flex;
  justify-content: space-between;
  margin: 0 0 $offset-base;

  @media (max-width: $mobile) {
    flex-direction: column;
  }
}

.product-cart-common-bottom {
  flex: 1;
  display: flex;
  justify-content: space-between;

  @media (max-width: $mobile) {
    flex-direction: column;
  }
}

.product-cart-btns {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 0 0 $offset-small;
    width: 100%;
  }
}

.product-cart-caption {
  font-size: 14px;
  font-weight: bold;

  @media (max-width: $mobile) {
    font-weight: 400;
  }

  &:hover {
    color: $primary;
  }
}

.product-cart-price {
  font-weight: bold;
  color: $success;

  small {
    color: #000;
  }
}

.product-cart-control {
  display: flex;
  align-items: center;
  margin: $offset-small 0;

  .input {
    pointer-events: none;
  }
}

.product-cat-number {
  width: 30px;
  text-align: center;
  margin: 0 $offset-small;

  & > input {
    pointer-events: none;
    height: 32px;
  }
}

.product-cart-features {
  display: flex;
  flex-direction: column;
}

.product-cart-category-link {
  margin: 0 0 $offset-small;

  a:hover {
    color: $primary;
  }
}
</style>