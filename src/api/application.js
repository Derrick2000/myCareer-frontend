import service from '~/axios'

export function getAllApplication(){
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/')
    var cycle_id = arr[arr.length - 1]
    return service.get("/application/getAll/" + cycle_id)
}

export function createApplication(company, url, comment){
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/')
    var cycle_id = arr[arr.length - 1]
    return service.post("/application/add/" + cycle_id, {
        company,
        url,
        comment
    })
}

export function updateApplication(app_id, company, url, comment, status){
    return service.post("/application/update/" + app_id, {
        company,
        url,
        comment,
        status
    })
}

export function deleteApplication(app_id) {
    return service.post("/application/delete/" + app_id, {})
}

export function getApplyNum() {
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/')
    var cycle_id = arr[arr.length - 1]
    return service.get('/application/getAppliedNum/' + cycle_id)
}

export function getApplyNumWithId(cycle_id) {
    return service.get('/application/getAppliedNum/' + cycle_id)
}

export function getAvailabilityNum() {
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/')
    var cycle_id = arr[arr.length - 1]
    return service.get('/application/getAvailabilityNum/' + cycle_id)
}

export function getOfferNum(cycle_id) {
    return service.get('/application/getOfferedNum/' + cycle_id)
}

export function getAppById(app_id) {
    return service.get('/application/getAppById/' + app_id)
}