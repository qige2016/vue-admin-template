<template>
  <Dialog
    type="edit"
    :outer-visible="outerVisible"
    title="密码修改"
    width="30vw"
    v-on="$listeners"
    @submit="editSubmit"
  >
    <Form
      :ref-obj.sync="ref"
      :form="form"
      :form-items="formItems"
      :rules="rules"
    >
      <template slot="userName">
        <el-input
          v-model="operatorBean.userName"
          disabled
        />
      </template>
    </Form>
  </Dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '@/components/Form'
import Dialog from '@/components/Dialog'
export default {
  name: 'ModifyPassword',
  components: { Form, Dialog },
  props: {
    outerVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    /* 检查新旧密码输入是否一致 */
    const newPassword = (rule, value, callback) => {
      if (value === this.form.originPassword) {
        callback(new Error('原密码与新密码一致，请重新输入新密码'))
      } else {
        callback()
      }
    }
    /* 检查两次密码输入是否一致 */
    const confirmPassword = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ref: null,
      form: {},
      formItems: [
        { type: 'slot', label: '账号', value: 'userName' },
        { type: 'password', label: '原密码', value: 'originPassword', clearable: true },
        { type: 'password', label: '新密码', value: 'newPassword', clearable: true },
        { type: 'password', label: '确认密码', value: 'confirmPassword', clearable: true }
      ],
      rules: {
        originPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: newPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: confirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'operatorBean'
    ])
  },
  methods: {
    editSubmit () {
      this.ref.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form)
      })
    }
  }
}
</script>
