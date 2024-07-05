<template>
  <div class="page">
    <Header />
    <main class="page__main">
      <div class="container">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>
<style
  lang="scss"
>
.page {

  &__main {
    padding:20px 0 40px;
  }

  h1 {
    margin: 0 0 20px;
  }
}
</style>