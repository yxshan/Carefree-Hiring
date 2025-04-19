<script setup lang="ts">
  import { reactive,inject,provide,watch } from 'vue'
  import { myStore } from '@/store/my.ts'
  import { addProjectExper,editProjectExper } from '@/api/my'
  import { showToast } from 'vant'
  const store = myStore()
  const { closeChange } = inject('popup')
  const state = reactive({
    showPositionType: false,
    showServiceType: false,
    showStartTime: false,
    showEndTime: false,
    positionValue: '',
    serviceValue: '',
    projectName: '',
    startTime: '',
    endTime: '',
    projectDuty: '',
    minDate: new Date(1980,1,1),
    maxDate: new Date()
  })
  const props = defineProps({
    item: {
      type: Object,
      default: () => ({})
    }
  })
  const setInfo = () => {
    state.projectName = props.item.project_name
    state.projectDuty = props.item.project_duty
    state.startTime = props.item.project_start_time
    state.endTime = props.item.project_end_time
  }
  watch(
    ()=>props.item,
    (newValue,oldValue) => {
    setInfo()
  })
  setInfo()
  const closePositionType = (name:string) =>{
    if(name) state.positionValue = name
    state.showPositionType = false
  }
  const closeServiceType = (name:string) => {
    if(name) state.serviceValue = name
    state.showServiceType = false
  }
  const startTimeConfirm = (value:any) => {
    const { selectedValues } = value;
    state.startTime = selectedValues[0] + '-' + selectedValues[1]
    state.showStartTime = false
  }
  const endTimeConfirm = (value:any) => {
    const { selectedValues } = value;
    state.endTime = selectedValues[0] + '-' + selectedValues[1]
    state.showEndTime = false
  }
  const submit = async () => {
    if(!state.projectName){
      showToast('请填写项目名称')
      return
    }
    if(!state.startTime && !state.endTime){
      showToast('请选择工作时间')
      return
    }
    if(!state.projectDuty){
      showToast('请填写项目职责')
      return
    }
    let res;
    if(props.item.project_id){
      res = await editProjectExper({
        "id": props.item.project_id, 
        "project_duty": state.projectDuty, 
        "project_name": state.projectName, 
        "project_end_time": state.endTime, 
        "project_start_time": state.startTime
      })
    } else {
      res = await addProjectExper({
        "uuid": props.item.uuid, 
        "project_duty": state.projectDuty, 
        "project_name": state.projectName, 
        "project_end_time": state.endTime, 
        "project_start_time": state.startTime
      })
    }
    if(res){
      closeChange()
      showToast('保存成功')
    }else{
      showToast('保存失败')
    }
  }
  provide('popup',{
      closePositionType,
      closeServiceType
  })
</script>
<template>
  <van-nav-bar title="项目经历" left-arrow @click-left="closeChange"/>
  <div class="position-list">
    <div class="user-item">
      <h5>项目名称</h5>
      <van-field v-model="state.projectName" label="" placeholder="请填写您的项目名称" />
    </div>
    <div class="user-item">
      <h5>完成项目时间</h5>
      <div class="work-time-list">
        <van-field v-model="state.startTime" readonly label="" placeholder="请选择" @click="state.showStartTime=true" />
        <span></span>
        <van-field v-model="state.endTime" readonly label="" placeholder="请选择" @click="state.showEndTime=true" />
      </div>
      <van-action-sheet v-model:show="state.showStartTime">
        <van-date-picker
          type="date"
          title="选择年月日"
          :min-date="state.minDate"
          :max-date="state.maxDate"
          @confirm="startTimeConfirm"
          @cancel="state.showStartTime = false"
        />
      </van-action-sheet>
      <van-action-sheet v-model:show="state.showEndTime">
        <van-date-picker
          type="date"
          title="选择年月日"
          :min-date="state.minDate"
          :max-date="state.maxDate"
          @confirm="endTimeConfirm"
          @cancel="state.showEndTime = false"
        />
      </van-action-sheet>
    </div>
    <div class="user-item">
      <h5>项目职责</h5>
      <van-field v-model="state.projectDuty" label="" placeholder="请填写您的项目职责"
        type="textarea"
        rows="10"
        autosize 
      />
    </div>
    <button class="wy-submit" @click="submit">完成</button>
  </div>
</template>

<style scoped>
  .position-list{
    margin: 1.52rem 0.67rem 0;
  }
  .work-time-list{
    display: flex;
    align-items: center
  }
  .work-time-list span{
    width: 0.83rem;
    height: 0.05rem;
    margin-right: 2.4rem;
    background: #333333;
  }
  .work-time-list .van-cell{
    width: 6rem;
  }
</style>