<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      title="修改姓名"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateName"
    >
    </van-nav-bar>

    <!-- 输入框 -->
    <div class="field">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async updateName () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 加载时间 0 --> 一直加载
      })

      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast.fail('昵称不能为空')
          return
        }

        await updateUserInfo({
          name: localName
        })

        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('input', localName)
        this.$toast.success('昵称更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  .van-nav-bar {
    background-color: #fffeff !important;

    .van-nav-bar__title {
      color: #323233;
    }

    // 输入框
    textarea {
      background-color: #fffeff !important;
    }

    .van-cell {
      background-color: #f6f7fa !important;
    }
  }
}
</style>
