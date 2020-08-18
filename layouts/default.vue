<template>
<div>

  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <nuxt-link to="/">
            <a-icon type="layout" />
            <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="2">
          <nuxt-link to="/admin/user">
            <a-icon type="user" />
            <span>User</span>
          </nuxt-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="lock" /><span>Permission & Role</span></span>
          <a-menu-item key="3"><nuxt-link to="/">Permission</nuxt-link></a-menu-item>
          <a-menu-item key="4"><nuxt-link to="/">Role</nuxt-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="file" /><span>Log</span></span>
          <a-menu-item key="6"><nuxt-link to="/">Activity</nuxt-link></a-menu-item>
          <a-menu-item key="8"><nuxt-link to="/">User</nuxt-link></a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-menu
          theme="light"
          mode="horizontal"
          :style="{ lineHeight: '64px', float:'right' }"
        >
          <a-menu-item key="bell" @click="clickDrawer" >
            <div>
              <a-icon type="bell" :style="{ fontSize: '20px' }" />
            </div>
          </a-menu-item>
          <a-sub-menu key="3">
            <span slot="title" class="submenu-title-wrapper">
              <a-avatar size="large" src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png" />
              {{$auth.user.name}}
            </span>
              <a-menu-item key="profile">
                <span>
                  <a-icon type="user" />
                  Profile
                </span>
              </a-menu-item>
              <a-menu-item key="setting">
                <span>
                  <a-icon type="setting" />
                  Setting
                </span>
              </a-menu-item>
              <a-menu-item key="logout" @click="logout">
                <span>
                  <a-icon type="logout" />
                  Logout
                </span>
              </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin: 20px 16px;">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', marginTop:20, borderRadius:'5px'}">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <!-- Drawer -->
  <DrawerNotification ref="drawerNotification" />
</div>
</template>

<script>
import DrawerNotification from '~/components/DrawerNotification.vue'

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components:{
    DrawerNotification
  },
  methods: {
    clickDrawer(){
      this.$refs.drawerNotification.showDrawer()
    },
    logout(){
      this.$auth.logout()
    }
  }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgb(49, 49, 49);
  margin: 16px;
}
</style>
