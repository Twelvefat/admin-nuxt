<template>
  <div>
    <nuxt-link to="/admin/role/create" type="primary" icon="user-add" :style="{marginBottom: '20px'}">
      Add Role
    </nuxt-link>
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
        <nuxt-link :to="`/admin/role/${record.id}`">
          <a-icon type="edit" class="cursor-pointer" :style="{color:'#000000'}" />
        </nuxt-link>
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a-icon type="delete" class="cursor-pointer" :style="{color:'#000000'}"/>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    data:[],
    columns: [
      {
        title:'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
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
  }),
  mounted(){
    this.fetch()
  },
  methods: {
    handleTableChange(pagination, filters, sorter){
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    onDelete(key) {
      this.$axios.delete(`/role/${key}`).then(res => {
        console.log(res)
        let page = this.pagination.current
        let total = this.pagination.total - 1
        if(total%10 === 0){
          page = this.pagination.current - 1
        }
        this.fetch({
          page: page
        });
        this.$message.success(res.data.message)
      }).catch(err => {
        console.log(err);
      });
    },
    fetch(params = {}) {
      this.loading = true
      this.$axios.get('/role',{
        params: {
          ...params
        }
      }).then(res => {
          const pagination = {...this.pagination};
          pagination.total = res.data.total;
          this.loading = false;
          this.data = res.data.data;
          this.pagination = pagination;
      }).catch(e => {
        return this.$nuxt.error({statusCode: e.response.status, message: e.response.data.message})
      })
    }
  }
}
</script>
