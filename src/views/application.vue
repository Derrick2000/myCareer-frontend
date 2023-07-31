<template>
    <Header></Header>
    <div class="my-12"></div>
    <div class="app_table">
        <el-button type="primary" @click="addAppVisible = true">Add</el-button>
        <el-table :data="application_list" >
            <el-table-column prop="company" label="Company" width="180" />
            <el-table-column prop="url" label="Url" width="180" />
            <el-table-column
                prop="status"
                label="Status"
                width="180">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)" disable-transitions>{{ get_status(scope.row.status) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="Comment" />
            <el-table-column>
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
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
import { getAllApplication, createApplication, deleteApplication} from '~/api/application'
import { notify } from '../composables/util'


const application_list = ref(null)
const addAppVisible = ref(false)
const company = ref('')
const url = ref('')
const comment = ref('')
const search = ref('')


getAllApplication()
.then(res => {
    application_list.value = res.data
})

const goAddApp = () => {
    createApplication(company.value, url.value, comment.value)
    .then(res => {
        notify("Application added")
        addAppVisible.value = false;
        getAllApplication()
        .then(res => {
            application_list.value = res.data
        })
    })
}

const get_status = (status) => {
    if(status === -1) return 'Planned'
    else if(status === 0) return 'Applied'
    else if(status === 1) return 'Accepted'
    else return 'Rejected'
}

const getStatusType = (status) => {
    if(status === 2) return 'error'
    else if(status === 1) return 'success'
    else return ''
}

const handleEdit = (id) => {
  console.log(id)
}
const handleDelete = (id) => {
    deleteApplication(id)
    .then(res => {
        notify("Deleted")
        getAllApplication()
        .then(res => {
            application_list.value = res.data
        })
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