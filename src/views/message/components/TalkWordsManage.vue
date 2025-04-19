<script setup lang="ts">
  import {reactive,inject,provide} from 'vue'
  import {chatMessageWordsList,chatMessageWordsDelete} from '@/api/message'
  import TalkWordsAdd from './TalkWordsAdd.vue'
  import { showToast } from 'vant';
  const { closeWorksManage } = inject('popup');
  const localTalkWordList = JSON.parse(localStorage.getItem('localList'));
  interface ChatMessageWordsItem {
    id: number;
    text: string;
  }
  const state = reactive({
    loading: false,
    list: [] as ChatMessageWordsItem[],
    value: '',
    editId: 0,
    text: '',
    title: '',
    addBool: false,
    localTalkWordList: localTalkWordList ? localTalkWordList : [] as ChatMessageWordsItem[], 
  })
  const getChatMessageWordsList = async () => {
    state.loading = true
    const res = await chatMessageWordsList({})
    if(res) {
      state.list = res.data
    } else {
      showToast(res.msg)
    }
    state.loading = false;
    // 合并两个数组
    state.list = state.localTalkWordList;
  }
  getChatMessageWordsList()
  const submitDelete = async (id:number) => {
    state.loading = true
    const res = await chatMessageWordsDelete({
      id: id
    })
    if(res) {
      getChatMessageWordsList();
      for(let i = 0; i < state.list.length; i++) {
        const item = state.list[i] as ChatMessageWordsItem;
        if(item.id === id) {
          state.list.splice(i,1)
        }
      }
      localStorage.setItem('localList', JSON.stringify(state.list));
    }
    showToast(res.msg)
    state.loading = false
  }
  const editChange = (id:number,text:string) => {
    state.editId = id
    state.text = text
    state.title = '修改常用语'
    state.addBool = true
  }
  const addChange = () => {
    state.editId = 0
    state.text = ''
    state.title = '添加常用语'
    state.addBool = true
  }
  const closeWorksAdd = () => {
    state.addBool = false
    getChatMessageWordsList()
  }
  provide('popup',{
    closeWorksAdd
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
    if(id) {
      for(let i = 0; i < state.localTalkWordList.length; i++) {
        const item = state.localTalkWordList[i] as ChatMessageWordsItem;
        if(item.id === id) {
          item.text = text
        }
      }
    } else {
      state.localTalkWordList.push({ id, text });
    }
    localStorage.setItem('localList', JSON.stringify(state.localTalkWordList));
    console.log(state.localTalkWordList);
  }
</script>
<template>
  <van-nav-bar title="管理常用语" left-arrow @click-left="closeWorksManage" />
  <div class="manage-list">
    <van-swipe-cell  v-for="(item,index) in state.list" :key="index">
      <div class="item">
        <p>{{item.text}}</p>
        <div>
          <img src="@/assets/img/icon/icon-edit.png" />
          <span @click="editChange(item.id,item.text)">编辑</span>
        </div>
      </div>
      <template #right>
        <img @click="submitDelete(item.id)" src="@/assets/img/icon/icon-delete.png" class="delete" />
      </template>
    </van-swipe-cell>
  </div>
  <button @click="addChange" class="add">添加常用语</button>
  <!--常用语添加弹窗-->
  <van-popup v-model:show="state.addBool" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
    <TalkWordsAdd @updateTalkWordsAdd="updateTalkWordsAdd" :title="state.title" :id="state.editId" :text="state.text"></TalkWordsAdd>
  </van-popup>
</template>
<style scoped>
>>> .van-swipe-cell__right{
    display: flex;
    align-items: center;
  }
  .item{
    margin: 0 0.72rem;
    border-bottom: 1px solid #eeeeee;
  }
  .item p{
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.2rem 0.4rem;
    text-align: left;
  }
  .item div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.77rem;
  }
  .item div span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 300;
    color: #030303;
    text-align: right;
  }
  .item div img{
    width: 0.91rem;
    height: 0.91rem;
  }
  .delete{
    width: 1.87rem;
    height: 1.87rem;
    margin-right: 0.64rem;
  }
  .add{
    height: 2.35rem;
    background: linear-gradient(90deg, #FFA400, #FF8900);
    border-radius: 0.27rem;
    line-height: 2.35em;
    position: fixed;
    border: none;
    bottom: 0.64rem;
    margin: 0 0.64rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: #FFFFFF;
    width: calc(100vw - 1.28rem);
    left: 0;
  }
</style>