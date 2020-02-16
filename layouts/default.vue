<template>
<a-layout id="components-layout-demo-side" style="min-height: 100vh;">
  <a-layout-sider collapsible v-model="collapsed" :style="{position:'fixed',height:'100vh'}">
    <div class="logo" />
    <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline">
      <a-menu-item  key="1">
        <a-icon type="layout" />
        <span><nuxt-link to="/">Dashboard</nuxt-link></span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="lock" /><span>Permission & Role </span></span>
        <a-menu-item key="6"><nuxt-link to="/">Permission</nuxt-link></a-menu-item>
        <a-menu-item key="7"><nuxt-link to="/">Role</nuxt-link></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="copy" /><span>Log</span></span>
        <a-menu-item key="8"><nuxt-link to="/">Activity</nuxt-link></a-menu-item>
        <a-menu-item key="9"><nuxt-link to="/">User</nuxt-link></a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
  <a-layout>
    <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
    <a-layout-content style="margin: 0 16px">
      <div>
        <nuxt />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Rizal Fatahillah ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scoped>

#components-layout-demo-side .logo {
  height: 32px;
  background: rgb(49, 49, 49);
  margin: 16px;
}
</style>
