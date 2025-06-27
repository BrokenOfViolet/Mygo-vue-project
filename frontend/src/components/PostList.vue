<template>
    <div>
      <div v-for="post in posts" :key="post._id" class="post-card">
        <div class="post-header">
          <div class="post-user">
            <img v-if="post.author" :src="post.author?.avatar || 'https://i.pravatar.cc/150'" alt="avatar" class="avatar" />
            <span v-else>UnknownUser</span>
            <div class="post-user-info">
              <strong>{{ post.author.username }}</strong>
              <span class="post-time">{{ formatTime(post.createdAt) }}</span>
            </div>
          </div>
          <div class="post-buttons">
            <button @click="chatWith(post.author.username)">Chat</button>
            <button @click="follow(post.author.username)">Follow</button>
          </div>
        </div>
  
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-content">{{ post.content }}</p>
  
        <div class="post-actions">
          <button @click="likePost(post._id)">👍 Like ({{ post.likes }})</button>
        </div>
  
        <div class="comment-box">
          <input
            v-model="commentContent[post._id]"
            placeholder="Write a comment..."
          />
          <button @click="addComment(post._id)">Comment</button>
        </div>
  
        <div v-if="post.comments && post.comments.length" class="comments">
          <ul>
            <li v-for="(c, index) in post.comments" :key="index">
              {{ c.username }}: {{ c.content }}
            </li>
          </ul>
        </div>
      </div>
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
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    padding: 16px;
    margin-bottom: 24px;
  }
  
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右两边自动分开布局 */
  }
  
  .post-user {
    display: flex;
    align-items: center;
  }
  
  .post-user-info {
    display: flex;
    flex-direction: column;
  }
  
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }
  
  .post-time {
    font-size: 12px;
    color: #888;
  }
  
  .post-buttons button {
    margin-left: 8px;
  }
  
  .post-title {
    margin: 12px 0 4px;
    font-size: 18px;
    font-weight: bold;
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
  
  .comment-box input {
    flex: 1;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .comment-box button {
    padding: 6px 12px;
  }
  
  .comments {
    margin-top: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background-color: #f5f5f5;
    margin-bottom: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.5;
  }
  </style>
  