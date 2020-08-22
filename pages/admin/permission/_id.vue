<template>
  <div>
    <a-spin :spinning="spinning">
      <!-- Custom icon spin -->
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />

      <a-form :form="form" layout="vertical" @submit="updatePermission">
        <a-row :gutter="16">
          <a-col span="8">
            <a-form-item label="Permission Name">
              <a-input
                placeholder="Input permission name"
                v-decorator="['name', { rules: [{ required: true, message: 'Please input permission name !' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
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
    title:'Update Permission'
  },
  data() {
    return {
      loading:false,
      spinning:false,
      form: this.$form.createForm(this, { name: 'updatePermission' }),
    };
  },
  mounted(){
    this.getPermission()
  },
  methods: {
    getPermission(){
      this.spinning = true
      this.$axios.get(`/permissions/${this.$route.params.id}`).then(res => {
        this.form.setFieldsValue({name: res.data.name})
        this.spinning = false
      }).catch(e => {
        return this.$nuxt.error({statusCode: e.response.status, message: e.response.data.message})
      })
    },
    updatePermission(e){
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async(err, values) => {
        if(!err){
          try{
            let data = {
              id: this.$route.params.id,
              name: values.name,
            }
            this.$store.dispatch('permission/UPDATE_PERMISSION', data).then((e) => {
              this.$message.success(e.data.message);
              this.loading = false
            }).catch(e => {
              this.$message.error(e.response.status);
              this.loading = false
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
