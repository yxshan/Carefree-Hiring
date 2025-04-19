<script setup lang="ts">
  import { defineProps, PropType } from 'vue';
  import { useRouter } from 'vue-router';
  import ProgressBar from '../ProgressBar.vue';
  // 定义item的类型
  interface ContractItem {
    contract_id: number;
    contract_name: string;
    is_contract_type_text: string;
    company_name: string;
    contract_type: string;
    start_cycle_time: string;
    end_cycle_time: string;
    signing_time: string;
    contract_I_state: number;
    contract_II_state: number;
    contract_III_state: number;
    contract_IIII_state: number;
  }
  const props = defineProps({
    contractList: {
      type: Array as PropType<ContractItem[]>,
      default: () => []
    }
  })
  const router = useRouter();
  const gotoDetail = (id:any)=>{
    router.push('/contract/details/' + id)
  }
</script>

<template>
  <dl v-for="(item, index) in contractList" :key="index" @click="gotoDetail(item.contract_id)">
    <dd>
      <h3>{{ item.contract_name }}</h3>
      <span>{{ item.is_contract_type_text }}</span>
      <van-icon name="arrow" />
    </dd>
    <dt>
      <label>公司名称</label>
      <span>{{ item.company_name }}</span>
    </dt>
    <dt>
      <label>合约类型</label>
      <span>{{ item.contract_type }}</span>                                                                         
    </dt>
    <dt>
      <label>合约周期</label>
      <span>{{ item.start_cycle_time }}-{{ item.end_cycle_time }}</span>
    </dt>
    <dt>
      <label>签约时间</label>
      <span>{{ item.signing_time }}</span>
    </dt>
    <dt>
      <label>合约进度</label>
      <span></span>
    </dt>
    <dt>
      <ProgressBar :item="item"></ProgressBar>
    </dt>
  </dl>
</template>

<style scoped>
  dl {
    font-size: 0.64rem;
    color: #666;
    padding: 1rem 0.7rem;
    border-bottom: 1px solid #eee;
  }
  dl dd {
    display: flex;
    margin-bottom: 0.9rem;
    align-items: center;
  }
  dl dd h3 {
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
    flex: 1;
  }
  dl dd span {
    text-align: right;
    font-size: 0.75rem;
    color: #ff9415;
  }
  dl dd i {
    font-size: 0.75rem;
  }
  dl dt {
    display: flex;
    margin-bottom: 0.72rem;
  }
  dl dt {
    display: flex;
    margin-bottom: 0.72rem;
  }
  dl dt:last-child{
    margin-bottom: 0;
  }
  dl dt label{
    flex: 1;
  }
  dl dt span {
    text-align: right;
  }
</style>