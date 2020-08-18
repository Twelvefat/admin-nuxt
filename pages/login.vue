<template>
<div>
  <div :style="{margin: 'auto', position:'absolute', top: '25%', left: '0', bottom:'0', right:'0'}">
    <a-row type="flex" align="middle">
      <a-col :span="8" :offset="8">
        <a-card title="Login">
          <a-form layout="horizontal" :form="form" @submit="login">
            <a-form-item :validate-status="email() ? 'error' : ''" :help="email() || ''">
              <a-input
                size="large"
                v-decorator="[
                  'email',
                  { rules: [{ required: true, message: 'Please input your email!' }] },
                ]"
                placeholder="Email"
              >
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
              <a-input
                size="large"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]"
                type="password"
                placeholder="Password"
              >
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
                Log in
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  layout:'auth',
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    email() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('email') && getFieldError('email');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {

    },
    async login(e){
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: values.email,
                password: values.password
              }
            })
          }catch(e){
            console.log(e)
          }
        }
      });

    }
  },
};
</script>
