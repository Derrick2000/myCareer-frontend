<template>
    <Header></Header>
    <div class="my-12"></div>
    <div class="app_table">
        <el-button type="primary" @click="addAppVisible = true">Add</el-button>
        <el-table :data="application_list" >
            <el-table-column prop="company" label="Company" width="280" />
            <!-- <el-table-column prop="url" label="Url" width="180" /> -->
            <el-table-column
                prop="status"
                label="Status"
                width="180">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)" disable-transitions>{{ get_status(scope.row.status) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="Comment" width="480"/>
            <el-table-column>
                <template #header>
                    <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
                    Operation
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="editAppDialogVisible" title="Edit Application" width="30%" center>
            <el-input v-model="default_company" placeholder="company"></el-input>
            <div class="my-3"></div>
            <!-- <el-input v-model="default_url" placeholder="url"/> -->
            <el-input v-model="default_status"/>
            <div class="my-3"></div>
            <el-input v-model="default_comment" placeholder="comment"/>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="handleUpdateCancel">Cancel</el-button>
                <el-button type="primary" @click="handleUpdateConfirm">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <el-dialog v-model="addAppVisible" title="Add New Application" width="30%" center>
      <el-input v-model="company" placeholder="Company" />
      <div class="my-3"></div>
      <!-- <el-input v-model="url" placeholder="Url" /> -->
      <div class="my-3"></div>
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
import { getAllApplication, createApplication, deleteApplication, getAppById, updateApplication } from '~/api/application'
import { notify } from '../composables/util'


const application_list = ref(null)
const addAppVisible = ref(false)
const company = ref('')
const url = ref('')
const comment = ref('')
const search = ref('')
const editAppDialogVisible = ref(false)
const default_app = ref(null)
const default_company = ref(null)
const default_url = ref(null)
const default_status = ref(null)
const default_comment = ref(null)
const edit_app_id = ref(0)


getAllApplication()
.then(res => {
    application_list.value = res.data
})

const goAddApp = () => {
    createApplication(company.value, url.value, comment.value)
    .then(res => {
        company.value = null
        url.value = null
        comment.value = null
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
    if(status === 2) return 'danger'
    else if(status === 1) return 'success'
    else return ''
}

const handleEdit = (id) => {
    getAppById(id)
    .then(res => {
        default_app.value = res.data
        default_company.value = default_app.value.company
        default_url.value = default_app.value.url
        default_status.value = default_app.value.status
        default_comment.value = default_app.value.comment
        edit_app_id.value = id
        editAppDialogVisible.value = true
    })
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

const handleUpdateConfirm = () => {
    updateApplication(edit_app_id.value, default_company.value, default_url.value, default_comment.value, default_status.value)
    .then(() => {
        getAllApplication()
        .then(res => {
            application_list.value = res.data
        })
        refresh_default()
        editAppDialogVisible.value = false
    })
}

const handleUpdateCancel = () => {
    editAppDialogVisible.value = false
    refresh_default()
}

const refresh_default = () => {
    default_app.value = null
    default_company.value = null
    default_url.value = null
    default_status.value = null
    default_comment.value = null
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