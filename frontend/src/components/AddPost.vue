<template>
  <el-card class="add-post-card" shadow="hover">
    <h2 class="add-post-title">Create a New Post</h2>
    <el-input v-model="title" placeholder="Post Title" class="add-post-input" clearable />
    <el-input
      v-model="content"
      type="textarea"
      :rows="3"
      maxlength="150"
      show-word-limit
      placeholder="Post Content"
      class="add-post-input"
    />
    <el-button type="primary" @click="submitPost" style="margin-top:12px;">Submit</el-button>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElNotification } from 'element-plus'
  
const title = ref('')
const content = ref('')
const emit = defineEmits(['refresh'])

async function submitPost() {
  if (!title.value || !content.value) {
    ElNotification.error({
      title: 'Warning',
      message: 'Please fill in all fields',
      type: 'warning',
      position: 'top-right'
    })
    return
  }
  await axios.post('http://localhost:3000/api/post', {
    title: title.value,
    content: content.value,
    author: localStorage.getItem('userId')
  })
  title.value = ''
  content.value = ''
  emit('refresh')
}
</script>

<style scoped>
.add-post-card {
  max-width: 700px;
  margin: 24px auto 16px auto;
  border-radius: 10px;
  background: rgba(255,255,255,0.98);
}
.add-post-title {
  margin-bottom: 12px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #6366f1;
}
.add-post-input {
  margin-bottom: 10px;
}
</style>
  