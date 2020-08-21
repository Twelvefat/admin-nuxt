<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="addRole">
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
          <a-button type="primary" html-type="submit" :loading="loading">Create</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  head: {
    title:'Create Role'
  },
  async asyncData({$axios}){
    let permissions = await $axios.$get('/permissions/data')
    return {
      permissions: permissions
    }
  },
  data() {
    return {
      loading:false,
      permissions_check: [],
      form: this.$form.createForm(this, { name: 'addRole' }),
    };
  },
  computed: {
    errors(){
      return this.$store.state.role.errors
    }
  },
  methods: {
    handleChangePermissions(value){
      this.permissions_check = value
    },
    addRole(e){
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async(err, values) => {
        if(!err){
          try{
            let data = {
              name: values.name,
              permissions_check : this.permissions_check
            }
            this.$store.dispatch('role/ADD_ROLE', data).then((e) => {
              this.form.resetFields()
              this.permissions_check = []
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
