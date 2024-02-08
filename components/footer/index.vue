<template>
  <footer class='footer'>
    <div class='container'>
      <div class='footer-wrap'>
        <div class='footer-top'>
          <Logo />
          <Menu />
        </div>
        <div class='footer-bottom'>
          <Address />
          <Phones />
          <Counter/>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
</script>
<style
  lang='scss'
>
.footer {
  background: #2c3e50;

  .logo {
    background: $bg-main;
    padding: 4px;
    margin-right: $offset-xlarge;

    @media (max-width: $mobile) {
      margin: 0;
    }
  }

  .phones {
    align-items: flex-end;
    color: $bg-main;

    @media (max-width: $mobile) {
      align-items: flex-start;
      width: 100%;
    }

    a:hover {
      color: $bg-gold;
    }
  }

  .address {
    color: $bg-main;
    margin: $offset-base 0 0;
    font-size: 16px;
    line-height: 1.5;
    max-width: 100%;
    font-weight: bold;

    @media (max-width: $mobile) {
      font-size: 14px;
      margin: 0 0 $offset-small;
    }
  }
}

.footer-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: $offset-base 0;
}

.footer-col {
  display: flex;
  width: 24%;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 $offset-base;
  margin: 0 0 $offset-base;
  border-bottom: 1px solid $bg-base;

  @media (max-width: $mobile) {

  }

  nav {
    width: 100%;

    .menu-item a {
      color: $bg-base;

      &:hover {
        color: $bg-gold;
      }

      &.router-link-active {
        color: $bg-gold;
      }
    }

    @media (max-width: $laptop) {
      display: none;
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>