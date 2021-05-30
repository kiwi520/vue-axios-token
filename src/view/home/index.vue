<template>
  <div>
    <h1>Home Page</h1>
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