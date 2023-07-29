import service from '~/axios'

// var currentUrl = window.location.href;
// var arr = currentUrl.split('/')
// var cycle_id = arr[arr.length - 1]

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

export function updateApplication(app_id, company, url, comment){
    return service.post("/application/update/" + app_id, {
        company,
        url,
        comment
    })
}

export function deleteApplication(app_id) {
    return service.post("/application/delete/" + app_id, {})
}