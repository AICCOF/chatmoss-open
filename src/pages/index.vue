<template>
  <logo></logo>
  <section class="nav-container">
    <div v-for="(nav, index) in navEnum" :key="index" class="nav" :class="{ disable: !nav.path }" @click="go(nav.path)">
      {{ nav.title }}
    </div>
  </section>
</template>

<script setup lang="ts">
interface NavRecord {
  title: string;
  path: string;
}

const navEnum = ref<Array<NavRecord>>([
  {
    title: "key信息查询",
    path: "/search/key",
  },
  {
    title: "通用API申请",
    path: "",
  },
  {
    title: "AI工具集",
    path: "",
  },
  {
    title: "开发者社区",
    path: "",
  },
  {
    title: "AI资料库",
    path: "",
  },
  {
    title: "ChatMoss SDK",
    path: "",
  },
]);

const router = useRouter()
const go = (path: string) => {
    if(!path) {
        ElMessage.success('暂未开放，敬请期待')
        return
    }

    router.push({ path })
}
</script>

<style lang="scss" scoped>
.nav-container {
  margin: 0 150px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-gap: 20px;

  .nav {
    cursor: pointer;
    text-align: center;
    height: 120px;
    line-height: 120px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    &.disable {
        color: #a3a3a3;
    }
  }
}

@media screen and (max-width: 1280px) {
    .nav-container {
        margin: 0 50px;
        width: calc(100% - 150px);
    }
}

@media screen and (max-width: 750px) {
    .nav-container {
        margin: 0 20px;
        width: calc(100% - 60px);
        grid-template-columns: repeat(2, 50%);
    }
}
</style>
