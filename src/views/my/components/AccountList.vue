<script setup lang="ts">
  import { PropType } from 'vue'
  interface ListItem {
    contract_name: string;
    create_date: string;
    price: string;
    balance: string;
  }
  const props = defineProps({
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => []
    }
  })
</script>

<template>
  <div class="item" v-for="(item,index) in list" :key="index">
    <div class="item-left">
        <h5>{{ item.contract_name ? item.contract_name : '提现' }}</h5>
        <p>{{ item.create_date }}</p>
    </div>
    <div class="item-right">
        <h4>{{ item.price }}</h4>
        <p>余额：{{ item.balance }}</p>
    </div>
  </div>
</template>

<style scoped>
  .item{
    display: flex;
    justify-content: space-between;
    padding: 1.04rem 0.8rem 0.93rem;
    border-bottom: 1px solid #eeeeee;
  }
  h5{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: bold;
    color: #333333;
  }
  h4{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 500;
    color: #F4771F;
    text-align: right;
  }
  p{
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 400;
    color: #808080;
    margin-top: 0.53rem;
  }
</style>