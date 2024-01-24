<template>
  <el-card class="box-card">
      <template #header>
        <div class="card-header" >
          <span> {{ name }}
            <el-button :icon="Edit" @click="editDialogVisible = true"/>
            <el-button :icon="Delete" @click="goDeleteCycle(id)"/>
          </span>       
        </div>
      </template>
      <div @click="goCycleDetail(id)">
        <div class="text">Applied: {{ applyNum(id)  }}</div>
        <br/>
        <div class="text">Offer: {{ offerNum(id) }}</div>
      </div>
  </el-card>
  <el-dialog v-model="editDialogVisible" title="Edit Cycle Name" width="30%" center>
      <el-input v-model="new_cycle_name" placeholder="Rename Cycle" />
      <template #footer>
          <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="goRenameCycle(id)">Confirm</el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { reactive, ref } from "vue"
import { updateCycle, deleteCycle } from "~/api/cycle"
import { getApplyNumWithId, getOfferNum } from '~/api/application'
import { notify } from '../composables/util'
import { useRouter } from 'vue-router'


defineProps({
  id: Number,
  name: String
})

const editDialogVisible = ref(false)
const new_cycle_name = ref('')
const appliedCount = ref(0)
const offerCount = ref(0)
const router = useRouter()

const applyNum = (cycle_id) => {
  getApplyNumWithId(cycle_id)
  .then(res => {
    appliedCount.value = res.data.count
  })
  return appliedCount.value
}

const offerNum = (cycle_id) => {
  getOfferNum(cycle_id)
  .then(res => {
    offerCount.value = res.data.count
  })
  return offerCount.value
}


const goDeleteCycle = (cycle_id) => {
  deleteCycle(cycle_id)
  .then(res => {
    window.location.reload()
    notify("delete success")
  })
}

const goRenameCycle = (cycle_id) => {
  updateCycle(new_cycle_name.value, cycle_id)
  .then(res => {
    window.location.reload()
    notify("update success")
    editDialogVisible.value = false
  })
}

const goCycleDetail = (cycle_id) => {
  router.push("/application/" + cycle_id)
}

</script>
  
<style scoped>
.card-header {
    font-weight: bold;
    font-size: x-large;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.item {
    margin-bottom: 2px;
}

.box-card {
    width: 1200px;
    margin-left: 120px;
    margin-top: 22px;
}

.text {
    font-size: 14px;
}
</style>
