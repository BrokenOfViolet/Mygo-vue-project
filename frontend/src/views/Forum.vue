<template>
  <div class="forum-bg">
    <el-card class="forum-header-card" shadow="never">
      <div class="forum-header">
        <h1 class="forum-title">Forum</h1>
        <div class="user-info">
          <el-avatar :size="36" icon="User" style="margin-right:8px;" />
          <span>{{ username }}</span>
          <el-button type="success" size="small" @click="goToProfile">我的主页</el-button>
        </div>
      </div>
    </el-card>
    <el-divider />
    <AddPost @refresh="fetchPosts" />
    <el-divider content-position="left">帖子列表</el-divider>
    <PostList :posts="posts" @refresh="fetchPosts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PostList from '@/components/PostList.vue'
import AddPost from '@/components/AddPost.vue'
import axios from 'axios'
import { ElAvatar } from 'element-plus'
import { User } from '@element-plus/icons-vue'

const posts = ref([])
const username = ref('')
const router = useRouter()

async function fetchPosts() {
  const res = await axios.get('http://localhost:3000/api/post')
  posts.value = res.data
}

function goToProfile() {
  router.push({ path: '/profile', query: { user: username.value } })
}

onMounted(() => {
  username.value = localStorage.getItem('username') || 'Guest'
  fetchPosts()
})
</script>

<style scoped>
.forum-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  padding-bottom: 40px;
}
.forum-header-card {
  margin: 0 auto 12px auto;
  max-width: 900px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.95);
}
.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.forum-title {
  font-size: 2.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #6366f1, #60a5fa, #6366f1);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorChange 3s infinite;
  margin: 0;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
  