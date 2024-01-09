<template>
  <div class="userchat-container">
    <!-- 顶部标题 -->
    <van-nav-bar
      title="ChatGpt -3.5"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

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
                  : 'http://geek.itheima.net/uploads/1704791992026.blob'
              "
            />
          </div>

          <div class="title">{{ index % 2 == 0 ? 'You' : 'ChatGpt -3.5' }}</div>
        </div>
        <div class="msg">{{ item.msg }}</div>
      </van-cell>
    </van-cell-group>

    <!-- 底部对话框 -->
    <van-cell-group class="token">
      <van-field
        v-model="message"
        placeholder="请输入信息..."
        class="token-input"
      />
      <van-button type="primary" size="small" class="token-btn" @click="onSend"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utls/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // WebSocket通信对象
      messages: getItem('TOUTIAO_CHAT') || [] // 消息列表
    }
  },
  created () {
    // 建立连接
    const socket = io('http://geek.itheima.net', {
      query: {
        token: getItem('TOUTIAO_USER')[0]
      },
      transports: ['websocket']
    })

    this.socket = socket
    // 开始连接
    socket.on('connect', () => {
      console.log('连接建立成功')
    })
    // 断开连接
    socket.on('disconnect', () => {
      console.log('连接断开了')
    })
    // 接收消息
    socket.on('message', (data) => {
      // 用户接收的消息
      this.messages.push(data)
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSend () {
      console.log('点击发送')
      // 请求发送的数据
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 用户发送的消息
      this.messages.push(data)
      this.message = ''
    },
    // 列表滚动
    scrollBottom () {
      const list = this.$refs['talk-list']
      list.scrollTop = list.scrollHeight
    }
  },
  mounted () {
    this.scrollBottom()
  },
  watch: {
    messages () {
      // 监听到messages变化, 就触发该函数
      setItem('TOUTIAO_CHAT', this.messages)

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
