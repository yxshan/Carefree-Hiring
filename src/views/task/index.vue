<script setup lang="ts">
  import { reactive,provide } from 'vue'; 
  import { useRouter } from 'vue-router';
  import FooterTabbar from '@/components/FooterTabbar.vue'
  import TaskList from '@/components/list/TaskList.vue';
  import Banner from './components/Banner.vue';
  import CitySwitch from './components/CitySwitch.vue';
  import PositionType from './components/PositionType.vue';
  import Screen from './components/Screen.vue';
  import { taskStore } from '@/store/task.ts';
  import { taskAllList } from '@/api/task.ts';
  import { showToast } from 'vant';
  const router = useRouter();
  const store = taskStore();
  interface State {
    citySwitchBool: boolean;
    positionTypeBool: boolean;
    screenBool: boolean;
    positionTypeValue: string;
    serviceMode: string;
    taskCycle: string;
    pageNum: number;
    pageSize: number;
    finished: boolean;
    loading: boolean;
    taskList: any[]; 
  }
  const state: State = reactive({
    citySwitchBool: false,
    positionTypeBool: false,
    screenBool: false,
    positionTypeValue: '',
    serviceMode: '',
    taskCycle: '',
    pageNum: 0,
    pageSize: 10,
    finished: false,
    loading: false,
    taskList: [],
  });
  const getTalkAllList = async () => {
    state.loading = true;
    if(state.pageNum == 1){
      state.taskList = [];
    }
    const res = await taskAllList({
      "position_name": state.positionTypeValue, 
      "service_mode": state.serviceMode, 
      "task_cycle": state.taskCycle, 
      "pageNum": state.pageNum, 
      "pageSize": state.pageSize, 
      "city": store.cityValue, 
    });
    if(res) {
      // for(let i = 1; i <= state.pageSize; i++) {
      //   if(res.records[i * state.pageNum - 1]) {
      //     state.taskList = state.taskList.concat(res.records[i * state.pageNum - 1]);
      //   }
      // }
      let filterA = state.positionTypeValue; 
      let filterB = state.serviceMode;   
      let filterC = state.taskCycle; 
      let filterD = store.cityValue;
      state.taskList = res.records.filter((item:any) => {
        return (filterA === "" || item.position_name  === filterA) &&
               (filterB === "" || item.service_mode === filterB) &&
               (filterC === "" || item.task_cycle === filterC)  &&
               (filterD === "" || item.city === filterD);
      });   
      state.loading = false;
      if(state.taskList.length >= res.count) {
        state.finished = true;
      } else {
        state.finished = false;
      }
    }else{
      showToast(res.msg);
      state.loading = false;
    }
  }
  const gotoSearch = () => {
    router.push('/task/search')
  }
  const onLoad = () => {
    state.pageNum = state.pageNum + 1;
    getTalkAllList();
  }
  const onRefresh = () => {
    state.pageNum = 1;
    getTalkAllList();
  }
  const closeCitySwitch = (name:string) => {
    if(name) {
      store.setCityValue(name);
      onRefresh();
    }
    state.citySwitchBool = false;
  }
  const closePositionType = (name:string) => {
    if(name) {
      state.positionTypeValue = name;
      onRefresh();
    }
    state.positionTypeBool = false;
  }
  interface ScreenOptions {
    mode: string;
    cycle: string;
  }
  const closeScreen = (obj:ScreenOptions) => {
    if(obj){
      state.serviceMode = obj.mode;
      state.taskCycle = obj.cycle;
      onRefresh();
    }
    state.screenBool = false
  }
  provide('popup', {
    closeCitySwitch,
    closePositionType,
    closeScreen,
  })
</script>

<template>
  <div class="task-page">
    <div class="task-top"> 
      <div class="task-top-city" @click="state.citySwitchBool = true">
        <i></i>
        <strong>{{ store.cityValue }}</strong>
        <span></span>
      </div>
      <input type="text" @click="gotoSearch" readonly placeholder="请输入想要搜索的内容" />
      <router-link to="/message/systemList" class="task-icon-message"></router-link>
    </div>
    <Banner type="2"></Banner>
    <div class="task-title">
      <h3>最新任务</h3>
      <div class="task-position-pop" @click="state.positionTypeBool = true">{{ state.positionTypeValue ||'职位类型' }}<span></span></div>
      <div class="task-screen-pop" @click="state.screenBool = true">筛选<span></span></div>
    </div>
    <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
      <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text=""
      @load="onLoad"
      >
        <TaskList :taskList="state.taskList"></TaskList>
        <div class="wy-no-data" v-if="!state.loading && state.taskList.length==0">暂无数据</div>
      </van-list>
    </van-pull-refresh>
    <!-- 切换城市弹窗 -->
    <van-popup v-model:show="state.citySwitchBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
      <CitySwitch></CitySwitch>
    </van-popup>
    <!-- 职位类型弹窗 -->
    <van-popup v-model:show="state.positionTypeBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
      <PositionType></PositionType>
    </van-popup>
    <!-- 筛选弹窗 -->
    <van-popup v-model:show="state.screenBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
      <Screen></Screen>
    </van-popup>
  </div>
  <FooterTabbar></FooterTabbar>
</template>

<style scoped>
  .task-page {
  background: #f9f9f9;
  padding: 0 0.59rem 3rem;
  /* 设置任务页面的最小高度，减去底部的3rem（可能是底部栏的高度），以确保页面内容在底部栏之上显示 */
  min-height: calc(100vh - 3rem);
 }
 .task-top {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
 }
 .task-top-city {
  display: flex;
  align-items: center;
 }
 .task-top-city i {
  width: 1.04rem;
  height: 1.04rem;
  background: url('@/assets/img/icon/icon-place.png') no-repeat;
  background-size: 100%;
 }
 .task-top-city strong {
  font-size: 0.8rem;
  font-weight: 500;
  color: #333;
  margin-left: 0.1rem;
 }
 .task-top-city span {
  margin: 0 0.6rem 0 0.2rem;
  display: inline-block;
  border-left: 0.18rem solid transparent;
  border-right: 0.18rem solid transparent;
  border-top: 0.36rem solid #333;
 }
 .task-top input {
  flex: 1;
  height: 1.71rem;
  background: #fff url('@/assets/img/icon/icon-search.png') 0.35rem 0.35rem no-repeat;
  background-size: 3%;
  border: 0.03px solid #ededed;
  border-radius: 0.85rem;
  font-size: 0.69rem;
  font-weight: 300;
  color: #999;
  padding-left: 1.7rem;
 }
 .task-icon-message {
  width: 1.31rem;
  height: 1.28rem;
  background: url('@/assets/img/icon/icon-remind.png') no-repeat;
  background-size: 100%;
  margin-left: 0.27rem;
 }
 .task-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.67rem;
  margin-top: 1.44rem;
 }
 .task-title h3 {
  flex: 1;
  font-size: 0.96rem;
  line-height: 0.96rem;
  font-weight: bold;
  color: #333;
 }
 .task-position-pop,.task-screen-pop {
  font-size: 0.75rem;
  line-height: 0.96rem;
  font-weight: 300;
  color: #666;
  margin-left: 0.56rem;
 }
.task-position-pop span,.task-screen-pop span {
  display: inline-block;
  border-left: 0.18rem solid transparent;
  border-right: 0.18rem solid transparent;
  border-top: 0.36rem solid #333;
  margin-left: 0.25rem;
 }
</style>  