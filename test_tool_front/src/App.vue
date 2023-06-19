<template>
      <el-menu class="el-menu-demo" background-color="#4db3ff" text-color="#fff" mode="horizontal"
            active-text-color="#fff" :router="true" :ellipsis="false" >
      
        <el-menu-item style="font-size: large;"><el-icon><Operation /></el-icon>测试小工具</el-menu-item>
        <el-menu-item index="/" >练习测试</el-menu-item>
        <!-- <el-menu-item index="/strategy">ESG STRATEGY</el-menu-item> -->
        <el-menu-item index="/project" >项目测试</el-menu-item>
        <!-- <p style="color:white;font-size: large;padding-left:10px;padding-right:20px;float: right;">测试小工具</p> -->
      </el-menu>
      <el-main>
        <router-view/>
      </el-main>

</template>

<style>

</style>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
}
  const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

</script>
