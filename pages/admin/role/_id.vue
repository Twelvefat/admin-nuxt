<template>
  <div>
    <a-spin :spinning="!permissions_check.length > 0">

      <!-- Custom icon spin -->
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />

      <a-form :form="form" layout="vertical" @submit="updateRole">
        <a-row :gutter="16">
          <a-col span="8">
            <a-form-item label="Name">
              <a-input
                placeholder="Input role name"
                v-decorator="['name', { rules: [{ required: true, message: 'Please input role name !' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="Permissions">
          <a-checkbox-group v-model="permissions_check" @change="handleChangePermissions">
            <a-row>
              <a-col :span="5" v-for="(permission, index) in permissions" :key="index">
                <a-checkbox :value="permission.id">
                  {{permission.name}}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-row>
          <a-col span="8">
            <a-button type="primary" html-type="submit" :loading="loading">Update</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>
<script>
export default {
  head: {
    title:'Create Role'
  },
  async asyncData({$axios, params, error}){
    let permissions = await $axios.$get('/permissions/data')
    return {
      permissions: permissions,
    }
  },
  data() {
    return {
      role_permission: [],
      loading:false,
      permissions_check: [],
      form: this.$form.createForm(this, { name: 'updateRole' }),
    };
  },
  mounted() {
    this.getRole()
  },
  computed: {
    errors(){
      return this.$store.state.role.errors
    }
  },
  methods: {
    getRole(){
      this.$axios.get(`/role/${this.$route.params.id}`).then(res => {

        // Get Role Permissions
        let rolePermission = res.data.role.permissions
        let role_permission = []
        rolePermission.map((item, index) => {
          role_permission.push(item.id)
        })
        this.role_permission = role_permission

        // Looping Permissions for match with role permissions
        this.permissions.map((item, index) => {
          if(role_permission.includes(item.id)){
            this.permissions_check.push(item.id)
          }
        })

        // Set default value to name field
        this.form.setFieldsValue({name: res.data.role.name})
      }).catch(e => {
        return this.$nuxt.error({statusCode: 404, message: e.response.data.message})
      })
    },
    handleChangePermissions(value){
      this.permissions_check = value
    },
    updateRole(e){
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async(err, values) => {
        if(!err){
          try{
            let data = {
              id: this.$route.params.id,
              name: values.name,
              permissions_check : this.permissions_check
            }
            this.$store.dispatch('role/UPDATE_ROLE', data).then((e) => {
              this.$message.success(e.data.message);
              this.loading = false
            }).catch(e => {
              this.loading = false
              this.$message.error(e.response.status);
            });
          }catch(e){
            // console.log(e)
          }
        }
      })
    }
  }
}
</script>
