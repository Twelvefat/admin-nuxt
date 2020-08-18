<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="record => record.login.uuid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.login.uuid)"
        >
          <a-icon type="delete" class="cursor-pointer" />
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
        scopedSlots: {customRender: 'name'},
      },
      {
        title:'Gender',
        dataIndex: 'gender',
        sorter: true,
        width:'20%',
        filters:[
          {text:'Male', value:'male'},
          {text:'Female', value:'female'},
        ]
      },
      {
        title: 'Email',
        dataIndex:'email',
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
      const data = [...this.data];
      this.data = data.filter(item => item.login.uuid !== key);
    },
    fetch(params = {}) {
      this.loading = true
      this.$axios.get('https://randomuser.me/api',
        {
          params: {
            results :10,
            ...params
          }
        }).then(res => {
          const pagination = {...this.pagination}
          pagination.total = 50
          this.loading = false
          this.data = res.data.results
          this.pagination = pagination
      })
    }
  }
}
</script>
