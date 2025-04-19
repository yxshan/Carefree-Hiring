<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    }
  })
  const contractState = (index:number) => {
    if(index === 1) return 'green';
    if(index === 2) return 'orange';
    if(index === 3) return 'red';
    return '';
  }
</script>

<template>
  <dt class="contract-progress">
    <i :class="contractState(item.contract_I_state)"></i>
    <i :class="contractState(item.contract_II_state)"></i>
    <i :class="contractState(item.contract_III_state)"></i>
    <i :class="contractState(item.contract_IIII_state)"></i>
  </dt>
</template>

<style scoped>
  .contract-progress {
    display: flex;
    height: 0.53rem;
    width: 100%;
  }
  .contract-progress i {
    flex: 1;
    background: #f3f3f3;
    margin: 0 1px;
  }
  .contract-progress i.green {
    background: #50d400;
  }
  .contract-progress i.orange {
    background: #fe9415;
  }
  .contract-progress i.red {
    background: #ff4800;
  }
</style>