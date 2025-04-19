<script setup lang="ts">
  import { reactive,provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { contractDetail } from '@/api/contract';
  import ProgressBar from '@/components/ProgressBar.vue'
  import ProgressEvaluation from './components/ProgressEvaluation.vue'
  import { showToast } from 'vant';
  import { userStore } from '@/store/user'
  const store = userStore();
  const router = useRouter();
  const contractId = router.currentRoute.value.params.id as string;
  interface ContractDetailItem {
    contract_id: number;
    logo: string;
    company_name: string;
    create_user_name: string;
    it_head: string;
    position_name: string;
    sex: number;
    work_year: string;
    highest_education: string;
    age: string;
    is_contract_type_text: string;
    contract_name: string;
    contract_type: string;
    task_salary: number;
    start_cycle_time: string;
    end_cycle_time: string;
    signing_time: string;
    check_out: string;
    task_ask: string;
    settle_salary: number;
    is_contract_type: number;
    contract_I_state: number;
    contract_II_state: number;
    contract_III_state: number;
    contract_IIII_state: number;
    contract_I_stage: string;
    contract_II_stage: string;
    contract_III_stage: string;
    contract_IIII_stage: string;
  }
  const state = reactive({
    item: {} as ContractDetailItem,
    num: '',
    evaluationBoll: false,
    loading: false
  })
  const leftBack = () => history.back();
  const getContractDetail = async () => {
    state.loading = true
    const res = await contractDetail({
      id: contractId
    })
    if(res) {
      state.item = res.records[0]
    } else {
      showToast(res.msg)
    }
    state.loading = false
  }
  const evaluation = (num:string) => {
    state.num = num
    state.evaluationBoll = true
  }
  const closeEvaluation = (bool:boolean) => {
    if(bool){
      getContractDetail()
    }
    state.evaluationBoll = false
  }
  getContractDetail()
  provide('popup',{
    closeEvaluation
  })
</script>

<template>
  <van-nav-bar title="合约进度" left-arrow @click-left="leftBack"></van-nav-bar>
  <div v-if="state.item">
    <h3>{{ state.item.contract_name }}</h3>
    <div class="progress-bar">
      <ProgressBar :item="state.item"></ProgressBar>
      <div class="progress-bar-text">
        <span>第一阶段</span>
        <span>第二阶段</span>
        <span>第三阶段</span>
        <span>第四阶段</span>
      </div>
    </div>
    <dl>
      <dt>
        <h4>第一阶段开发进度评估
          <span v-if="state.item.contract_I_state == -1 && store.role != 3">暂无评估</span>
          <span class="active" v-if="state.item.contract_I_state == -1 && store.role == 3" @click="evaluation('1')">去评估</span>
        </h4>
        <p v-if="state.item.contract_I_stage">{{ state.item.contract_I_stage }}</p>
      </dt>
      <dt>
        <h4>第二阶段开发进度评估
          <span v-if="state.item.contract_II_state == -1 && store.role != 3">暂无评估</span>
          <span class="active" v-if="state.item.contract_II_state == -1 && store.role == 3" @click="evaluation('2')">去评估</span>
        </h4>
        <p v-if="state.item.contract_II_stage">{{ state.item.contract_II_stage }}</p>
      </dt>
      <dt>
        <h4>第三阶段开发进度评估
          <span v-if="state.item.contract_III_state == -1 && store.role != 3">暂无评估</span>
         <span class="active" v-if="state.item.contract_III_state == -1 && store.role == 3" @click="evaluation('3')">去评估</span>
        </h4>
        <p v-if="state.item.contract_III_stage">{{ state.item.contract_III_stage }}</p>
      </dt>
      <dt>
        <h4>第四阶段开发进度评估
          <span v-if="state.item.contract_IIII_state == -1 && store.role != 3">暂无评估</span>
          <span class="active" v-if="state.item.contract_IIII_state == -1 && store.role == 3" @click="evaluation('4')">去评估</span>
        </h4>
        <p v-if="state.item.contract_IIII_stage">{{ state.item.contract_IIII_stage }}</p>
      </dt>   
    </dl>
  </div>
  <van-loading v-if="!state.item">加载中...</van-loading>
  <van-popup v-model:show="state.evaluationBoll" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
    <ProgressEvaluation :num="Number(state.num)" :id="contractId"></ProgressEvaluation>
  </van-popup>
</template>

<style scoped>
  h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    padding:1.2rem 0.69rem 1rem;
  }
  .progress-bar{
    margin: 0 0.64rem 1.17rem;
  }
  .progress-bar-text{
    display: flex;
  }
  .progress-bar-text span{
    flex: 1;
    text-align: right;
    margin: 0 1px;
    padding-top: 0.45rem;
  }
  dl{
    margin: 0 0.64rem;
  }
  dl dt{
    border: 1px solid #EDEDED;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
    padding: 0.75rem 0.69rem;
  }
  dl dt h4{
    display: flex;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #666666;
  }
  dl dt h4 span{
    flex: 1;
    text-align: right;
    font-size: 0.64rem;
    font-weight: 500;
    color: #ACACAC;
  }
  dl dt h4 span.active{
    color: #FF9415;
  }
  dl dt p{
    font-size: 0.64rem;
    font-weight: 400;
    color: #333333;
    line-height: 0.8rem;
    margin-top: 0.77rem;
  }
</style>