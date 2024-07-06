<template>
  <navMenu/>
  <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  
  </nav>
-->
  <div id ="container" style="min-height: 864px; height: auto; min-width: 800px;">
    <router-view></router-view>
</div>
</template>

<script>
import navMenu from '@/components/NavMenu.vue';
export default{
  components: {navMenu}
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
