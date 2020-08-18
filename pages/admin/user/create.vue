<template>
  <div>
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col  span="8">
          <a-form-item
            label="Username"
          >
            <a-input />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col  span="8">
          <a-form-item
            label="Name"
          >
            <a-input />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col  span="8">
          <a-form-item
            label="Email"
          >
            <a-input />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col  span="8">
          <a-form-item
            label="Password"
          >
            <a-input />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col  span="8">
          <a-form-item
            label="Confirm Password"
          >
            <a-input />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item
            label="Role"
          >
            <a-select @change="handleChange" placeholder="Select Role">
              <a-select-option value="admin">Admin</a-select-option>
              <a-select-option value="user">User</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-button type="primary">Create</a-button>
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
  methods: {
    handleChange(value){
      console.log('Checked = ', value)
    }
  }
}
</script>
