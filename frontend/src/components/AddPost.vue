<template>
    <div class="add-post">
      <h2>Create a New Post</h2>
      <input v-model="title" placeholder="Post Title" />
      <textarea v-model="content" placeholder="Post Content" maxlength="150"></textarea>
      <button @click="submitPost">Submit</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const content = ref('')
const emit = defineEmits(['refresh'])

async function submitPost() {
  if (!title.value || !content.value) {
    alert('Title and Content are required')
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
.add-post {
  margin: auto;
  margin-bottom: 20px;
  width: 90%;
  box-sizing: border-box;
}

input, textarea{
  display: block;
  margin-bottom: 10px;
  width: 75%;
}

textarea {
  resize: none;
}
</style>
  