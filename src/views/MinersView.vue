<template>
  <div class="row d-flex justify-content-center">
    <div class="col-auto" v-if="pools.pool">
        <div class="info-box bg-yellow-gradient">
                <span class="info-box-text">
                    <h3>Our Top Miners for {{ pools.pool.coin.name }}[{{ pools.pool.coin.symbol }}]</h3>
                    <hr>
                    <table style="margin: auto">
                        <tr v-if="pools.pool.topMiners[0]">
                            <th id="left">Miner Adress:</th>
                            <th id="center">Hashrate</th>
                            <th id="right">Shares Per Second</th>
                        </tr>
                        <h5 v-else>No miners available</h5>
                        <tr v-for="(value,id) in pools.pool.topMiners" :key="id">
                            <td style="padding-right: 10px;"><a :href="pools.pool.addressInfoLink.replace(pools.pool.address, value.miner)" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>[{{value.miner.substring(0, 8)}}...{{ value.miner.substring(value.miner.length - 8) }}]</td>
                            <td style="width:90%">{{ formatHashrate(value.hashrate,2,"H/s") }}</td>
                            <td style="white-space: nowrap">{{ formatHashrate(value.sharesPerSecond,2,"") }} {{ pools.pool.coin.explorer }}</td>
                          </tr>
                    </table>
                </span>
            </div>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios'
  import {ref, watch, onMounted} from 'vue'
  import {useRoute} from 'vue-router'          
          const pools = ref([]);
          const route = useRoute();
          const id = ref(route.params.id);
          function getPools() {
              axios
              .get('https://pool.flazzard.com/api/pools/' + id.value)
              .then((response) => {
                  pools.value =response.data
                  console.log("Returned Pools: ", pools.value)
              })
              .catch((error) => {
                  console.log(error)
              })  
          }
          watch(pools,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                setTimeout(() => {
                    getPools()
                }, 60000);
          }});
          function formatHashrate(value:number, decimal:number, unit:string) {
        if (value === 0) {
            return "0 " + unit;
        } else {
            var si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
            { value: 1e21, symbol: "Z" },
            { value: 1e24, symbol: "Y" }
            ];
            for (var i = si.length - 1; i > 0; i--) {
            if (value >= si[i].value) {
                break;
            }
            }
            return ((value / si[i].value).toFixed(decimal).replace(/.0+$|(.[0-9]*[1-9])0+$/, "$1") + " " + si[i].symbol + unit);
            }
        }
        onMounted(() => {
          getPools()
        })
  </script>