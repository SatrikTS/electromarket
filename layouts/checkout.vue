<template>
  <div class="checkout">
    <header class="checkout__header">
      <div class="container">
        <div class="checkout__wrapper">
          <Logo />
          <div
            class="checkout__header-section"
          >
            <Profile />
            <HeaderCart />
          </div>
        </div>
      </div>
    </header>
    <main class="container">
      <slot />
    </main>
    <footer class="checkout__footer">
      <div class="container">
        <div class="checkout__wrapper">
          <Address />
          <Phones />
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
</script>
<style
  scoped
  lang="scss"
>
.checkout {
  &__header {
    width: 100%;
    background: #f2f3f5;
  }

  &__footer {
    width: 100%;
    background: #f2f3f5;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }

  &__header-section {
    display: flex;
    align-items: flex-start;
  }

  main {
    padding: 16px 0;
  }
}
</style>