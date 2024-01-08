<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
      @change="onChange"
      :defaultIndex="value"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      genderIndex: this.value
    }
  },
  methods: {
    // 取消按钮
    onCancel () {
      this.$emit('close')
    },
    // 确认按钮
    async onConfirm () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 加载时间 0 --> 一直加载
        })
        await updateUserInfo({
          gender: this.genderIndex
        })

        // 发起请求变化后
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.genderIndex)
        this.$toast.success('性别更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    // 变化触发
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style lang="less" scoped></style>
