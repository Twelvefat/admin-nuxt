<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="updateUser">
      <a-row :gutter="16">
        <a-col span="8">
          <a-form-item label="Name">
            <a-input
              placeholder="Input your name"
              v-decorator="['name', { rules: [{ required: true, message: 'Please input your name !' }] }]"
            />
          </a-form-item>
          <a-form-item label="Email">
            <a-input
              placeholder="Input your email"
              v-decorator="['email', { rules: [{ required: true, message: 'Please input your email !' }] }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col span="8">
          <a-form-item label="Password">
            <a-input-password
              placeholder="Input your password"
              v-decorator="['password', { rules: [{ required: false, message: 'Please input your password !' }] }]"
            />
            <span :style="{fontSize:'12px'}">Keep it blank if do not change the password</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col span="8">
          <a-form-item label="Password Confirmation">
            <a-input-password
              placeholder="Retype your password"
              v-decorator="['password_confirmation', { rules: [{ required: false, message: 'Retype your password !' }] }]"
              />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item label="Role">
            <a-select
              @change="handleChangeRole"
              placeholder="Select Role"
              v-decorator="['role', { rules: [{ required: true, message: 'Please select the role user' }] }]"
            >
              <a-select-option v-for="(role, index) in roles" :key="index" :value="role.id">{{role.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-button type="primary" html-type="submit" :loading="loading">Update</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  head: {
    title:'Create User'
  },
  async asyncData({$axios}){
    let roles = await $axios.$get('/role')
    return {
      roles: roles.data
    }
  },
  data() {
    return {
      role: '',
      form: this.$form.createForm(this, { name: 'updateUser' }),
    };
  },
  mounted(){
    this.getUser()
  },
  computed: {
    loading(){
      return this.$store.state.user.loading
    },
    errors(){
      return this.$store.state.user.errors
    }
  },
  methods: {
    getUser(){
      this.$axios.get(`/user/${this.$route.params.id}`).then(res => {
          this.form.setFieldsValue({role: res.data.roles[0].id})
          this.form.setFieldsValue({name: res.data.name})
          this.form.setFieldsValue({email: res.data.email})
      }).catch(e => {
        console.log(e)
        return this.$nuxt.error({statusCode: e.response.status, message: e.response.data.message})
      })
    },
    handleChangeRole(value){
      this.role = value;
    },
    updateUser(e){
      e.preventDefault()
      this.form.validateFields(async(err, values) => {
        if(!err){
          try{
            let data = {
              id: this.$route.params.id,
              name: values.name,
              email: values.email,
              password: values.password,
              password_confirmation: values.password_confirmation,
              role: values.role
            }
            this.$store.dispatch('user/UPDATE_USER', data).then((e) => {
              this.$message.success(e.data.message);
            }).catch(e => {
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
