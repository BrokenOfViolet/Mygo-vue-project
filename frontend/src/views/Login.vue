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

<script>  
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async login() {
            try {
                const res = await axios.post('http://127.0.0.1:3000/api/user/login', {
                    username: this.username,
                    password: this.password,
                })
                const user = res.data.user;
                this.message = res.data.message || 'Login success';
                localStorage.setItem('username', user.username);
                localStorage.setItem('userId', user._id);
                this.$router.push('/Forum')  // 跳转到应用的根路径（首页）
            } catch (err) {
                this.message = err.response.data.message || 'Invalid username or password';
            }
        }
    }
}
</script>
