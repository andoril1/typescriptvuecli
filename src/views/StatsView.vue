<template>
  <div class="row justify-content-center">
    <div class="col-auto">
        <div class="info-box bg-yellow-gradient">
            <table style="margin: auto;" v-if="pool">
                <br>
                <tr>
                    <th id="time" style="padding-right: 10px;">[BlockChain]<br>[Height]</th>
                    <th id="time" style="padding-right: 10px;">[Pending]<br>[Blocks]</th>
                    <th id="time" style="padding-right: 10px;">[Confirmed]<br>[Blocks]</th>
                    <th id="time" style="padding-right: 10px;">[Coin]<br>[Price]</th>
                    <th id="time" style="padding-right: 10px;">[Block]<br>[Value]</th> 
                    <th id="time" style="padding-right: 10px;">[Block]<br>[Reward]</th>
                </tr>
                <tr>
                    <td style="padding-right: 10px;">{{ pool.networkStats.blockHeight }}</td>
                    <td style="padding-right: 10px;">{{ filterPending.length }}</td>
                    <td style="padding-right: 10px;">{{ pool.totalBlocks }}</td>
                    <td style="padding-right: 10px;">${{formatHashrate(coinPrice,7,"") }}</td>
                    <td style="padding-right: 10px;" v-if="filterConfirmed[0]">${{formatHashrate(coinPrice * filterConfirmed[0].reward,4,"")}}</td>
                    <td style="padding-right: 10px;" v-else>wait...</td>
                    <td style="padding-right: 10px;" v-if="filterConfirmed[0]">{{ formatHashrate(filterConfirmed[0].reward,1,pool.coin.symbol) }}</td>
                    <td style="padding-right: 10px;" v-else>wait...</td>
                </tr>
                <br>
                <tr>
                    <th id="time" style="padding-right: 10px;">[Connected]<br>[Peers]</th>
                    <th id="time" style="padding-right: 10px;">[Payment]<br>[Threshold]</th>
                    <th id="time" style="padding-right: 10px;">[Pool]<br>[Fee]</th>
                    <th id="time" style="padding-right: 10px;">[Pool]<br>[Effort]</th>
                    <th id="time" style="padding-right: 10px;">[Pool]<br>[TTF]</th>
                    <th id="time" style="padding-right: 10px;">[Total]<br>[Paid]</th>
                </tr>
                <tr>
                    <td style="padding-right: 10px;">{{ pool.networkStats.connectedPeers }}</td>
                    <td style="padding-right: 10px;">{{ pool.paymentProcessing.minimumPayment }} {{ pool.coin.symbol }}</td>
                    <td style="padding-right: 10px;">{{ pool.poolFeePercent }}%</td>
                    <td style="padding-right: 10px;" class="poolEffort">{{ formatHashrate(PoolEffort,2,"%") }}</td>
                    <td style="padding-right: 10px;">{{convertTime(pool.networkStats.networkHashrate / pool.poolStats.poolHashrate * pool.blockRefreshInterval) }}</td>
                    <td style="padding-right: 10px;">{{ formatHashrate(pool.totalPaid,3,"") }} [{{ pool.coin.symbol }}]</td>
                </tr>
                <br>
            </table>
        </div>
        <eChart />
    </div>  
</div>
  </template>
  
  <script setup lang="ts">
    //import axios from 'axios'
    import {ref,computed, watch, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    import eChart from './../components/eChart.vue'
    import {Pool} from '@/definitions/pool.model'
    import {getCoin} from '@/services/getCoin'
    import {getBlocks} from '@/services/getBlocks'
    import {setCoinPrice} from '@/services/setCoinPrice'
    //import {formatHashrate} from '@/services/formatHashrate'
    import {convertTime} from '@/services/convertTime'
    const pool = ref<Pool>();
    const blocks = ref([]);
    //const newBlocks = ref([]);
    const coinPrice = ref(0);
    const PoolEffort = ref(0);
    const route = useRoute();
    const id = ref(route.params.id);
    const effortClass =ref("");

    watch(blocks,(newValue,oldValue) => { 
      if(newValue != oldValue) {
          setTimeout(() => {
              updateData()
          }, 60000);
      }});

    function updateData() {            
        //getPools()
        //getBlocks()
        setupCoin(id.value)
    }

    async function setupCoin(coinId) {
    pool.value = await getCoin(coinId)
    //getNewBlocks()
    setupBlocks(id.value)
    //setPrice(pool.value.coin.symbol)
    setupCoinPrice(pool.value.coin.symbol)
    checkEffort(pool.value.coin.family,pool.value.poolEffort, pool.value.coin.name)
    }

    async function setupBlocks(coinId) {
    const height = ((pool.value.networkStats.blockHeight < 100) ? pool.value.networkStats.blockHeight : 100)
    blocks.value = await getBlocks(coinId, height)
    }

    async function setupCoinPrice(coinId) {
    coinPrice.value = await setCoinPrice(coinId)
    }
    
    /*
    function getPools() {
        axios
        .get('https://pool.flazzard.com/api/pools/' + id.value)
        .then((response) => {
              pool.value = response.data.pool
              //console.log("Returned Pool: ", pool.value)
              getNewBlocks()
              setPrice(pool.value.coin.symbol)
              checkEffort(pool.value.coin.family,pool.value.poolEffort, pool.value.coin.name)
        })
        .catch((error) => {
              console.warn("getPools error: ", error)
        })
    }
    
    function setPrice(ticker:string) {
      axios.get('https://api.xeggex.com/api/v2/market/getbysymbol/' + ticker + '%2FUSDT')
          .then((response) => {
              //set coin price
              coinPrice.value = response.data.lastPrice
              //console.log("Returned coin price: ", coinPrice.value)
          })
          .catch((error) => {
              console.warn("getPrice error: ", error)
              //if price does not exist.
              coinPrice.value = 0;
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
      
  function getNewBlocks() {
      var height:number
      height = ((pool.value.networkStats.blockHeight < 100) ? pool.value.networkStats.blockHeight : 100)
      axios
      .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks?page=0&pageSize=' + height)
      .then((response) => {
          newBlocks.value =response.data
          console.log("Returned newBlocks: ", response.data)

      })
      .catch((error) => {
          console.warn("getBlocks error: ", error)
      })
      
  }
  */
    const filterPending = computed(function() {
          return blocks.value.filter((block) => block.status=='pending')
    });
    const filterConfirmed = computed(function() {
          return blocks.value.filter((block) => block.status=='confirmed')
    });
    
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
    
// String Convert -> Seconds
  function readableSeconds(t) {
      var seconds = Math.floor(t % 3600 % 60);
      var minutes = Math.floor(t % 3600 / 60);
      var hours = Math.floor(t % 86400 / 3600);
      var days = Math.floor(t % 604800 / 86400);	
      var weeks = Math.floor(t % 2629799.8272 / 604800);
      var months = Math.floor(t % 31557597.9264 / 2629799.8272);
      var years = Math.floor(t / 31557597.9264);

      var sYears = years > 0 ? years + ((years== 1) ? "y" : "y") : "";
      var sMonths = months > 0 ? ((years > 0) ? " " : "") + months + ((months== 1) ? "mo" : "mo") : "";
      var sWeeks = weeks > 0 ? ((years > 0 || months > 0) ? " " : "") + weeks + ((weeks== 1) ? "w" : "w") : "";
      var sDays = days > 0 ? ((years > 0 || months > 0 || weeks > 0) ? " " : "") + days + ((days== 1) ? "d" : "d") : "";
      var sHours = hours > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0) ? " " : "") + hours + (hours== 1 ? "h" : "h") : "";
      var sMinutes = minutes > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0) ? " " : "") + minutes + (minutes == 1 ? "m" : "m") : "";
      var sSeconds = seconds > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0 || minutes > 0) ? " " : "") + seconds + (seconds == 1 ? "s" : "s") : ((years < 1 && months < 1 && weeks < 1 && days < 1 && hours < 1 && minutes < 1 ) ? " Few milliseconds" : "");
      if (seconds > 0) return sYears + sMonths + sWeeks + sDays + sHours + sMinutes + sSeconds;
      else return 'unknown';
  }
  function checkEffort(family:string, poolEffort:number, coinName:string) {
      if (family == "alephium") {
          PoolEffort.value = Number(poolEffort) * Math.pow(2, 30) * 100;
          // Bitcoin (family)
      } else if (family == "bitcoin") {
          // Vertcoin (coin)
          if (coinName == "Vertcoin") {
          PoolEffort.value = (Number(poolEffort) / 256) * 100;
          // VishAI (coin)
          } else if (coinName == "Vishai") {
          PoolEffort.value = (Number(poolEffort) / 65536) * 100;
          // Reaction (coin)
          } else if (coinName == "Reaction") {
          PoolEffort.value = (Number(poolEffort) / 65536) * 100;
          } else {
          PoolEffort.value = Number(poolEffort) * 100;
          }
          // Kaspa (family)
      } else if (family == "kaspa") {
          PoolEffort.value = Number(poolEffort) * Math.pow(2, 31) * 100;
      } else {
          PoolEffort.value = Number(poolEffort) * 100;
      }
      
      if (PoolEffort.value >= 500) {
        //effort4
          effortClass.value = "#FF4500";
      } else if (PoolEffort.value >= 300) {
        //effort3
          effortClass.value = "#FF6347";
      } else if (PoolEffort.value >= 200) {
        //effort2
          effortClass.value = "#FF8C00";
      } else if (PoolEffort.value >= 100) {
        //effort1
          effortClass.value = "#FFA500";
      }
      else {
        //effort0
          effortClass.value = "#50C878";
      }
      console.log('EffortClass value', effortClass)
      return PoolEffort.value
    }
    onMounted(() => {
      //getPools()
      setupCoin(id.value)
      //setupBlocks(id.value)
    })

</script>
<style>
</style>