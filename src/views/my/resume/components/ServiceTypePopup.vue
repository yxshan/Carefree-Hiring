<script setup lang="ts">
  import {inject,reactive} from 'vue'
  import {myStore} from '@/store/my.ts'
  const { closeServiceType } = inject('popup')
  const store = myStore()
  const state = reactive({
    value: []
  })
</script>

<template>
  <van-nav-bar title="服务类型" left-arrow @click-left="closeServiceType('')"/>
  <van-checkbox-group v-model="state.value">
    <van-checkbox :name="item" shape="square" v-for="(item,index) in store.jobsType" :key="index">{{ item }}</van-checkbox>
  </van-checkbox-group>
  <button class="wy-submit" @click="closeServiceType(state.value)">保存</button>
</template>

<style scoped>
  .van-checkbox-group{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
</style>