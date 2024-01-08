<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="postPhoto">完成</div>
    </div>
  </div>
</template>

<script>
// 导入裁剪相关样式和js文件
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  // mounted一般在初始化页面完成后
  mounted () {
    const img = this.$refs.img
    this.cropper = new Cropper(img, {
      viewMode: 1, // 查看模式
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 图像比例
      autoCropArea: 1, // 自动对焦
      cropBoxMovable: false, // 拖动框不移动
      cropBoxResizable: false, // 截图区不缩放
      background: false, // 背景颜色
      movable: true // 背景图像是否可以移动
    })
  },
  methods: {
    postPhoto () {
      // 基于服务端的裁切 使用getData方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切文件
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updatePhoto(blob)
      })
    },
    async updatePhoto (blob) {
      try {
        // 加载效果
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 加载时间 0 --> 一直加载
        })

        // 准备数据
        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则必须传递 FormData对象
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)

        // 更新图片成功
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('头像更新成功')
      } catch (err) {
        this.$toast.fail('头像更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #010001;
  height: 100%;
  img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
}
</style>
