<style scoped src="./css/auth.css"></style>

<template>
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
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            password: '',
            email:'',
            message: ''
        }
    },
    methods: {
        async register() {
            try {
                const res = await axios.post('http://127.0.0.1:3000/api/user/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                })
                console.log(res.data)
                this.$router.push('/login')
            } catch (err) { // 遇到非 2xx 响应会抛出异常
                this.message = err.response.data.message || 'Register Failed';
            }
        }
    }
}
</script>