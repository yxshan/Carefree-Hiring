<script setup lang="ts">
  import { reactive, onBeforeUnmount, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { messageStore } from '@/store/message';
  import { chatMessageContent } from '@/api/message';
  import TalkWords from './components/TalkWords.vue';
  import TalkEmoji from './components/TalkEmoji.vue';
  import { showToast } from 'vant';
  const store = messageStore();
  const router = useRouter();
  const taskId = router.currentRoute.value.params.taskId;
  const userId = router.currentRoute.value.params.userId;
  interface ChatMessageItem {
    id: number;
    title: string;
    content: string;
    create_time: string;
    is_show: boolean;
    things_id: string;
    receive_id: string;
    receive_is_read: string;
    senderPhoto: string;
    receivePhoto: string;
    text: string;
  }
  const state = reactive({
    list: []  as ChatMessageItem[],
    loading: false as boolean,
    value: '' as string,
    taskName: '' as string,
    createSetInterval: 0 || null  as number | null,
    worksVisible: false as boolean,
    emojiVisible: false as boolean,
  });
  const leftBack = () => history.back();
  const getChatMessageContent = async () => {
    state.loading = true;
    const res = await chatMessageContent({
      receive_id: userId,
      things_id: taskId,
      things_type: 0,
    });
    if (res) {
      state.list = res.data;
      state.taskName = res.data[0] && res.data[0].task_name || '任务';
    } else {
      showToast(res.msg);
    }
    state.loading = false;
  };
  getChatMessageContent();
  const sendSubmit = async () => {
    state.loading = true;
    const res = await chatMessageContent({
      receive_id: userId,
      things_id: taskId,
      things_type: 0,
    });
    if(res) {
      getChatMessageContent();
      state.value = '';
    }
    showToast(res.msg);
  };
  const createInterval = () => {
    stopSetInterval();
    state.createSetInterval = setInterval(()=>{
      getChatMessageContent();
    },5000)
  }
  const stopSetInterval = () => {
    if(state.createSetInterval){
      clearInterval(state.createSetInterval);
      state.createSetInterval = null;
    }
  }
  onBeforeUnmount(() => {
    stopSetInterval();
  })
  createInterval();
  const worksClick = () => {
    state.emojiVisible = false;
    state.worksVisible = !state.worksVisible;
  }
  const emojiClick = () => {
    state.worksVisible = false;
    state.emojiVisible = !state.emojiVisible;
  }
  const worksChange = (value:any) => {
    state.value = value;
    state.worksVisible = false;
  }
  const emojiChange = (value:any) => {
    state.value = state.value + value;
    state.emojiVisible = false;
  }
  provide('popup',{
    worksChange,
    emojiChange
  })
</script>

<template>
  <van-nav-bar :title="state.taskName" left-arrow @click-left="leftBack"></van-nav-bar>
  <div class="talk-page">
    <dl>
      <dt v-for="(item,index) in state.list" :key="index" :class="item.receive_id === userId ? 'active' : ''">
        <h5>{{ item.create_time }}</h5>
        <div>
          <img v-if="item.receive_id === userId" :src="item.senderPhoto" alt="">
          <img v-else :src="item.receivePhoto" alt="">
          <p>{{ item.text }}</p>
        </div>
      </dt>
    </dl>
  </div>
  <div class="talk-bottom">
    <div class="talk-input">
      <span @click="worksClick">常用语</span>
      <input v-model="state.value" type="text">
      <van-icon name="smile-o" @click="emojiClick"/>
      <span @click="sendSubmit">发送</span>
    </div>
    <TalkWords v-if="state.worksVisible"></TalkWords>
    <TalkEmoji v-if="state.emojiVisible"></TalkEmoji>
  </div>
  
</template>

<style scoped>
  .talk-page{
    width: 100%;
    background: #f3f3f3;
    height: calc(100vh - 46px - 2.6rem);
    overflow: auto;
  }
  dl{
    padding: 0.96rem 0.64rem;
  }
  dl dt{
    overflow: hidden;
  }
  dl dt h5{
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 300;
    color: #999999;
    text-align: center;
    margin-bottom: 0.69rem;
  }
  dl dt div{
    display: flex;
  }
  dl dt img{
    width: 2.14rem;
    height: 2.14rem;
    border-radius: 50%;
    margin-right: 0.64rem;
  }
  dl dt p{
    width: 12.53rem;
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 0.11rem;
    padding: 0.4rem 0.69rem;
    margin-bottom: 1.47rem;
  }
  dl dt.active div{
    display: block;
  }
  dl dt.active img{
    float: right;
    margin-right:0;
    margin-left:0.64rem;
  }
  dl dt.active p{
    float: right;
    font-size: 0.75rem;
    font-weight: 300;
    color: #FFFFFF;
    border: 1px solid #FF9415;
    background: #FF9415;
    border-radius: 0.13rem;
    position: relative;
  }
  .talk-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #ffffff;
    text-align: center;
    z-index: 1;
    border-top: 1px solid #eeeeee;
  }
  .talk-input{
    display: flex;
    align-items: center;
    height: 2.6rem;
  }
  .talk-input span{
    width: 2.61rem;
    height: 1.33rem;
    line-height: 1.33rem;
    background: #FF9415;
    border-radius: 0.13rem;
    font-size: 0.64rem;
    font-weight: 100;
    text-align: center;
    color: #FFFFFF;
    margin-left: 0.59rem;
  }
  .talk-input span:last-child{
    margin: 0 0.59rem 0 0;
  }
  .talk-input input{
    flex: 1;
    height: 1.8rem;
    background: #FBFBFB;
    border: 1px solid #EFEFEF;
    border-radius: 0.13rem;
    padding: 0 0.5rem;
    margin: 0 0.4rem 0 0.5rem;
  }
  .talk-input i{
    font-size: 1.36rem;
    margin-right: 0.4rem;
  }
</style>