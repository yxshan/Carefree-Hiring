<script setup lang="ts">
  import { reactive,provide } from 'vue';
  import { myStore } from '@/store/my'
  import ExcellentSkillPopup from './ExcellentSkillPopup.vue'
  const store = myStore()
  const state = reactive({
    show: false
  })
  const props = defineProps({
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
  <div class="resume-label" >
    <h3>擅长技能<van-icon name="add-o" v-if="props.page !== 'preview'" @click="state.show = true" /></h3>
    <dl v-if="store.resumeInfo.sys_skill_ids || store.resumeInfo.skill_ids" class="text-list">
      <dt v-if="store.resumeInfo.sys_skill_ids" v-for="(item,index) in store.resumeInfo.sys_skill_ids.split(',')" :key="index">{{item}}</dt>
      <dt v-if="store.resumeInfo.skill_ids" v-for="(item,index) in store.resumeInfo.skill_ids.split(',')" :key="index">{{item}}</dt>
    </dl>
    <label v-else>请您选择擅长技能</label>
  </div>

  <!--弹窗-->
  <van-popup v-model:show="state.show" position="top" duration="0" :style="{ width: '100%',height: '100%' }">
    <ExcellentSkillPopup :show="state.show"></ExcellentSkillPopup>
  </van-popup>
</template>
<style scoped>
  .text-list dt{
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 300;
    color: #666666;
    padding: 0.4rem 0.5rem;
    margin-right: 0.27rem;
    margin-bottom: 0.3rem;
    background: #F6F7F8;
    border-radius: 0.16rem;
    display: inline-block;
  }
</style>