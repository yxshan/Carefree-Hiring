<script setup lang="ts">
  import { reactive } from 'vue'
  import { contractList } from '@/api/contract.ts'
  import ContractList from '@/components/list/ContractList.vue'
  import { showToast } from 'vant';
  import { myStore } from '@/store/my.ts'
  const store = myStore()
  if(!store.userInfo.role){
    await store.getUserInfo()
  }
  const tabs = [
    {
      type: 2,
      text: store.userInfo.role == 3 ? '待确认' : '待签约'
    },
    {
      type: 3,
      text: '履约中'
    },
    {
      type: 4,
      text: '已完成'
    },
    {
      type: 5,
      text: '已失效'
    },
  ]
  const props = defineProps({
    type: {
      type: String
    }
  })
  // 企业端
  if(store.userInfo.role == 3){
    tabs.unshift({
      type: 1,
      text: '待发送'
    })
  }
  if(props.type === '0') {
    tabs.unshift({
      type: 0,
      text: '全部'
    })
  }
  const state = reactive({
    loading: false,
    type: props.type || tabs[0].type,
    list: [],
    acitveIndex: 0
  })
  const setTabList = (type:string) => {
    if(type === state.type) return
    state.type = type
    getContractList()
  }
  const getContractList = async () => {
    state.loading = true
    const res = await contractList({
      is_contract_type: state.type,
      curr_identity: store.userInfo.role
    })
    if(res) {
      state.list = res.records
    } else {
      showToast(res.msg)
    }
    state.loading = false
    state.acitveIndex++
  }
  getContractList()
</script>

<template>
    <div class="contract-tab">
      <span v-for="(item,index) in tabs" :class="Number(state.type) === item.type ? 'active' : ''" :key="index" @click="setTabList(String(item.type))">{{item.text}}<i></i></span>
    </div>
    <van-pull-refresh v-model="state.loading" @refresh="getContractList">
      <ContractList :contractList="state.list"></ContractList>
      <van-loading v-if="state.acitveIndex === 0 && state.loading">加载中...</van-loading>
      <div class="wy-no-data" v-if="!state.loading && state.list.length === 0">暂无数据</div>
    </van-pull-refresh>
    <router-link v-if="store.userInfo.role == 3" to="/my/contract/add">
      <button class="wy-submit">新建合约</button>
    </router-link>
</template>

<style scoped>
  .van-pull-refresh{
    height: calc(100vh - 46px - 5rem);
    overflow: auto;
  }
  .contract-tab{
    display: flex;
  }
  .contract-tab span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #666666;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    padding: 0.59rem 0;
    text-align: center;
    position: relative;
  }
  .contract-tab span.active{
    color: #FF9415;
  }
  .contract-tab span.active i{
    width: 1.63rem;
    height: 0.05rem;
    background: #FF9415;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -0.815rem;
  }
</style>