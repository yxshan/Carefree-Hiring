<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { getPolicy } from '@/api/user';
  import { showToast } from 'vant';
  const state = reactive({
    htmlText: ''
  })
  const onClickLeft = () => history.back();
  const getPolicyChange = async () => {
    const res = await getPolicy({
      id: 17
    })
    if(res){
      state.htmlText = res.records[0].content
    }else{
      showToast(res.msg)
    }
  }
  getPolicyChange()
</script>
<template>
  <van-nav-bar
  title="隐私政策"
  left-text=""
  left-arrow
  @click-left="onClickLeft"
  />
  <div class="text-agree" v-html="state.htmlText"></div>
</template>
<style scoped>
.text-agree{
  padding: 0.5rem 0.7rem;
}
</style>