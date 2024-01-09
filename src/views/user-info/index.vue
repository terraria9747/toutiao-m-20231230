<template>
  <div class="userchat-container">
    <!-- 顶部标题 -->
    <van-nav-bar
      title="消息通知"
      left-text="返回"
      right-text="删除对话"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 聊天区域 -->
    <!-- 对话部分 -->
    <van-cell-group class="talk-list" ref="talk-list">
      <van-cell v-for="(item, index) in messages" :key="index">
        <div class="info">
          <div class="img">
            <van-image
              round
              width="30"
              height="30"
              :src="
                index % 2 == 0
                  ? 'http://geek.itheima.net/uploads/1704780488537.blob'
                  : 'http://geek.itheima.net/uploads/1704799665569.blob'
              "
            />
          </div>

          <div class="title">
            {{ index % 2 == 0 ? 'You' : '学不通--消息中心' }}
          </div>
        </div>
        <div class="msg">{{ index % 2 == 0 ? item : item.text }}</div>
      </van-cell>
    </van-cell-group>

    <!-- 底部输入框 -->
    <van-cell-group class="token">
      <van-field
        v-model="message"
        placeholder="请输入信息..."
        class="token-input"
      />
      <van-button type="primary" size="small" class="token-btn" @click="onPost"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import { getSpoken } from '@/api/gpt'
import { getItem, setItem } from '@/utls/storage'

export default {
  name: 'UserinfoMessage',
  data () {
    return {
      message: '',
      messages: getItem('TOUTIAO_MESSAGE') || []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },

    async onPost () {
      this.$toast.loading({
        message: '对方输入中...',
        forbidClick: true,
        duration: 0 // 加载时间 0 --> 一直加载
      })
      try {
        const { data } = await getSpoken(this.message)
        this.messages.push(this.message)
        this.messages.push(data.data.info)
        this.message = ''
        setItem('TOUTIAO_MESSAGE', this.messages)
        this.$toast.success('不好意思, 姿势有点慢')
      } catch (err) {
        this.$toast('请求失败, 请重试')
      }
    },

    scrollBottom () {
      const list = this.$refs['talk-list']
      list.scrollTop = list.scrollHeight
    },

    onClickRight () {
      this.$dialog
        .confirm({
          title: '确认?',
          message: '确认删除对话吗, 此操作不可恢复!!!'
        })
        .then(() => {
          localStorage.removeItem('TOUTIAO_MESSAGE')
          return location.reload()
        })
        .catch(() => {
          return location.reload()
        })
    }
  },
  mounted () {
    this.scrollBottom()
  },
  watch: {
    messages () {
      // 监听到messages变化, 就触发该函数
      setItem('TOUTIAO_MESSAGE', this.messages)

      // 数据改变视图更新不是立即的
      this.$nextTick(() => {
        this.scrollBottom()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar__text,
.van-icon {
  color: #fff;
}

// 对话部分
.talk-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 110px;
  overflow-y: auto;
  background-color: #f5f7f9;

  .van-cell {
    background-color: #ffffff;
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    // 头像和名称
    .info {
      display: flex;
      align-items: center;
      line-height: 0;
      .img {
        padding-right: 20px;
      }
    }
    // 内容
    .msg {
      margin-top: 20px;
    }
  }
}

// 底部对话框
.token {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fafafa;
  .token-input {
    height: 70px;
    line-height: 0px;
    margin-right: 20px;
    border-radius: 35px;
  }
}
</style>
