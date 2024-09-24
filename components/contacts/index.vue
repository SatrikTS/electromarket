<template>
  <section class='contacts'>
    <div class='contacts-row'>
      <div class='contact-block'>
        <span class='contacts-caption'>Вы можете забрать товар сами, заехав в наш офис:</span>
        <Address />
      </div>
      <div class='contact-block'>
        <span class='contacts-caption'>Режим работы:</span>
        <span><b>Понедельник-Пятница:</b> 9:00 - 17:30</span> /
        <span><b>Суббота:</b> 9:00 - 15:00</span>
      </div>
      <div class='contact-block'>
        <span class='contacts-caption'>Связаться с нами по всем вопросам:</span>
        <Phones />
      </div>
      <div class='contact-block'>
        <span class='contacts-caption'>Электронная почта:</span>
        <a href='mailto:instrymentsev@yandex.ru'>instrymentsev@yandex.ru</a>
      </div>
      <div class='contact-block'>
        <span class='contacts-caption'>Осуществляем доставку в города Крыма и России почтой и службами доставки. Предварительное согласование</span>
      </div>
    </div>
    <div class='contacts-row'>
      <div style="position:relative;overflow:hidden;">
        <a
          href="https://yandex.com.ge/maps/959/sevastopol/?utm_medium=mapframe&utm_source=maps"
          style="color:#eee;font-size:12px;position:absolute;top:0px;"
        >Севастополь
        </a>
        <a
          href="https://yandex.com.ge/maps/959/sevastopol/house/vulytsia_shabalina_10a/Z0oYcwdlSEEPQFpufXl2dHlnYA==/?ll=33.501799%2C44.576602&utm_medium=mapframe&utm_source=maps&z=13.18"
          style="color:#eee;font-size:12px;position:absolute;top:14px;"
        >Улица Шабалина, 10А — Яндекс Карты
        </a>
        <iframe
          src="https://yandex.com/map-widget/v1/?ll=33.501799%2C44.576602&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNzIzMjIzNTUwEkvQo9C60YDQsNGX0L3QsCwg0KHQtdCy0LDRgdGC0L7Qv9C-0LvRjCwg0LLRg9C70LjRhtGPINCo0LDQsdCw0LvRltC90LAsIDEw0JAiCg1GBQZCFVxNMkI%2C&z=13.18"
          width="100%"
          height="400"
          frameborder="1"
          allowfullscreen="true"
          style="position:relative;"
        ></iframe>
      </div>
    </div>
  </section>
</template>
<script setup>
</script>
<style
  scoped
  lang='scss'
>
.contacts {
  display: flex;
  padding: $offset-xlarge 0;

  @media (max-width: $mobile) {
    flex-wrap: wrap;
    padding: 0;
  }

  .address {
    max-width: max-content;
  }
}

.contact-block {
  margin: $offset-small 0 $offset-large;

  @media (max-width: $mobile) {
    margin: 8px 0 8px;
    border-bottom: 1px dotted #ccc;
    padding: 0 0 8px;
  }

  &:last-child {
    margin: 0;
  }
}

.contacts-row {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: $mobile) {
    width: 100%;
  }
}

.contacts-caption {
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
  display: block;
  margin: 0 0 $offset-base;
}
</style>