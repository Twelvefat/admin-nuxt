<template>
  <div>
    <a-modal v-model="visible" title="Detail Role">
      <a-spin :spinning="!data.hasOwnProperty('rolePermissions')">

        <!-- Custom icon spin -->
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />

        <h2>{{data.name | capitalize}}</h2>
        <a-form-item label="Permissions">
            <a-row>
              <a-col :span="11" v-for="(permission, index) in data.rolePermissions" :key="index">
                <a-checkbox :value="permission.id" :checked="true">
                  {{permission.name | capitalize}}
                </a-checkbox>
              </a-col>
            </a-row>
        </a-form-item>
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
  props: ['data','visible'],
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    handleCancel(){
      this.visible = false
    }
  }
}
</script>
