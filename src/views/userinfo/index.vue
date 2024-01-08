<template>
  <div class="userinfo-container">
    <!-- 头部导航 -->
    <van-nav-bar title="个人信息">
      <van-icon
        slot="left"
        name="arrow-left"
        class="icon"
        @click="$router.back()"
      />
    </van-nav-bar>

    <!-- 修改信息部分 -->
    <van-cell-group inset>
      <van-cell title="头像" is-link>
        <input type="file" ref="file" hidden @change="onFileChange" />
        <van-image
          round
          class="user-img"
          :src="user.photo"
          @click="$refs.file.click()"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="showPopup = true"
      />
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="showGenderPopup = true"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="showBirthdayPopup = true"
      />
    </van-cell-group>

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '250px' }"
    >
      <update-name
        v-if="showPopup"
        @close="showPopup = false"
        v-model="user.name"
      />
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup v-model="showGenderPopup" position="bottom">
      <update-gender
        v-if="showGenderPopup"
        @close="showGenderPopup = false"
        v-model="user.gender"
      />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup v-model="showBirthdayPopup" position="bottom">
      <update-birthday
        v-if="showBirthdayPopup"
        @close="showBirthdayPopup = false"
        v-model="user.birthday"
      />
    </van-popup>

    <!-- 修改头像弹出层 -->
    <van-popup
      v-model="showImgPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="showImgPopup"
        @close="showImgPopup = false"
        :img="img"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import updateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserInfo',
  data () {
    return {
      user: {}, // 用户信息
      showPopup: false, // 修改昵称弹出层
      showGenderPopup: false, // 修改性别弹出层
      showBirthdayPopup: false, // 修改生日弹出层
      showImgPopup: false, // 修改头像弹出层
      img: null
    }
  },
  components: {
    updateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created () {
    this.loadingUserInfo()
  },
  methods: {
    async loadingUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('获取个人信息失败')
      }
    },

    // 获取头像文件的信息
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 显示弹框
      this.showImgPopup = true
      // 注意, 选择同一个图片, 不会触发change事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo-container {
  // 头部导航
  .icon {
    color: #fff;
    font-size: 26px;
  }

  .user-img {
    width: 70px;
    height: 70px;
  }

  // 修改姓名弹出框背景色
  .van-popup {
    background-color: #f6f7fa !important;
  }

  /deep/ .field {
    padding: 20px;
  }
}
</style>
