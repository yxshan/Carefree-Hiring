<script setup lang="ts">
  import { defineProps, PropType } from 'vue';
  import { useRouter } from 'vue-router';
  import { userStore } from '../../store/user';
  const uStore = userStore();
  interface MessageItem {
    id: number;
    title: string;
    content: string;
    create_time: string;
    is_show: boolean;
    things_id: string;
    receive_id: string;
    receive_is_read: string;
    things_type: number;
    receive_id_name: string;
  }
  const props = defineProps({
    messageList: {
      type: Array as PropType<MessageItem[]>,
      default: () => [],
    },
    type: {
      type: String,
      default: ''
    }
  })
  const router = useRouter();
  const gotoDetail = (item:any) => {
    if(props.type === 'system'){
      router.push('/message/systemList')
    }
    if(props.type === 'talk' && item.things_type === 0) {
      router.push('/message/talk/'+item.things_id +'/'+item.receive_id)
    }
    if(props.type === 'talk' && item.things_type === 1)  {
      router.push('/message/talent/'+item.things_id +'/'+item.send_id)
    }
    if(props.type === 'talent' && item.things_type === 0) {
      router.push('/message/talk/'+item.things_id +'/'+item.send_id)
    }
    if(props.type === 'talent' && item.things_type === 1) {
      router.push('/message/talent/'+item.things_id +'/'+item.receive_id)
    }
  }
</script>

<template>
  <dl v-for="(item,index) in messageList" :key="index" @click="gotoDetail(item)">
    <dd>
      <img v-if="item.receive_is_read" :src="item.receive_is_read">
      <img v-else src="@/assets/img/icon/icon-message.png">
      <span v-if="item.is_show"></span>
    </dd>
    <dt>
      <h3>{{ item.things_type === 1 ? item.receive_id_name : item.title }}<span>{{ item.create_time }}</span></h3>
      <p>{{ item.content }}</p>
    </dt>
  </dl>
</template>

<style scoped>
  dl {
    font-size: 0.64rem;
    color: #666666;
    padding: 0.9rem 0;
    margin: 0 0.67rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
  }
  dl dd {
    position: relative;
    margin-right: 0.56rem;
  }
  dl dd img {
    width: 2.61rem;
    height: 2.61rem;
    border-radius: 50%;
  }
  dl dd span {
    position: absolute;
    top: 0;
    right:0;
    width: 0.32rem;
    height: 0.32rem;
    background: #FF0000;
    border-radius: 50%;
  }
  dl dt {
    flex: 1;
  }
  dl dt h3 {
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #333333;
    margin-bottom: 0.43rem;
  }
  dl dt h3 span {
    float: right;
    color: #999999;
    font-size: 0.64rem;
    font-weight: 100;
  }
  dl dt p {
    font-size: 0.69rem;
    line-height: 0.69rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>