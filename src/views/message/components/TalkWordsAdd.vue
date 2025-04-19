<script setup lang="ts">
  import { reactive,inject,watchEffect,defineEmits } from 'vue'
  import { chatMessageWordsAdd,chatMessageWordsEdit } from '@/api/message.ts'
  import { showToast } from 'vant';
  const { closeWorksAdd } = inject('popup')
  const props = defineProps({
    title: {
      type: String,
      default: '添加常用语'
    },
    id: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  })
  const state = reactive({
    loading: false,
    list: [],
    value: '',
    currentValue: '', // 存储当前输入的值
    currentId: 4,
  })
  watchEffect(()=>{
    state.value = props.text
  })
  const submitAdd = async () => {
    if(!state.value) {
      showToast('请输入常用语');
      return;
    }
    state.loading = true;
    let res = null;
    if(props.id) {
      res = await chatMessageWordsEdit({
        id: props.id,
        text: state.value
      })
    } else {
      res = await chatMessageWordsAdd({
        text: state.value
      })
    }
    if(res) {
      state.currentValue = state.value;
      state.value = '';
      closeWorksAdd();
    } else {
      showToast(res.msg);
    }
    state.loading = false;
    // 
    emit('updateTalkWordsAdd',{
      id: props.id !== 0 ? props.id : state.currentId + Math.random() * 1000 + 1,
      text: state.currentValue
     });
  }
  // 
  const emit = defineEmits(['updateTalkWordsAdd']);
</script>
<template>
  <van-nav-bar :title="props.title" left-arrow @click-left="closeWorksAdd">
    <template #right>
      <span @click="submitAdd">完成</span>
    </template>
  </van-nav-bar>
  <van-field
    v-model="state.value"
    rows="10"
    autosize
    label=""
    type="textarea"
    maxlength="200"
    placeholder="请输入您的常用回复请不要填写qq、微信等联系方式或 广告信息，否则系统将封禁您的账号。"
    show-word-limit
  />
</template>
<style scoped>
>>> .van-field__word-num{
    color: #FF9415;
}
>>> .van-field__word-limit{
    color: #999999;
}
</style>