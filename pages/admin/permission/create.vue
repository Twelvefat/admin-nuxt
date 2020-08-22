<template>
  <div>
<a-form :form="form" layout="vertical" @submit="addPermission">
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
          <a-button type="primary" html-type="submit" :loading="loading">Create</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  head: {
    title:'Create Permission'
  },
  data() {
    return {
      loading:false,
      form: this.$form.createForm(this, { name: 'createPermission' }),
    };
  },
  methods: {
    addPermission(e){
      e.preventDefault()
      this.loading = true
      this.form.validateFields(async(err, values) => {
        if(!err){
          try{
            let data = {
              name: values.name,
            }

            this.$store.dispatch('permission/ADD_PERMISSION', data).then((e) => {
              this.form.resetFields()
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
