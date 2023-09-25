<template>
    <el-row class="signup-container">
        <el-col class="signup">
            <h2 class="font-bold text-5xl text-gray-800">Sign up for MyCareer</h2>
            <div class="my-6"></div>
            <el-form class="w-[550px]" ref="formRef" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="Password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="re_password">
                    <el-input v-model="form.re_password" placeholder="Confirm Password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSignup" type="primary" :loading="loading">Sign up</el-button>
                    <el-button @click="backToLogin">Back</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive} from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '~/api/admin'
import { setToken } from '~/composables/auth'
import { notify } from '~/composables/util'

const router = useRouter()
const form = reactive({
    username: '',
    password: '',
    re_password: '',
    email: ''
})

const formRef = ref(null)
const loading = ref(false)

//自定义验证规则
const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('password connot be empty'))
    }
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,18}$/
    if (!value.match(reg)) {
        callback(new Error('8 to 18 Characters, at least one uppercase letter, one lowercase letter and one number'))
    } else {
        callback()
    }
}
const validatePassword2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== form.password) {
        callback(new Error("Two passwords don't match!"))
    } else {
        callback()
    }    
}
const validateEmail = (rule, value, callback) => {
    if(value === '') {
        callback(new Error('Email cannot be empty'))
    }
    const reg = /^\S+@\S+$/
    if (!value.match(reg)) {
        callback(new Error('This is not a valid email address'))
    } else {
        callback()
    }
}

const validateUsername = (rule, value, callback) => {
    if(value === ''){
        callback(new Error('username cannot be empty'))
    }
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    const regex = /^[A-Za-z0-9 ]+$/
    if(!value.match(regex)) {
        callback(new Error('username cannot cantain any special character'))
    }else {
        callback()
    }
}
const rules = {
    username: [{ validator: validateUsername, trigger: 'blur'}],
    password: [{ validator: validatePassword, trigger: 'blur'}],
    re_password:[{ validator: validatePassword2, trigger: 'blur'}],
    email:[{ validator: validateEmail, trigger: 'blur'}]}

const onSignup = () => {
    formRef.value.validate((valid) => {
        if(!valid) return false
        loading.value = true
        signup(form.username, form.password, form.re_password, form.email)
        .then(res => {
            if(res.data.status == 'success'){
                notify("Sign up sucess.. Logging in")
                setToken(res.data)
                router.push('/')
            }else{
                notify(res.data.message, "error")
            }
        })
        .finally(() => {
            loading.value = false
        })
    })
}

const backToLogin = () => { router.push('/login') }

</script>

<style scoped>
.signup-container{
    @apply min-h-screen;
}
.signup{
    @apply flex items-center justify-center flex-col;
}
</style>
