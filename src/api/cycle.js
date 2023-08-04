import service from '~/axios'
import { getToken } from '~/composables/auth'

let user_id = getToken().user_id

export function getAllCycles(){
    return service.get("/cycle/getAll/" + user_id)
}

export function createCycle(cycle_name){
    return service.post("/cycle/add/" + user_id, {
        cycle_name
    })
}

export function updateCycle(cycle_name, cycle_id){
    return service.post("/cycle/update/" + cycle_id, {
        cycle_name
    })
}

export function deleteCycle(cycle_id) {
    return service.post("/cycle/delete/" + cycle_id, {})
}