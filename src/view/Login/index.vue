<template>
  <div style="width:100%;display: flex;justify-content: center;align-content: center; margin-top: 100px">
<!--    <a-form :form="form" @submit="handleSubmit">-->
    <a-form  @submit="login">
      <a-form-item>
        <a-input v-model="name"
            placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model="password"
            type="password"
            placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      // form: this.$form.createForm(this, {name: 'test',password:'dddd'}),
      name:"",
      password:"",
      loginStatus:false
    };
  },
  computed: {
    ...mapGetters({
      getterLoginStatus: 'getLoginStatus'
    })
  },
  methods: {
    ...mapActions({
      actionLogin: 'login'
    }),
    async login() {
      await this.actionLogin(JSON.stringify({username: this.name, password: this.password}));
      if (this.getterLoginStatus === 'success') {
        this.$router.push({path:'/dashboard'})
      } else {
        alert('failed to login')
      }
    },
  },
}
</script>

<style scoped>

</style>