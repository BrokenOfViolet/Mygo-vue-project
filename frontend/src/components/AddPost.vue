<template>
    <div class="add-post">
      <h2>Create a New Post</h2>
      <input v-model="title" placeholder="Post Title" />
      <textarea v-model="content" placeholder="Post Content" maxlength="150"></textarea>
      <button @click="submitPost">Submit</button>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    async submitPost() {
      if (!this.title || !this.content) {
        alert('Title and Content are required')
        return
      }
      await axios.post('http://localhost:3000/api/post', {
        title: this.title,
        content: this.content,
        author: localStorage.getItem('userId')
      })
      this.title = ''
      this.content = ''
      this.$emit('refresh') // 通知父组件刷新帖子列表
    }
  }
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
  