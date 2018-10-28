<template>
<div class="center-middle no-data">
  <p v-if="title">{{title}}</p>
  <p>暂无数据</p>
</div>
</template>

<script>
export default {
  name: 'NoData',
  props: ['title']
}
</script>

<style lang="css" scoped>
.no-data {
  font-size: 14px;
  line-height: 50px;
}
</style>
