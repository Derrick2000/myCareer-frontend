<template>
  <Header></Header>
  <Cycle></Cycle>
  
</template>

<script setup>

</script>

<script>
import { removeToken } from '~/composables/auth'
import { logout } from '~/api/admin'
import { jsPDF } from "jspdf"
import { getAllApplication } from '~/api/application'
import Header from '~/layout/header.vue'
import Cycle from '~/layout/cycle.vue'
// import 'jspdf-autotable'
import { applyPlugin } from 'jspdf-autotable'
import { ref } from 'vue'
applyPlugin(jsPDF)


export default {
    name: "Index",
    components:{
      Header,
      Cycle
    },
    data() {
      return {
      }
    },
    methods: {
      onLogout(){
        removeToken()
        this.$router.go('/')
        logout()
      }
    }
}
</script>

<style lang="less" scoped>

</style>
