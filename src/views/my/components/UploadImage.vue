<script setup lang="ts">
  import { reactive } from 'vue'
  import { uploadImage } from '@/api/my.ts'
  const state = reactive({
    fileList: [] as any[]
  })
  const props = defineProps({
    text: {
      type: String,
      default: ''
    }
  })
  const emits = defineEmits(['uploadChange'])
  const deleteFile = () => {
    state.fileList = []
  }
  const afterRead = async (file:any) => {
    file.status = 'uploading'
    file.message = '上传中...'
    let param = new FormData()
    param.append('user','test')
    param.append('file',file.file)
    const res = await uploadImage(param)
    file.url = res.imageUrl
    file.status = 'done'
    file.message = '上传成功'
    state.fileList = [file]
    emits('uploadChange',res.imageUrl)
  }
</script>

<template>
  <div>
    <van-uploader v-model="state.fileList" accept=".jpg,.png" 
      :after-read="afterRead" 
      :before-delete ="deleteFile"
      max-count="1" 
    />
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped>
  >>> .van-uploader__upload {
    background: url('@/assets/img/my/auth-real-pic.png') no-repeat;
    background-size: 100%;
    width: 7.6rem;
    height: 5.2rem;
    margin: 0;
  }
  >>> .van-uploader__preview-image, >>> .van-uploader__preview {
    width: 7.6rem;
    height: 5.2rem;
  }
  >>> .van-uploader__upload-icon {
    display: none; 
  }
  p {
    text-align: center;
    margin-top: 0.91rem;
  }
</style>