<script setup lang="ts">
  import { inject } from 'vue';
  import { cityList } from '@/api/task.ts';
  import { taskStore} from '@/store/task.ts';
  import { showToast } from 'vant';
  const { closeCitySwitch } = inject('popup') as any;
  const store = taskStore();
  const leftBack = () => closeCitySwitch();
  const getCityList = async () => {
    const res = await cityList();
    if(res) {
      store.setCityList(res);
    } else {
      showToast(res.msg);
    }
  }
  if(store.cityList.length <= 0) getCityList();
</script>

<template>
  <van-nav-bar title="城市切换" left-arrow @click="leftBack" />
  <div class="city-switch">
    <h3>当前城市：</h3>
    <div class="city-switch-text">
      <span>{{ store.cityValue }}</span>
    </div>
    <h3>切换城市：</h3>
    <div class="city-switch-text">
      <span v-for="(item, index) in store.cityList" :key="index" @click="closeCitySwitch(item.name)">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>
  .city-switch {
  padding: 0 0.7rem;
 }
  .city-switch h3 {
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #000;
    margin: 0.7rem 0 0.96rem;
  }
  .city-switch-text span {
    width: 4.06rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 0.11rem;
    font-size: 0.64rem;
    font-family: PingFang SC;
    text-align: center;
    font-weight: 400;
    color: #333;
    margin: 0 0.7rem 0.8rem 0;
    display: inline-block;
  }
  .city-switch-text span:nth-child() {
    color: #fff;
    background: #333;
  }
</style>