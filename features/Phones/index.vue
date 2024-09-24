<template>
  <div class='phones'>
    <a
      href='tel: +79788479188'
      class='phone-item'
    >+7 (978) 847-91-88
    </a>
    <a
      href='tel: +79786534490'
      class='phone-item'
    >+7(978)653-44-90
    </a>
    <span class='mark'>Звонки доступны 09:00 – 19:00</span>
  </div>
</template>
<script setup>
</script>
<style
  scoped
  lang='scss'
>
.phones {
  display: flex;
  flex-direction: column;

  @media (max-width: $mobile) {
    align-items: center;
  }

}

.phone-item {
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  margin: 0 0 calc($offset-small / 2);

  &:hover {
    color: $primary;
  }
}

.mark {
  font-size: 12px;
}
</style>