<template>
    <div class="container">
      <div class="row">
        <div class ="navBar" v-show="($route.params.id)">
            <router-link to="/"><button class="btn btn-info btn-fill btn-sm">Home</button></router-link> |
            <!--
            <router-link :to="{ name: 'stats', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Stats</button>
            </router-link> |
            <router-link :to="{ name: 'dashboard', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Dashboard</button>
            </router-link> |
            <router-link :to="{ name: 'miners', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Miners</button>
            </router-link> |
            <router-link :to="{ name: 'blocks', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Blocks</button> 
            </router-link> |
            <router-link :to="{ name: 'payments', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Payments</button>
            </router-link> |
            <router-link :to="{ name: 'connect', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Connect</button>
            </router-link> |
            <router-link :to="{ name: 'FAQ', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">FAQ</button>
            </router-link> |
            <router-link :to="{ name: 'support', params: { id: ($route.params.id) } }">
              <button class="btn btn-info btn-fill btn-sm">Support</button>
            </router-link>-->        
        </div>  
      </div>
    </div>
  </template>
  <script setup lang="ts">
  </script>