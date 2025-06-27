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
const email = ref('')
const message = ref('')
const router = useRouter()

async function register() {
    try {
        const res = await axios.post('http://127.0.0.1:3000/api/user/register', {
            username: username.value,
            password: password.value,
            email: email.value,
        })
        console.log(res.data)
        router.push('/login')
    } catch (err) {
        message.value = err.response.data.message || 'Register Failed'
    }
}
</script>