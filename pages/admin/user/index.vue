<template>
  <div>
    <div :style="{marginBottom:'30px'}">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <nuxt-link to="/">
              <a-icon type="home" />
              <span :style="{marginLeft:'5px'}">Dashboard</span>
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>User</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <div :style="{marginBottom:'30px'}">
      <nuxt-link to="/admin/user/create" type="primary" icon="user-add" :style="{marginBottom: '20px'}">
        Create User
      </nuxt-link>
    </div>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="created_at" slot-scope="created_at">
        {{$moment(created_at).format('dddd, DD MMMM YYYY')}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <!-- <a @click="showModal(record.id)" :style="{marginRight:'10px'}">
          <a-icon type="profile" class="cursor-pointer" :style="{color:'#000000'}" />
        </a> -->
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>Edit</span>
          </template>
          <nuxt-link :to="`/admin/user/${record.id}`" :style="{marginRight:'10px'}">
            <a-icon type="edit" class="cursor-pointer" :style="{color:'#000000'}" />
          </nuxt-link>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>Delete</span>
          </template>
          <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a-icon type="delete" class="cursor-pointer" />
          </a-popconfirm>
        </a-tooltip>
      </template>
    </a-table>
    <!-- <ModalDetail :visible="visibleModal" :data="dataModal"/> -->
  </div>
</template>

<script>

// import ModalDetail from '~/components/partials/user/ModalDetail.vue'

export default {
  head: {
    title: 'User'
  },
  data: () => ({
    visibleModal:false,
    data:[],
    columns: [
      {
        title:'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
      },
      {
        title:'Email',
        dataIndex: 'email',
        sorter: true,
        width:'20%',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        sorter: true,
        scopedSlots: { customRender: 'created_at' },
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      },
    ],
    pagination:{},
    loading:false,
    dataModal:null,
  }),
  // components: {
  //   ModalDetail,
  // },
  mounted(){
    this.fetch()
  },
  methods: {
    handleTableChange(pagination, filters, sorter){
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        // results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        // ...filters,
      });
    },
    onDelete(key) {
      this.$axios.delete(`/user/${key}`).then(res => {
        let page = this.pagination.current
        let total = this.pagination.total - 1
        if(total%10 === 0){
          page = this.pagination.current - 1
        }
        this.fetch({
          page: page
        });
      }).catch(err => {
        console.log(err);
      });
    },
    fetch(params = {}) {
      this.loading = true
      this.$axios.get('/user',{
        params: {
          ...params
        }
      }).then(res => {
        console.log(res)
          const pagination = {...this.pagination};
          pagination.total = res.data.total;
          this.loading = false;
          this.data = res.data.data;
          this.pagination = pagination;
      })
    },
    // showModal(id){
    //   this.visibleModal = true
    //   this.$axios.get(`/user/${id}`).then(res => {
    //     // Get Role Permissions
    //     console.log(res.data)
    //     this.dataModal = res.data
    //   }).catch(e => {
    //     return this.$nuxt.error({statusCode: 404, message: e.response.data.message})
    //   })
    // }
  }
}
</script>
