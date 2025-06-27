<template>
  <div>
    <el-card v-for="post in posts" :key="post._id" class="post-card" shadow="hover">
      <div class="post-header">
        <div class="post-user">
          <el-avatar :src="post.author?.avatar || 'https://i.pravatar.cc/150'" size="large" />
          <div class="post-user-info">
            <strong>{{ post.author?.username || 'UnknownUser' }}</strong>
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
          </div>
        </div>
        <div class="post-buttons">
          <el-button size="small" @click="chatWith(post.author.username)">私信</el-button>
          <el-button size="small" type="success" @click="follow(post.author.username)">关注</el-button>
        </div>
      </div>
      <el-divider />
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-content">{{ post.content }}</p>
      <div class="post-actions">
        <el-button size="small" type="primary" @click="likePost(post._id)">👍 赞 ({{ post.likes }})</el-button>
      </div>
      <div class="comment-box">
        <el-input
          v-model="commentContent[post._id]"
          placeholder="写评论..."
          size="small"
          class="comment-input"
        />
        <el-button size="small" type="info" @click="addComment(post._id)">评论</el-button>
      </div>
      <div v-if="post.comments && post.comments.length" class="comments">
        <el-divider content-position="left">评论</el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="(c, index) in post.comments"
            :key="index"
            :timestamp="''"
            placement="top"
          >
            <span class="comment-user">{{ c.username }}：</span>{{ c.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps(['posts'])
const emit = defineEmits(['refresh'])
const commentContent = ref({})
const currentUser = ref('')
const router = useRouter()

onMounted(() => {
  currentUser.value = localStorage.getItem('username') || 'Anonymous'
})

async function likePost(id) {
  await axios.post(`http://localhost:3000/api/post/${id}/like`)
  emit('refresh')
}

async function addComment(id) {
  const content = commentContent.value[id]
  if (!content) return
  await axios.post(`http://localhost:3000/api/post/${id}/comment`, {
    username: currentUser.value,
    content
  })
  commentContent.value[id] = ''
  emit('refresh')
}

function chatWith(user) {
  router.push({ path: '/chat', query: { to: user } })
}

async function follow(user) {
  try {
    const res = await axios.post(`http://localhost:3000/api/user/follow`, {
      from: currentUser.value,
      to: user
    })
    // 可用ElMessage美化提示
    alert(res.data.message || 'Followed!')
  } catch (err) {
    console.error(err)
    alert('Follow failed')
  }
}

function formatTime(timeStr) {
  const date = new Date(timeStr)
  return date.toLocaleString()
}
</script>

<style scoped>
.post-card {
  max-width: 700px;
  margin: 0 auto 24px auto;
  border-radius: 12px;
  background: rgba(255,255,255,0.98);
}
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post-user {
  display: flex;
  align-items: center;
}
.post-user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.post-time {
  font-size: 12px;
  color: #888;
}
.post-buttons .el-button + .el-button {
  margin-left: 8px;
}
.post-title {
  margin: 12px 0 4px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #6366f1;
}
.post-content {
  margin-bottom: 12px;
  line-height: 1.5;
}
.post-actions {
  margin-bottom: 8px;
}
.comment-box {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.comment-input {
  flex: 1;
}
.comments {
  margin-top: 10px;
}
.comment-user {
  color: #6366f1;
  font-weight: bold;
}
</style>
  