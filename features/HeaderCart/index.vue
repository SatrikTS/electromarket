<template>
  <NuxtLink href='/cart' class='header-cart'>
    <LogoCart class='icon'/>
    <span v-if='count' class='count'>{{ count }}</span>
    <span v-if='sum' class='sum'>{{ sum }} ₽.</span>
  </NuxtLink>
</template>
<script setup>
import LogoCart from '../../assets/icons/cart.vue'

defineProps({
  count: Number,
  sum: Number
})
</script>
<style scoped lang='scss'>
.header-cart {
  display: flex;
  align-items: flex-end;
  position: relative;
  color: $text;

  &:hover {
    color: $primary;
  }

  svg {
    width: 32px !important;
  }
}

.icon {
  width: 32px;
}

.count {
  position: absolute;
  background: $primary;
  border-radius: 100%;
  color: #fff;
  width: 20px;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  left: 12px;
  top: -5px
}

.sum {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-left: 4px;
}
</style>