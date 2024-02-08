<template>
  <section class='delivery'>
    <div class='delivery-row'>
      <p>Доступна доставка в города Крыма и по всей России.</p>
      <ul class='list'>
        <li>Почта России</li>
        <li>Сдэк</li>
        <li>Деловые линии</li>
      </ul>
    </div>
    <h4>Рассчитать примерную стоимость доставки и найти пункты выдачи можно на официальных сайтах компаний:</h4>
    <div class='delivery-list'>
      <a class="delivery-item" href="https://www.pochta.ru/" target='_blank'>
        <img src="~/assets/img/post.png" alt="Почта России" >
      </a>
      <a class="delivery-item" href="https://www.cdek.ru/ru/calculate" target='_blank'>
        <img src="@/assets/img/sdek.jpeg" alt="Сдэк" >
      </a>
      <a class="delivery-item" href="https://www.dellin.ru/" target='_blank'>
        <img src="@/assets/img/delline.png" alt="Деловые линии" >
      </a>
    </div>
  </section>
</template>
<script>
</script>
<style scoped lang='scss'>

.delivery {
  padding: $offset-large 0;

  @media (max-width: $mobile) {
    flex-wrap: wrap;
    padding: 0;
  }
}

.delivery-list {
  display: flex;
  flex-wrap: wrap;
}

.delivery-item {
  width: 250px;
  height: 150px;
  border: 1px solid #e5e5e5;
  transition: box-shadow 0.25s ease-in-out;
  padding: 8px;
  margin: 0 16px 16px 0;

  &:hover {
    box-shadow: $shadows;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>