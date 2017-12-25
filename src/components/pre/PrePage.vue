<template>
  <div></div>
</template>
<script>
  export default {
    created(){
      this.switchRouter();
    },
    data () {
      return {
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
      }
    },
    methods: {
      switchRouter(){
          if(this.userInfo){
            this.$router.push('/admin-main');
          }else{
            this.$router.push('/login');
          }
      }
    }
  }
</script>
