<template>
  <div>
    <Form
      :ref-obj.sync="ref"
      :form="form"
      :form-items="formItems"
      :inline="true"
      :rules="rules"
    >
      <template slot="buttons">
        <el-button
          type="primary"
          @click="searchSubmit"
        >
          <svg-icon icon-class="loading" />
          查询
        </el-button>
        <el-button
          type="primary"
          @click="add"
        >
          新增
        </el-button>
      </template>
    </Form>
    <Table
      :data="data"
      :columns="columns"
      :pagination="pagination"
      @current-change="onPagination"
      @size-change="handleSizeChange"
    >
      <el-table-column
        slot="option"
        label="选项"
      >
        <el-button
          slot-scope="{ row }"
        >
          {{ row.name }}
        </el-button>
      </el-table-column>
    </Table>
    <!-- 弹窗（标签页） -->
    <Dialog
      type="tab"
      :show-inner="true"
      :tab-list="tabList"
      inner-title="内层弹窗"
      :selected-tab.sync="selectedTab"
      :outer-visible.sync="rowOuterVisible"
      :inner-visible.sync="rowInnerVisible"
      @outerOpen="outerOpen"
      @updateTab="updateTab"
    >
      <!-- 实际使用时每个 tab 为一个组件 -->
      <div v-if="selectedTab === 'tab1'">
        {{ curRow.name }}
      </div>
      <div v-if="selectedTab === 'tab2'">
        <el-button @click="openInnerDialog">
          内层弹窗
        </el-button>
      </div>
      <div v-if="selectedTab === 'tab3'">
        {{ curRow.address }}
      </div>
      <div v-if="selectedTab === 'tab4'">
        <!-- 嵌套表格 -->
        <Table
          :data="data"
          :columns="columns"
          :pagination="pagination"
          @current-change="onPagination"
          @size-change="handleSizeChange"
        >
          <el-table-column
            slot="option"
            label="选项"
          >
            <el-button
              slot-scope="{ row }"
            >
              {{ row.name }}
            </el-button>
          </el-table-column>
        </Table>
      </div>
      <!-- 内层弹窗 slot -->
      <div slot="innerBody">
        <Form
          :ref-obj.sync="refEdit"
          :form="form1"
          :form-items="formItems"
          :inline="true"
          :rules="rules"
        />
      </div>
      <div slot="innerFooter">
        footer
      </div>
    </Dialog>
    <!-- 弹窗（新增） -->
    <Dialog
      type="add"
      title="新增"
      width="30vw"
      :outer-visible.sync="addOuterVisible"
      @submit="addSubmit"
    >
      <Form
        :ref-obj.sync="refAdd"
        :form="form"
        :form-items="formItems"
        :inline="true"
        :rules="rules"
      />
    </Dialog>
    <!-- 弹窗（编辑） -->
    <Dialog
      type="edit"
      title="编辑"
      width="30vw"
      :outer-visible.sync="editOuterVisible"
      @submit="editSubmit"
    >
      <Form
        :ref-obj.sync="refEdit"
        :form="form1"
        :form-items="formItems"
        :inline="true"
        :rules="rules"
      />
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
import Dialog from '@/components/Dialog'
export default {
  name: 'Home',
  components: { Table, Form, Dialog },
  data () {
    return {
      columns: [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' },
        { prop: 'change', label: '变化' },
        { prop: 'trend', label: '趋势' },
        { slot: 'option' },
        {
          label: '操作',
          width: 380,
          buttons: [{
            label: '禁用',
            click: this.disableTag,
            ifRender: this.ifRender
          }, {
            label: '启用',
            click: this.ableTag
          }, {
            label: '编辑',
            click: this.editRow
          }, {
            label: 'tab',
            click: this.openDialog
          }]
        }
      ],
      data: [{
        date: '2016-05-02',
        name: '王大虎',
        address: '上海市普陀区金沙江路 1518 弄',
        change: '12%',
        trend: '10%'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        change: '-12%',
        trend: '-10%'
      }],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 2
      },
      ref: null,
      refAdd: null,
      refEdit: null,
      form: {},
      formItems: [
        { type: 'input', label: '账号', value: 'account', clearable: true },
        { type: 'password', label: '密码', value: 'password', clearable: true },
        { type: 'textarea', label: '备注', value: 'description', clearable: true, rows: '4', resize: 'none' },
        { type: 'inputNumber', label: '数字', value: 'number', disabled: true },
        { type: 'select', label: '角色', value: 'role', clearable: true, list: [{ label: '全部', value: '' }, { label: '超级管理员', value: 'SUPER' }, { label: '管理员', value: 'SUPER_MGR' }], change: this.selectChange },
        { type: 'date', label: '日期', value: 'date', clearable: true },
        { type: 'datetime', label: '日期时间', value: 'datetime', clearable: true },
        { type: 'datetimerange', label: '日期时间范围', value: 'datetimerange', clearable: true },
        { type: 'slot', value: 'buttons' }
      ],
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      // 弹窗数据
      rowOuterVisible: false,
      rowInnerVisible: false,
      addOuterVisible: false,
      editOuterVisible: false,
      curRow: {},
      // 编辑回填数据
      form1: {
        account: '编辑回填',
        password: 'Zhou0001',
        description: '编辑回填编辑回填编辑回填编辑回填'
      },
      // 标签页
      selectedTab: 'tab1',
      tabList: [
        { name: '标签页1', value: 'tab1' },
        { name: '标签页2', value: 'tab2' },
        { name: '标签页3', value: 'tab3' },
        { name: '标签页4', value: 'tab4' }
      ]
    }
  },
  methods: {
    disableTag (row) {
      console.log(row)
    },
    ifRender (row) {
      return row.name === '王大虎'
    },
    ableTag (row) {
      console.log(row)
    },
    openDialog (row) {
      console.log(row)
      this.curRow = row
      this.rowOuterVisible = true
    },
    openInnerDialog () {
      this.rowInnerVisible = true
    },
    // 在此发起ajax请求
    outerOpen () {
      console.log('dialog open')
    },
    // 选择tab
    updateTab () {
      // 发起后续tab ajax 请求
      console.log('updateTab')
    },
    onPagination (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    add () {
      this.addOuterVisible = true
    },
    editRow () {
      this.editOuterVisible = true
    },
    // 新增
    addSubmit () {
      this.refAdd.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form)
      })
    },
    // 编辑
    editSubmit () {
      this.refEdit.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form1)
      })
    },
    searchSubmit () {
      console.log(this.ref)
      this.ref.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form)
      })
    },
    selectChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
