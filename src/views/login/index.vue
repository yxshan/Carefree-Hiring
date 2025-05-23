<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter} from 'vue-router';
  import { getCode, login } from '@/api/user.ts';
  import { userStore } from '@/store/user.ts';
  import { showToast } from 'vant';
  const store = userStore();
  const router = useRouter();
  const state = reactive({
    checked: true,
    accounts: '',
    code: '',
    codeText: '获取验证码',
    time: 60,
    interTimeCode: 0
  }); 
  const getCodeChange = async () => {
    if(state.interTimeCode) return;
    if(!state.accounts) {
      showToast('请输入手机号');
      return;
    }
    if(state.accounts.length < 11) {
      showToast('请输入正确的手机号');
      return;
    }
    const res = await getCode({
      accounts: state.accounts
    });
    if(res) {
      // 验证码倒计时
      state.interTimeCode = setInterval(() => {
        state.time--;
        if(state.time <= 0) {
          clearInterval(state.interTimeCode);
          state.time = 60;
          state.codeText = '获取验证码';
          state.interTimeCode = 0;
        } else {
          state.codeText = `重新发送（${state.time}s）`;
        }
      },1000)
      // 手机接收采用接口返回
      state.code = res.code;
    }
  }
  const loginSubmit = async () => {
    if(!state.code) {
      showToast('请输入验证码');
      return;
    }
    if(!state.checked) {
      showToast('请勾选同意');
      return;
    }
    const res = await login({
      accounts: state.accounts,
      code: state.code
    });
    if(res.errCode === 200) {
      // 登陆成功后需要把登录返回的数据存储到store
      store.setUserInfo(res.data);
      if(store.role == 1) {
        router.push('/task');
      } 
      if(store.role == 3){
        router.push('/talent');
      }
    } else {
      showToast(res.msg);
    }
  }
</script>

<template>
  <div>
    <van-icon class="icon-left" name="arrow-left"  />
    <div class="login-form">
      <h3>验证码登录</h3>
      <div class="login-form-item">
        <i class="icon-phone"></i>
        <input placeholder="请输入手机号" v-model="state.accounts" type="text" />
      </div>
      <div class="login-form-item">
        <i class="icon-code"></i>
        <input placeholder="请输入验证码" v-model="state.code" type="text" />
        <span @click="getCodeChange">{{ state.codeText }}</span>
      </div>
      <van-button type="primary" block @click="loginSubmit">登录</van-button>
      <div class="login-form-label">
        <van-checkbox v-model="state.checked" checked-color="#FE9527">我已阅读</van-checkbox>
        <router-link to="/login/serviceAgree">《IT企业平台服务协议》</router-link>和
        <router-link to="/login/privacyPolicy">《隐私政策》</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-left{
  font-size: 0.8rem;
  margin: 0.67rem 0 0 0.67rem;
}
.login-form{
  padding: 0 1.07rem;
}
.login-form h3{
  font-size: 1.39rem;
  line-height: 1.39rem;
  font-weight: 400;
  color: #333333;
  margin-top: 2.35rem;
  margin-bottom: 4rem;
  padding-left: 0.3rem;
}
.login-form-item{
  display: flex;
  font-size: 0.75rem;
  font-weight: 300;
  color: #9FA7AD;
  margin: 0 0.18rem 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E7E7E7;
  align-items: center;
}
.icon-phone{
  background: url('@/assets/img/icon/icon-phone.png') no-repeat;
  background-size: 100%;
  width: 1.01rem;
  height: 1.01rem;
}
.icon-code{
  background: url('@/assets/img/icon/icon-code.png') no-repeat;
  background-size: 100%;
  width: 1.01rem;
  height: 1.01rem;
}
.login-form-item input{
  flex: 1;
  margin-left: 0.48rem;
}
.login-form-item span{
  font-size: 0.75rem;
  font-weight: 300;
  color: #FE9527;
  border-left: 1px solid #FE9527;
  line-height: 0.75rem;
  padding-left: 0.56rem;
}
.van-button--primary {
  background: linear-gradient(90deg, #FEA829, #FE8F27);
  border-radius: 1.17rem;
  border: none;
  font-size: 0.96rem;
}
.login-form-label{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  width: 100%;
}
</style>