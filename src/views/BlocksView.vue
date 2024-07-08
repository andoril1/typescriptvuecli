<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-auto" v-if="pools.pool">
          <div class="info-box bg-yellow-gradient">
                  <span class="info-box-text">
                      <br>
                      <h5>Blocks found by Pool - {{ pools.pool.coin.name }} [{{ pools.pool.coin.symbol }}]</h5>
                      <table>
                      <tr>
                          <th id="time">Time</th>
                          <th id="one">Mining Adress</th>
                          <th id="two">Height</th>
                          <th id="three">Net-Diff</th>
                          <th id="four">Reward</th>
                          <th id="five">Status</th>
                          <th id="six">Progress</th>
                      </tr>
                      <tr v-for="block in blocks" :key="block.id">
                          <td style="padding-right: 10px;"><span v-html="renderTimeAgoBox(block.created)"></span></td>
                          <td style="padding-right: 10px;"><a :href="pools.pool.addressInfoLink.replace(pools.pool.address, block.miner)" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>[{{block.miner.substring(0, 8)}}...{{ block.miner.substring(block.miner.length - 8) }}]</td>
                          <td style="padding-right: 10px;">{{ block.blockHeight }}</td>
                          <td style="padding-right: 10px;">{{ formatHashrate(block.networkDifficulty,2, "") }}</td>
                          <td style="padding-right: 10px;">{{ formatHashrate(block.reward,1,"") }} {{pools.pool.coin.symbol}}</td>
                          <td style="padding-right: 10px;" v-if="block.confirmationProgress * 100 > 0"><a :href="block.infoLink" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ block.status }}</td> 
                          <td style="padding-right: 10px;" v-if="block.confirmationProgress * 100 <= 0"><a :href="block.infoLink" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ ' new ' }}</td>    
                          <td style="padding-right: 10px;">{{ formatHashrate(block.confirmationProgress * 100, 2, '%') }}</td>
                      </tr>
                  </table>
                  </span>
              </div>
          </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios'
  import {ref, watch, onMounted} from 'vue'
  import {useRoute} from 'vue-router'
          
          const pools = ref([]);
          const blocks = ref([]);
          const route = useRoute();
          const id = ref(route.params.id);
          function getPools() {
              axios
              .get('https://pool.flazzard.com/api/pools/' + id.value)
              .then((response) => {
                  pools.value =response.data
                  //console.log("Returned Pools: ", pools.value)
              })
              .catch((error) => {
                console.warn("getPools error: ", error)
              })
              
          }
          function getBlocks() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks')
            .then((response) => {
                blocks.value =response.data
                //console.log("Returned Blocks: ", response.data)

            })
            .catch((error) => {
                console.warn("getBlocks error: ", error)
            })
        }
        watch(blocks,(newValue,oldValue) => { 
              if(newValue != oldValue) {
                  setTimeout(() => {
                      getBlocks()
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
        function getTimeAgoAdmin(date:Date) {
            date=new Date(date)
        if (!date || isNaN(date.getTime())) {
            return "NEVER";
        }
        var now = new Date();
        var diff = now.getTime() - date.getTime();
        var seconds = Math.floor(diff / 1000);
        if (seconds < 60) {
            return "NOW";
        }
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 30);
        if (months >= 1) {
            return months + " month" + (months > 1 ? "s" : "");
        } else if (days >= 2) {
            return days + " day" + (days > 1 ? "s" : "");
        } else if (hours >= 48) {
            return "2 days";
        } else if (hours >= 2) {
            return hours + " hours";
        } else if (minutes >= 2) {
            return minutes + " min" + (minutes > 1 ? "s" : "");
        } else {
            return "NOW";
        }
    }
        function renderTimeAgoBox(date:Date) {
        var textColor = 'white';
        var borderRadius = '.25em';
        var bgColor = '';
        var timeAgo = getTimeAgoAdmin(date);
        if (timeAgo === "NEVER" || timeAgo === "NOW") {
            bgColor = (timeAgo === "NEVER") ? '#666666' : '#00c000';
        } else if (timeAgo.includes("month")) {
            bgColor = '#d1941f'; // Orange for months
        } else if (timeAgo.includes("day")) {
            bgColor = '#c0c000'; // Yellow for days
        } else if (timeAgo.includes("hour")) {
            bgColor = '#008000'; // Dark green for hours
        } else if (timeAgo.includes("min")) {
            bgColor = '#00c000'; // Bright green for minutes
        }
        return "<div class='d-flex align-items-center justify-content-center' style='background-color:" + bgColor + "; color: " + textColor + "; border-radius: " + borderRadius + "; width: 100%; padding: 2px; font-size: 75%; font-weight: 700; text-align: center; height: 20px;'>" + timeAgo + "</div>";
        }
        onMounted(() => {
          getPools()
          getBlocks()
        })
      </script>