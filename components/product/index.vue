<template>
  <div
    class="product"
  >
    <div class="product__wrap">
      <NuxtLink
        class="product__link-group"
        :to="{path: `/products/${data.id}`, query: {categories: data.category_id}}"
      >
        <div class="product__pic">
          <v-img
            v-if="data.images[0]"
            cover
            :src="MAIN_URL+ data.images[0].img"
            :alt="data.title"
          />
          <v-img
            v-else
            class="mx-auto"
            height="300"
            lazy-src="@/assets/img/loader.webp"
            max-width="500"
            src="https://bad.src/not/valid"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </div>
        <span
          class="product__title"
        >{{ data.title }}
      </span>
      </NuxtLink>
      <div
        class="product__description"
      >
        {{ truncateString(data.info, 45) }}
      </div>
      <div class="product__service">
      <span
        class="product__balance"
        :class="balanceStyled"
      >
        <span v-if="data.balance > 0">В наличии</span>
        <span v-else class="product__balance-empty">Под заказ</span>
      </span>
        <span class="product__price">{{ data.price }} ₽</span>
      </div>
      <div class="product__cart-group">
        <Button
          v-if="compareReady"
          type="button"
          size="small"
          buttonStyle="default"
        >
          <b>Сравнить</b>
          <CompareIcon />
        </Button>
        <Button
          type="button"
          buttonStyle="success"
          @click="emit('addToCart')"
        >
          В корзину
          <LogoCart class="icon" />
        </Button>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';
import Button from '../../features/Button/Button';
import LogoCart from '../../assets/icons/cart.vue';
import CompareIcon from '../../assets/icons/compare.vue';
import { truncateString } from '@/utils/cuttingString';

interface Props {
  data: {
    title: string,
    info: string,
    price: string,
    images: string,
    id: string,
    category_id: string,
    balance: string,
  };
  isLoading?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['addToCart']);
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
const compareReady = ref(false)

const balanceStyled = computed(() => {
  //
  // if (!parseInt(props.data.balance)) {
  //   return 'empty';
  // }
  //
  // if (props.data.balance > 3) {
  //   return 'success';
  // } else {
  //   return 'warning';
  // }

});
</script>
<style
  scoped
  lang="scss"
>
.product {
  position: relative;

  &:hover {
    .product__btns {
      opacity: 1;
      z-index: 1;
    }

    .product__title {

    }
  }

  &.is-loading {

    .product__wrap {
      @include skeleton(100%, 100%);
    }
  }

  &__wrap {
    border: 1px solid #e5e5e5;
    padding: $offset-small;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    border-radius: 8px;
    transition: box-shadow 0.25s ease-in-out;

    &:hover {
      box-shadow: $shadows;
    }

    &__link-group {
      &:hover {
        .product__title {
          color: $primary;
        }

      }
    }
  }

  &__title {
    font-weight: bold;
    font-size: 12px;
    margin: auto 0;
    color: #000;
    height: 40px;
    display: inline-block;
    overflow: hidden;

    &:hover {
      color: $primary
    }
  }

  &__description {
    font-size: 12px;
    max-width: max-content;
    max-height: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    display: inline-block;
    overflow: hidden;

    @media (max-width: $mobile) {
      display: none;
    }
  }

  &__price {
    position: relative;
    margin: 8px 0;
    font-weight: bold;
    color: $primary;

    @media (max-width: $mobile) {
      margin: 4px 0;
    }
  }

  &__pic {
    height: 200px;
    overflow: hidden;
    margin: 0 0 $offset-small;

    @media (max-width: $mobile) {
      height: 180px;
      display: flex;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }

    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: block;
      object-fit: contain;
      transition: transform 0.35s ease-in-out;
    }
  }

  &__cart-group {
    display: flex;
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      width: 42px;
      height: 42px;

      &:first-child {
        flex: 1;
      }

      svg {
        margin-left: 12px;
      }
    }
  }

  &__balance {
    font-size: 12px;
    font-weight: bold;

    &.success {
      color: $success;
    }

    &.warning {
      color: $text;
    }

    &-empty {
      color: $primary;
    }
  }

  &__service {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: $mobile) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>