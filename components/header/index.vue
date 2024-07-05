<template>
  <header
    class="header"
    :class="{secondary: isService}"
  >
    <GlobalSearch v-if="isMobileSize && !isService"/>
    <div class="header-data">
      <div class="container">
        <div class="header-section">
          <Address />
          <Phones />
        </div>
      </div>
    </div>
    <div class="container">
      <div
        class="header-top"
        v-if="!isMobileSize"
      >
        <Logo />
        <GlobalSearch v-if="!isService"/>
        <div
          class="header-service"
        >
          <Profile />
          <HeaderCart
            :count="totalCount"
            :sum="totalSum"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!isService || (isMobileSize && isService)"
      class="header-bottom"
    >
      <div class="container">
        <Menu :isMobileSize="isMobileSize"></Menu>
      </div>
    </div>
  </header>
  <Transition name="informer">
    <Informer
      status="success"
      v-show="isAddCart"
    >
      Товар добавлен в корзину
    </Informer>
  </Transition>
  <Transition name="informer">
    <Informer
      status="danger"
      v-show="isRemoveCart"
    >
      Товар удален из корзины
    </Informer>
  </Transition>
</template>
<script
  setup
  lang="ts"
>
import { updateScreenSize } from '../../utils/updateResize';
import Logo from '@/features/Logo';
import Phones from '@/features/Phones';
import Address from '@/features/Address';
import HeaderCart from '@/features/HeaderCart';
import Profile from '@/components/profile';
import GlobalSearch from '@/components/global-search';
import { onMounted, ref, watch } from 'vue';
import { useCartStore } from '~/store/cart';
import { usePersonalStore } from '~/store/personal-store';

interface Props {
  isService?: boolean;
}

defineProps<Props>();

const cartStore = useCartStore();
const isAddCart = ref(false);
const isRemoveCart = ref(false);
const totalSum = ref(0);
const totalCount = ref(0);
const isMobileSize = ref(false);
const { getPersonalData } = usePersonalStore();

/**
 * Отслеживаем добавление в корзину
 */
watch(() => cartStore.cartGetter, (value, oldValue) => {

  if (value > oldValue) {
    isAddCart.value = true;

    setTimeout(() => {
      isAddCart.value = false;
    }, 2000);
  }

  if (value < oldValue) {
    isRemoveCart.value = true;

    setTimeout(() => {
      isRemoveCart.value = false;
    }, 2000);
  }

});

onMounted(() => {
  totalSum.value = getCookie('cartSum');
  totalCount.value = getCookie('cartCount');

  isMobileSize.value = updateScreenSize();

  window.addEventListener('resize', () => {
    isMobileSize.value = updateScreenSize();
  });
});
</script>
<style
  scoped
  lang="scss"
>
.header {
  background: $bg-main;

  &.secondary {
    background: $bg-base;

    .header-data {
      background: $bg-main;
    }
  }

  @media (max-width: $mobile) {
    display: flex;
    flex-direction: column;
  }

}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $offset-large 0;

  @media (max-width: $mobile) {
    flex-direction: column;
  }

  & > .address {

  }
}

.header-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: $mobile) {
    flex-direction: column;
  }

  & > .phones {
    flex-direction: row;
    align-items: center;
    gap: 16px;

    .phone-item {
      margin: 0;
    }
  }
}

.header-data {
  background: rgb(244, 245, 245);

  @media (max-width: $mobile) {
    order: 1;
    display: none;
  }
}

.header-service {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-bottom {
  background: $bg-base;
}

.informer-enter-active,
.informer-leave-active {
  transition: opacity 0.5s ease;
}

.informer-enter-from,
.informer-leave-to {
  opacity: 0;
}
</style>