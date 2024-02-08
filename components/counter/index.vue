<template>
  <a
    href="https://www.liveinternet.ru/click"
    target="_blank"
  >
    <img
      id="licnt5D4C"
      width="88"
      height="31"
      style="border:0"
      title="LiveInternet: показано число просмотров за 24 часа, посетителей за 24 часа и за сегодня"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7"
      alt=""
    />
  </a>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  (function(d, s) {
    d.getElementById('licnt5D4C').src =
      'https://counter.yadro.ru/hit?t14.5;r' + escape(d.referrer) +
      ((typeof (s) == 'undefined') ? '' : ';s' + s.width + '*' + s.height + '*' +
        (s.colorDepth ? s.colorDepth : s.pixelDepth)) + ';u' + escape(d.URL) +
      ';h' + escape(d.title.substring(0, 150)) + ';' + Math.random()
  })
  (document, screen)
})
</script>
<style scoped>
</style>