<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="updateBirthday"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      // 选择的时间
      currentDate: new Date(2000, 0, 1),
      localbirthday: this.value
    }
  },
  methods: {
    async updateBirthday () {
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 加载时间 0 --> 一直加载
        })
        await updateUserInfo({
          birthday: birthday
        })

        this.$emit('close')
        this.$emit('input', birthday)
        this.$toast.success('更新生日成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
