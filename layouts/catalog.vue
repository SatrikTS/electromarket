<template>
  <div>
    <Header/>
    <main class='container'>
      <slot/>
    </main>
    <Footer/>
  </div>
</template>
<script>
export default {
  name: "catalog",
}
</script>
<style scoped lang='scss'>
.catalog {
  display: flex;
}

.column {
  min-width: 20%;
  min-height: 500px;
}

.content {
  padding: 0 0 $offset-large $offset-large;
  flex: 1 0 0;
}

</style>