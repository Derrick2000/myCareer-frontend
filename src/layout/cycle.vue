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
        <!-- <ExampleCycleCard></ExampleCycleCard> -->
        <CycleCard></CycleCard>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import CycleCard from '~/components/cycleCard.vue'
import ExampleCycleCard from '~/components/exampleCycleCard.vue'
import { notify } from '../composables/util'
import { createCycle } from '~/api/cycle'

const dialogVisible = ref(false)
const cycle_name = ref('')

const addCycle = () => {
    console.log(cycle_name.value)
    createCycle(cycle_name.value)
    .then(res => {
        notify("Cycle added")
        dialogVisible.value = false;
        window.location.reload()
    })
}


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