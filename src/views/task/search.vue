<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { hotSearch, taskAllList } from '@/api/task.ts';
  import { taskStore } from '@/store/task.ts';
  import TaskList from '@/components/list/TaskList.vue'
  import { showToast } from 'vant';
  const store = taskStore();
  const router = useRouter();
  const taskId = router.currentRoute.value.params.id;
  const searchHistory = localStorage.getItem('searchHistory');
  const state = reactive({
    value: '',
    searchFlag: false,
    loading: false,
    taskList: [],
    searchHistory: searchHistory ? searchHistory.split(',') : [],
    pageNum: 0,
    pageSize: 10,
    finished: false,
  })
  const leftBack = () => history.back();
  const onSearch = (value: string) => {
    if(!value) return;
    state.searchFlag = true;
    if(!state.searchHistory.includes(value)) {
      state.searchHistory.push(value);
      localStorage.setItem('searchHistory', state.searchHistory.join(','));
    }
    getTalkAllList();
  };
  const onCancel = () => {
    state.searchFlag = false;
    state.value = '';
  };
  const gotoSearch = (item: string) => {
    state.value = item;
    onSearch(item);
  };
  const clearHistory = () => {
    state.searchHistory = [];
    localStorage.removeItem('searchHistory');
  };
  const getHotSearch = async () => {
    const res = await hotSearch({
      type: 1,
    });
    if(res) {
      store.setHotSearchList(res.data);
    } else {
      showToast(res.msg);
    }
  }
  if(store.hotSearchList.length <= 0) {
    getHotSearch();
  }
  const getTalkAllList = async () => {
    state.loading = true;
    if(state.pageNum == 1){
      state.taskList = [];
    }
    const res = await taskAllList({
      "position_name": state.value, 
      "pageNum": state.pageNum, 
      "pageSize": state.pageSize,  
    });
    if(res) {
      state.taskList = res.records.filter((item:any) => {
        return (item.position_name === state.value) 
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
  const onLoad = () => {
    state.pageNum = state.pageNum + 1;
    getTalkAllList();
  }
  const onRefresh = () => {
    state.pageNum = 1;
    getTalkAllList();
  }
</script>

<template>
<div :class="state.searchFlag ? 'search-page' : ''">
  <van-nav-bar title="搜索" left-arrow @click="leftBack" />
  <div class="search-cont">
    <van-search
      v-model="state.value"
      show-action
      placeholder="请输入搜索的职位"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="search-item" v-if="!state.searchFlag">
      <h3>搜索历史<van-icon name="delete-o" @click="clearHistory"/></h3>
      <dl>
        <dt v-for="(item, index) in state.searchHistory" :key="index" @click="gotoSearch(item)">{{ item }}</dt>
      </dl>
      <h3>热门搜索</h3>
      <dl>
        <dt v-for="(item, index) in store.hotSearchList" :key="index" @click="gotoSearch(item.title)">{{ item.title }}</dt>
      </dl>
    </div>
    <div class="search-list" v-show="state.searchFlag">
      <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
        <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text=""
        @load="onLoad"
        >
          <TaskList :taskList="state.taskList"></TaskList>
          <div class="wy-no-data" v-if="!state.loading && state.taskList.length == 0">暂无数据</div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</div>
</template>

<style scoped>
  .search-page{
    background: #F9F9F9;
    height: 100%;
    min-height: 100vh;
  }
  .search-page .van-nav-bar{
    background: none;
  }
  >>> .van-search__content{
    background: #F2F2F2;
    border-radius: 0.85rem;
  }
  >>> .van-search--show-action{
    padding-left: 0px;
    background: none;
  }
  >>> .van-search__action{
    font-size: 0.85rem;
    font-weight: 400;
    color: #666666;
    padding-right: 0px;
  }
  .search-cont{
    padding:0 0.64rem;
  }
  h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #000000;
    margin: 0.85rem 0 0.85rem;
    display: flex;
  }
  h3 i{
    flex: 1;
    text-align: right;
    font-size: 0.9rem;
  }
  dl dt{
    background: #F5F5F5;
    border-radius: 0.16rem;
    padding: 0.45rem;
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 400;
    color: #333333;
    margin-right: 0.51rem;
    margin-bottom: 0.53rem;
    display: inline-block;
  }
</style>