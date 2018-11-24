<template>
  <div class="ue">
    <u-editor v-model="value"></u-editor>
    <u-editor v-model="value" disabled height="300px"></u-editor>
    <u-editor v-model="value" disabled></u-editor>
  </div>
</template>

<script>
import UEditor from 'plugin/UEditor'
export default {
  name: 'Ue',
  components: {UEditor},
  mixins: [],
  props: {},
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="less">
</style>
