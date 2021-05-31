<template>
  <div id="app">
    <a-menu mode="horizontal">
      <a-menu-item key="home">
        <router-link to="/">首页</router-link>
      </a-menu-item>
      <a-menu-item key="login" v-show="gettersLoginStatus.length <= 0 ">
        <router-link to="/login">登录</router-link>
      </a-menu-item>
      <a-menu-item key="logout" v-show="gettersLoginStatus.length > 0 ">
        <a-button @click="logout">推出</a-button>
      </a-menu-item>

    </a-menu>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      gettersLoginStatus: 'getLoginStatus',
    })
  },
  methods:{
    ...mapActions({
      actionsLogout:"logout"
    }),
    async logout(){
      await this.actionsLogout();
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
