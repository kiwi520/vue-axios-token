<template>
  <div>
    <a-button  type="primary" style="margin: 10px"  @click="ToLogin">登陆</a-button>
    <a-button  type="primary" style="margin: 10px">刷新token</a-button>
    <a-button type="primary" style="margin: 10px">退出</a-button>
  </div>
</template>

<script>
import { login } from '@/api';
export default {
  name: "index",
  methods:{
    ToLogin(){
      alert('pppp')
      login({
        "username":"username",
        "password":"password"
      }).then(res=>{
        if (res.code === 200){
          console.log(res)
          alert('okkkk')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>