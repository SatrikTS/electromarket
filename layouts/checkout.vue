<template>
  <div class="checkout">
    <Header :isService="true"/>
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
<style
  scoped
  lang="scss"
>
.checkout {

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

  main {
    padding: 16px;
  }
}
</style>