<script setup lang="ts">
  import { reactive,provide } from 'vue';
  import { myStore } from '@/store/my.ts'
  import UserInfoPage from '../../components/UserInfoPage.vue'
  const store = myStore()
  const state = reactive({
    show: false
  })
  const props = defineProps({
    item: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: String,
      default: ''
    }
  })
  const closeChange = () => {
    state.show = false
    store.getResumeDetail()
  }
  provide('popup',{
    closeChange
  })
</script>

<template>
  <div class="person-info">
    <div class="info-left">
      <h3>{{ props.item.user_name }}<img src="@/assets/img/my/icon-feedback.png" @click="state.show = true" v-if="props.page !== 'preview'" /></h3>
      <p>{{ props.item.work_year }} ｜ {{ props.item.highest_education }} ｜ {{ props.item.age }}</p>
    </div>
    <img :src="props.item.it_head" />
  </div>
  <van-popup v-model:show="state.show" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
    <UserInfoPage></UserInfoPage>
  </van-popup>
</template>

<style scoped>
  .person-info{
    padding: 0.99rem 0 1.41rem;
    margin: 0 0.72rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F3F3F3;
  }
  .person-info img{
    width: 3.19rem;
    height: 3.19rem;
    border-radius: 50%;
  }
  .info-left h3{
    font-size: 1.28rem;
    line-height: 1.28rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.64rem;
    display: flex;
    align-items: flex-end;
  }
  .info-left img{
    width: 1rem;
    height: 1rem;
    margin-left: 0.32rem;
  }
  .info-left p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 300;
    color: #666666;
  }
</style>