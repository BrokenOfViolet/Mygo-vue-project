<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const name = 'App'
</script>

<style>
* {
  font-family: Source Code Pro, Consolas;
}

</style>