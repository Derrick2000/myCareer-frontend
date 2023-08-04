<template>
    <div>
        <div class="button" @click="dialogVisible = true">
            <el-button type="primary">Add A Cycle</el-button>
        </div>
        <el-dialog v-model="dialogVisible" title="Add a cycle" width="30%" center>
            <el-input v-model="cycle_name" placeholder="Cycle Name" />
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addCycle" >Confirm</el-button>
                </span>
            </template>
        </el-dialog>
        <div v-for="cycle in cycle_list" :key="cycle" class="text item">
            <CycleCard :id="cycle.id" :name="cycle.cycle_name"></CycleCard>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import CycleCard from '~/components/cycleCard.vue'
import { notify } from '../composables/util'
import { createCycle, getAllCycles, deleteCycle  } from '~/api/cycle'

const dialogVisible = ref(false)
const cycle_name = ref('')
const cycle_list = ref(null)

const addCycle = () => {
    createCycle(cycle_name.value)
    .then(res => {
        notify("Cycle added")
        dialogVisible.value = false;
        getAllCycles()
        .then(res => {
            cycle_list.value = res.data
        })
    })
}

getAllCycles()
.then(res => {
  cycle_list.value = res.data
})


</script>

<style scoped>
.button {
    align-items: center;
    margin-left: 120px;
    margin-top: 40px;
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>