<template>
  <section class="logo-container">
    <img src="@/assets/logo.png" alt="" srcset="" />
    <h1>
        ChatMoss开放平台
        <slot></slot>
    </h1>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  text-align: center;
  margin: 150px 0 50px;

  img {
    width: 150px;
  }
}

@media screen and (max-width: 750px) {
  .logo-container {
    margin-top: 50px;
  }
}
</style>
