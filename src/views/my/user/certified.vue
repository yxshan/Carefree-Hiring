<script setup lang="ts">
  import {myStore} from '@/store/my'
  const store = myStore()
  const gotoBack = () => history.back()
</script>
<template>
    <van-icon class="back" name="arrow-left" @click="gotoBack" />
    <img class="cert-pic" src="@/assets/img/my/auth-real-certified.png" />
    <h5>已完成实名认证</h5>
    <van-field :model-value="store.userInfo.real_name" label="姓名" readonly placeholder="请输入真实姓名" />
    <van-field :model-value="store.userInfo.idcard" label="证件号码" readonly placeholder="请输入证件号码" />
    <div class="cert-bottom">
      <img src="@/assets/img/my/auth-real-safe.png" />
      <p>信息安全保护中，未经您授权不对外提供</p>
    </div>
</template>
<style scoped>
  >>> .van-field__control {
    text-align: right;
  }
  h5 {
    font-size: 0.94rem;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 13.5rem;
  }
  .back {
    position: absolute;
    top: 1rem;
    left: 0.69rem;
    font-size: 1rem;
    color: #ffffff;
  }
  .cert-pic {
    width: 100%;
  }
  .cert-bottom {
    text-align: center;
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
  }
  .cert-bottom img {
    width: 0.93rem;
    height: 1.07rem;
    margin-bottom: 0.72rem;
  }
  .cert-bottom p {
    font-size: 0.61rem;
    line-height: 0.61rem;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }
</style>