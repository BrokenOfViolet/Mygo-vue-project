<template>
    <div>
      <!-- 头部导航 -->
      <div class="forum-header">
        <h1>Forum</h1>
        <div class="user-info">
          <span>{{ username }}</span>
          <button @click="goToProfile">我的主页</button>
        </div>
      </div>
  
      <!-- 发帖与帖子列表 -->
      <AddPost @refresh="fetchPosts" />
      <PostList :posts="posts" @refresh="fetchPosts" />
    </div>
  </template>
  
  <script>
  import PostList from '@/components/PostList.vue';
  import AddPost from '@/components/AddPost.vue';
  import axios from 'axios';
  
  export default {
    components: {
      PostList,
      AddPost
    },
    data() {
      return {
        posts: [],
        username: ''
      };
    },
    methods: {
      async fetchPosts() {
        const res = await axios.get('http://localhost:3000/api/post');
        this.posts = res.data;
      },
      goToProfile() {
        this.$router.push({ path: '/profile', query: { user: this.username } });
      }
    },
    mounted() {
      this.username = localStorage.getItem('username') || 'Guest';
      this.fetchPosts();
    }
  };
  </script>
  
  <style scoped>
  .forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-info span {
    font-weight: bold;
  }
  
  .user-info button {
    padding: 6px 10px;
    border: none;
    background-color: #4caf50;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
  </style>
  