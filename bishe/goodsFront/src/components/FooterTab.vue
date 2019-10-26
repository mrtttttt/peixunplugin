<template>
    <div class="footerTab">
      <nav class="mui-bar mui-bar-tab">
        <router-link to="/" class="mui-tab-item" exact>
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link to="/publish" class="mui-tab-item">
          <span class="mui-icon mui-icon-plusempty"></span>
          <span class="mui-tab-label">发布</span>
        </router-link>
        <router-link class="mui-tab-item" to="/personal">
          <span class="mui-icon mui-icon-person"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
</template>

<script>
    export default {
        name: "footerTab"
    }
</script>

<style scoped>
  .router-link-active{
    color:#ff8053;
  }
</style>
