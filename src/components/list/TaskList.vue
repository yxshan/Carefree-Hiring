<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const props = defineProps({
    taskList: {
      type: Array,
      default: () => []
    }
  })
  const router = useRouter();
  const gotoDetail = (id:any)=>{
    router.push('/task/details/' + id)
  }
</script>

<template>
  <div class="task-item" v-for="(item, index) in taskList" :key="index" @click="gotoDetail(item.task_id)">
    <div class="task-item-top">
      <h3>{{ item.task_name }}</h3>
      <span v-if="item.is_emergency == 1">紧急</span>
    </div>
    <dl>
      <dt>
        <h5>任务预算</h5>
        <strong>￥{{ item.task_budget }}</strong>
      </dt>
      <dt>
        <h5>任务周期</h5>
        <strong>{{ item.task_cycle }}天</strong>
      </dt>
      <dt>
        <h5>服务方式</h5>
        <strong>{{ item.service_mode }}</strong>
      </dt>
    </dl>
    <p>任务要求：{{ item.task_ask }}</p>
    <div class="task-item-bottom">
      <label for="">{{ item.company_name }}</label>
      <span><van-icon name="location-o" />{{ item.city }}</span>
    </div>
  </div>
</template>

<style scoped>
  .task-item {
    background: #fff;
    border-radius: 0.53rem;
    margin: 0 0.64rem 0.53rem;
    padding: 0.88rem 0.48rem 0.75rem;
    position: relative;
    font-size: 0.69rem;
    font-family: PingFang SC;
    font-weight: 100;
    color: #666;
  }
  .task-item-top {
    display: flex;
  }
  .task-item-top h3 {
    font-size: 0.91rem;
    line-height: 0.91rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    margin-bottom: 1.01rem;
  }
  .task-item-top span {
    position: absolute;
    right: 0;
    width: 2.29rem;
    height: 1.08rem;
    background: linear-gradient(90deg, #fea829, #fe8f27);
    border-radius: 0.53rem 0 0 0.53rem;
    text-align: center;
    font-size: 0.59rem;
    color: #fff;
  }
  dl {
    display: flex;
    margin-bottom: 0.8rem;
  }
  dl dt {
    margin-right: 1.44rem;
  }
  dl dt h5 {
    font-size: 0.60rem;
    line-height: 0.69rem;
    margin-bottom: 0.53rem;
    color: #999;
  }
  dl dt strong {
    font-size: 0.64rem;
    line-height: 0.64rem;
    display: block;
    font-weight: 500;
    color: #333;
  }
  .task-item p {
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .task-item-bottom {
    display: flex;
    border-top: 1px solid #f5f5f5;
    margin-top: 0.72rem;
    padding-top: 0.72rem;
    line-height: 0.69rem;
  }
  .task-item-bottom label {
    flex: 1;
  }
  .task-item-bottom span {
    text-align: right;
  }
  .task-item-bottom i {
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 0.1rem;
  }
</style>