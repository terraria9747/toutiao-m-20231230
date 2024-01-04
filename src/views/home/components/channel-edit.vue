<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false" class="cell-box">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="editbtn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="grid-box">
      <van-grid-item
        v-for="(Channel, index) in myChannel"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(Channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(Channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          Channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell class="cell-box">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="grid-box">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="channelChange(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// 导入获取频道数据的API
import { allchannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utls/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannel: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allchannel: [], // 所有频道
      isEdit: false, // 控制删除按钮的显示
      fiexChannels: [0], // 不允许删除的数据 -| 0: 推荐 |
    }
  },
  computed: {
    ...mapState(['user']),

    // 推荐频道 = 所有频道 - 我的频道
    recommendChannels() {
      // 遍历所有频道, 符合条件的数据返回
      return this.allchannel.filter((allChannelItem) => {
        // 遍历我的频道, 符合条件的数据返回
        return !this.myChannel.find((myChannelItem) => {
          // 我的频道和所有频道的数据相等的数据过滤掉
          return myChannelItem.id === allChannelItem.id
        })
      })
    },
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await allchannel()
        this.allchannel = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },

    // 频道推荐 -> 我的频道
    async channelChange(channel) {
      // 当前点击的 |频道推荐| 推送到 |我的频道| --> 重新执行计算属性
      this.myChannel.push(channel)

      // 是否登录
      if (this.user) {
        console.log('用户登录了')
        // 登录
        try {
          await addUserChannel({
            id: channel.id, // 频道Id
            seq: this.myChannel.length, // 序号
          })
        } catch (err) {
          this.$toast('添加频道失败, 请稍等后重试')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNEL', this.myChannel)
      }
    },

    // 我的频道的点击事件 删除 | 切换
    onMyChannelClick(Channel, index) {
      if (this.isEdit === true) {
        // 固定频道不删除
        if (this.fiexChannels.includes(Channel.id)) {
          return
        }

        // 删除频道
        this.myChannel.splice(index, 1)

        // 删除当前项的之前频道
        if (index <= this.active) {
          this.$emit('change_active', this.active - 1, true)
        }

        // 发起请求
        this.deleteChannel(Channel)
      } else {
        // 切换频道
        this.$emit('change_active', index, false)
      }
    },

    async deleteChannel(Channel) {
      if (this.user) {
        try {
          await deleteUserChannel(Channel.id)
        } catch (err) {
          this.$toast('删除频道失败, 请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNEL', this.myChannel)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 88px;
  // 单元格
  .cell-box {
    // 标题
    .title {
      font-size: 32px;
      color: #333333;
    }
    // 编辑按钮
    .editbtn {
      font-size: 26px;
      height: 48px;
      width: 104px;
    }
  }
  // 宫格部分
  /deep/ .grid-box {
    .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        background-color: #f4f5f6;
        flex-direction: row;
        // 文字
        .van-grid-item__text {
          color: #222222;
          font-size: 28px;
          margin: 0 0 0 6px;
          white-space: nowrap;
        }
        .text {
          color: #222222;
          font-size: 28px;
          margin: 0 0 0 6px;
          white-space: nowrap;
        }
        .active {
          color: #f85a5a;
        }
        // + 图标
        .van-icon {
          font-size: 24px;
        }
        // × 图标
        .van-icon-clear {
          position: absolute;
          color: #d3d0d2;
          font-size: 30px;
          top: -15px;
          right: -15px;
          z-index: 2;
        }

        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }
    }
  }
}
</style>
