<script setup lang="ts">
  import {reactive,inject,provide} from 'vue'
  import {chatMessageWordsList} from '@/api/message.ts'
  import TalkWordsAdd from './TalkWordsAdd.vue'
  import TalkWordsManage from './TalkWordsManage.vue'
  import { showToast } from 'vant';
  const { worksChange } = inject('popup');
  const localTalkWordList = JSON.parse(localStorage.getItem('localList'));
  interface ChatMessageWordsItem {
    id: number;
    text: string;
  }
  const state = reactive({
    loading: false as boolean,
    list: [] as ChatMessageWordsItem[],
    localTalkWordList: localTalkWordList ? localTalkWordList : [] as ChatMessageWordsItem[], 
    addBool: false as boolean,
    manageBool: false as boolean,
  });
  const getChatMessageWordsList = async () => {
    state.loading = true;
    const res = await chatMessageWordsList({})
    if(res){
      state.list = res.data;
    }else{
      showToast(res.msg);
    }
    state.loading = false;
    // 合并两个数组
    for(let i = 0; i < state.localTalkWordList.length; i++) {
      const item = state.localTalkWordList[i] as ChatMessageWordsItem;
      const exists = state.list.some((obj:any) => obj.text === item.text);
      if (!exists) {
        state.list.push(item);
      }
    }
    localStorage.setItem('localList', JSON.stringify(state.list));
  }
  getChatMessageWordsList()
  const closeWorksAdd = () => {
    state.addBool = false;
    getChatMessageWordsList();
  }
  const closeWorksManage = () => {
    state.manageBool = false;
    console.log(state.list,"closeWorksManage1");
    getChatMessageWordsList();
    console.log(state.list,"closeWorksManage2");
  }
  provide('popup',{
    closeWorksAdd,
    closeWorksManage
  })
  // 添加常用语
  function updateTalkWordsAdd(value:ChatMessageWordsItem) {
    const { id, text } = value;
    // 检查 text 是否已存在于任何对象的 text 属性中
    const exists = state.localTalkWordList.some((item:any) => item.text === text);
    if (exists) {
      showToast('该常用语已存在');
      return;
    }
    state.localTalkWordList.push({ id, text });
  }
</script>
<template>
  <div class="talk-word">
    <dl>
      <dt v-for="(item,index) in state.list" :key="index" @click="worksChange(item.text)">{{ item.text }}</dt>
    </dl>
    <div class="talk-word-btn">
      <p @click="state.addBool = true"><img src="../../../assets/img/icon/icon-add.png" alt="">添加</p>
      <i></i>
      <p @click="state.manageBool = true"><img src="../../../assets/img/icon/icon-file.png" alt="">管理</p>
    </div>
    <!--常用语添加弹窗-->
    <van-popup v-model:show="state.addBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
      <TalkWordsAdd @updateTalkWordsAdd="updateTalkWordsAdd" title="添加常用语"></TalkWordsAdd>
    </van-popup>
    <!--常用语管理-->
    <van-popup v-model:show="state.manageBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
      <TalkWordsManage></TalkWordsManage>
    </van-popup>
  </div>
</template>
<style scoped>
  dl{
    height: 8.7rem;
    margin: 0 0.85rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    overflow: auto;
  }
  dl dt{
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.21rem;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
  }
  dl dt:last-child{
    border-bottom: 0;
  }
  .talk-word{
    height: 12rem;
  }
  .talk-word-btn{
    display: flex;
    margin-top: 1rem;
  }
  .talk-word-btn p{
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
  }
  .talk-word-btn p img{
    width: 0.91rem;
    height: 0.91rem;
    margin-right: 0.29rem;
  }
  .talk-word-btn i{
    width: 0.03rem;
    height: 0.85rem;
    background: #EFEFEF;
    display: inline-block;
  }
</style>