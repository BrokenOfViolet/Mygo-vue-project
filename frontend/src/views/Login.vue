<style scoped src="./css/auth.css"></style>
<template>
    <div class="auth-page">
        <div class="auth-form">
            <h1 class="auth-title">Login</h1>
            <form @submit.prevent="login">
                <input v-model="username" placeholder="username"/>
                <input v-model="password" type="password" placeholder="password"/>
                <button type="submit">Login</button>
                <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
                <p class="tipMessage">{{ message }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

async function login() {
    try {
        const res = await axios.post('http://127.0.0.1:3000/api/user/login', {
            username: username.value,
            password: password.value,
        })
        const user = res.data.user
        message.value = res.data.message || 'Login success'
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId', user._id)
        router.push('/Forum')
    } catch (err) {
        message.value = err.response.data.message || 'Invalid username or password'
    }
}
</script>
