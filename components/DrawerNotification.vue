<template>
  <div>
      <a-drawer
        title="Notification"
        placement="right"
        :closable="false"
        :visible="drawerVisible"
        @close="onCloseDrawer"
      >
        <p>Some Notification List</p>
      </a-drawer>
  </div>
</template>
<script>
export default {
  data(){
    return {
      drawerVisible:false
    }
  },
  methods: {
    showDrawer(){
      this.drawerVisible = true
    },
    onCloseDrawer() {
      this.drawerVisible = false
    }
  }
}
</script>
