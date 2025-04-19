<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { positionTypeList } from '@/api/task.ts';
  import { taskStore} from '@/store/task.ts';
  import { showToast } from 'vant';
  const { closePositionType } = inject('popup') as any;
  const store = taskStore();
  const leftBack = () => closePositionType();
  const state = reactive({
    typeKey: 0,
  })
  const setTypeKey = (key:number) => {
    state.typeKey = key
  }
  const getPositionTypeList = async () => {
    const res = await positionTypeList();
    if(res){
      store.setPositionTypeList(res);
    }else{
      showToast(res.msg);
    }
  }
  if(store.positionTypeList.length <= 0) getPositionTypeList();
</script>

<template>
  <van-nav-bar title="职位类型" left-arrow @click="leftBack" />
  <div class="position-type">
    <div class="position-type-left">
      <h5 :class="state.typeKey == index ? 'active' : ''" v-for="(item, index) in store.positionTypeList" :key="index" @click="setTypeKey(index)">{{ item.name }}</h5>
    </div>
    <div class="position-type-right">
      <span v-for="(item, index) in store.positionTypeList[state.typeKey] && store.positionTypeList[state.typeKey].children" :key="index" @click="closePositionType(item.name)">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>
  .position-type{
    display: flex;
  }
  .position-type-left {
    width: 4.77rem;
    height: calc(100vh - 46px);
    background: #f6f6f6;
  }
  .position-type-left h5{
    width: 4.77rem;
    height: 2.4rem;
    line-height: 2.4rem;
    background: #f6f6f6;
    border-bottom: 1px solid #fff;
    font-size: 0.75rem;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333;
    text-align: center;
  }
  .position-type-left h5.active {
    background: #efefef;
  }
  .position-type-right {
    padding: 0.8rem 0 0 0.6rem;
  }
  .position-type-right span {
    width: 6.61rem;
    height: 2.03rem;
    line-height: 2.03rem;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 0.11rem;
    font-size: 0.75rem;
    font-weight: 300;
    color: #666;
    text-align: center;
    margin-right: 0.59rem;
    margin-bottom: 0.64rem;
    display: inline-block;
  }
</style>