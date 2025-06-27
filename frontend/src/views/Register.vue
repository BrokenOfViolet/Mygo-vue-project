<style scoped src="./css/auth.css"></style>

<template>
    <div class="auth-page">
        <div class="auth-form">
            <h1 class="auth-title">Register</h1>
            <form @submit.prevent="register">
                <input v-model="username" placeholder="Username"/>
                <input v-model="email" type="email" placeholder="Email"/>
                <input v-model="password" type="password" placeholder="Password"/>
                <button type="submit">Register</button>
                <p>Already have an account? <router-link to="/login">Login here</router-link></p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElNotification } from 'element-plus'

const username = ref('')
const password = ref('')
const email = ref('')
const router = useRouter()

async function register() {
    try {
        const res = await axios.post('http://127.0.0.1:3000/api/user/register', {
            username: username.value,
            password: password.value,
            email: email.value,
        })
        ElNotification.success({
            title: 'Success',
            message: res.data.message || 'Register Success',
            type: 'success',
            position: 'top-right'
        })
        router.push('/login')
    } catch (err) {
        ElNotification.error({
            title: 'Warning',
            message: err.response.data.message || 'Register Failed',
            type: 'warning',
            position: 'top-right'
        })
    }
}
</script>