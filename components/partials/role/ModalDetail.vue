<template>
  <div v-if="data">
    <a-modal v-model="visible" title="Detail Role">
      <h3>{{data.name | capitalize}}</h3>
      <a-form-item label="Permissions">
          <a-row>
            <a-col :span="11" v-for="(permission, index) in data.rolePermissions" :key="index">
              <a-checkbox :value="permission.id" :checked="true">
                {{permission.name}}
              </a-checkbox>
            </a-col>
          </a-row>
      </a-form-item>
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
  }
}
</script>
