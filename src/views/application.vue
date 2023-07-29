<template>
    <Header></Header>
    <div class="my-12"></div>
    <div class="app_table">
        <el-button type="primary" @click="addAppVisible = true">Add</el-button>
        <el-table :data="application_list" >
            <el-table-column prop="company" label="Company" width="180" />
            <el-table-column prop="url" label="Url" width="180" />
            <el-table-column prop="status" label="Status" />
            <el-table-column prop="comment" label="Comment" />
            <el-table-column prop="created_time" label="Date" />
        </el-table>
    </div>
    <el-dialog v-model="addAppVisible" title="Add New Application" width="30%" center>
      <el-input v-model="company" placeholder="Company" />
      <el-input v-model="url" placeholder="Url" />
      <el-input v-model="comment" placeholder="Comment" />
      <template #footer>
          <span class="dialog-footer">
          <el-button @click="addAppVisible = false">Cancel</el-button>
          <el-button type="primary" @click="goAddApp">Confirm</el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script setup>
import Header from '~/layout/header.vue'
import { reactive, ref } from "vue"
import { getAllApplication, createApplication } from '~/api/application'
import { notify } from '../composables/util'


const application_list = ref(null)
const addAppVisible = ref(false)
const company = ref('')
const url = ref('')
const comment = ref('')


getAllApplication()
.then(res => {
    application_list.value = res.data
})

const goAddApp = () => {
    createApplication(company.value, url.value, comment.value)
    .then(res => {
        notify("Application added")
        addAppVisible.value = false;
        window.location.reload()
    })
}


</script>

<style scoped>
.app_table{
    width: 79%;
    margin-left: 200px;
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>