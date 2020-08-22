<template>
  <div>
    <a-modal v-model="visible" title="User Detail">
      <a-spin :spinning="!data">

        <!-- Custom icon spin -->
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <div v-if="data">
          <a-descriptions :title="data.name" layout="vertical">
            <a-descriptions-item label="Name">

            </a-descriptions-item>
            <a-descriptions-item label="Email">
              1810000000
            </a-descriptions-item>
          </a-descriptions>
        </div>

      </a-spin>

      <!-- Footer -->
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Return
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ['visible','data'],
  methods: {
    handleCancel(){
      this.visible = false
    }
  }
}
</script>
