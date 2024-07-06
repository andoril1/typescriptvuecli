<template>
    
  <div class="container">
    <div class="row justify-content-center">
      <h2>connect</h2>
      <div class="col-auto" v-if="pools.pool">
          <div class="info-box bg-yellow-gradient">
                  <span class="info-box-text">
                      <h5>Connect your miner for {{ pools.pool.coin.name }}</h5>
                      <table style="margin: auto;">
                      <tr>
                          <th id="time">[Coin]</th>
                          <th id="one">[Algo]</th>
                          <th id="two" v-if="pools.pool.coin.website">[Website]</th>
                          <th id="three" v-if="pools.pool.coin.github">[Github]</th>
                          <th id="four">[Payout Scheme]</th>
                          <th id="five">[pools.Pool Fee]</th>
                      </tr>
                      <tr>
                          <td style="padding-right: 10px;">{{ pools.pool.coin.name }}</td>
                          <td style="padding-right: 10px;">{{ pools.pool.coin.algorithm }}</td>
                          <td style="padding-right: 10px;" v-if="pools.pool.coin.website"><a :href="pools.pool.coin.website"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pools.pool.coin.website.replace('https://', "") }}</td>
                          <td style="padding-right: 10px;" v-if="pools.pool.coin.github"><a :href="pools.pool.coin.github"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pools.pool.coin.github.replace('https://' , "") }}</td>
                          <td style="padding-right: 10px;">{{ pools.pool.paymentProcessing.payoutScheme }}</td>
                          <td style="padding-right: 10px;">{{pools.pool.poolFeePercent}}%</td>
                          
                      </tr>
                  </table>
                  <br>
                  <table style="margin:auto">
                      <tr>
                          <th>Select region</th>
                          <th>Select port</th>
                          <th>Select OS</th>
                      </tr>
                      <tr>
                          <td>
                              <select v-model="selectedRegion">
                                  <option>Europe</option>
                                  <option>North America</option>
                              </select>
                          </td>
                          <td>
                              <select v-model="selectedPort">
                                  <option v-for="(value, id) in pools.pool.ports" :key="id" :value="id">{{value.name}} - VarDiff: {{ value.varDiff.minDiff }} &harr; &infin;</option>
                              </select>
                          </td>
                          <td>
                              <select v-model="selectedOS">
                                  <option>HiveOS</option>
                                  <option>Windows</option>
                              </select>
                          </td>
                      </tr>
                  </table>
                  <br>
                  <h3 v-if="selectedPort && selectedRegion == 'Europe'">
                      <pre>stratum+tcp://eu.flazzard.com:{{selectedPort}}</pre>
                      <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                      <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button>
                  </h3>
                  <h3 v-if="selectedPort && selectedRegion == 'North America'">
                      <pre>stratum+tcp://na.flazzard.com:{{selectedPort}}</pre>
                      <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                          <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                      </button>
                  </h3>
                  </span>
              </div>
              <div class="info-box bg-yellow-gradient">
                  <span class="info-box-text">
                      <h3>Miner Configuration</h3>
                      <h2>Getting started</h2>
                      <hr />
                      <table style="margin:auto">
                          <h5>Requirements:</h5>
                          <ul>
                              <li>{{ pools.pool.coin.name }} Wallet address. </li>
                              <li>Mining software for {{ pools.pool.coin.algorithm }}</li>
                              <li>Compatible hardware</li>
                          </ul>        
                      </table>
                      <h5>Getting a wallet address:</h5>
                      <div v-if="pools.pool.coin.github && pools.pool.coin.family == 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from <a :href="pools.pool.coin.github" target="_blank">Github</a>
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <div v-else-if="pools.pool.coin.family == 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from {{ pools.pool.coin.name }} website or github.
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <div v-else-if="pools.pool.coin.family != 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from {{ pools.pool.coin.name }} website or github.
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <hr>
                      <h4>Miner Config</h4>
                      <div v-if="selectedOS == 'HiveOS'"><h5>HiveOS Config suggestions:</h5>
                          <hr>
                          <h5>Add wallet in HiveOS:</h5>
                          <br>
                          <table>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_top.png" style="width:450px;"></td>
                                  <th>Adding a new coin to HiveOS (wallets -> add wallet)</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_coin.png" style="width:450px;"></td>
                                  <th>Search for the coin or add it if it doesn't exist.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_address.png" style="width:450px;"></td>
                                  <th>Add your mining address for {{ pools.pool.coin.name }}.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_name.png" style="width:450px;"></td>
                                  <th>Add the name of your wallet.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_bottom.png" style="width:450px;"></td>
                                  <th>Press Create and your done!</th>
                              </tr>
                          </table>
                          <br>
                          <h5>Create FlightSheet</h5>
                          <div class="row main-row-1">
                              <div class="col-auto">
                                  <div class="row">
                                      <div class="col-auto">
                                          Add {{pools.pool.coin.name}}<br>-coin
                                      </div>
                                      <div class="col-auto">
                                          Add {{pools.pool.coin.name}}<br>-wallet
                                      </div>
                                      <div class="col-auto">
                                          Configure <br>in miner
                                      </div>
                                      <div class="col-auto">
                                          Select miner
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-auto">
                                          <img class="cardFlightsheet" src="./../assets/img/Hiveos_Karlsen1.png">
                                      </div>
                                  </div>
                                 
                              </div>
                              <div class="col-6">
                                  Choose a name and press enter
                              </div>
                          </div>
                          
                          <div class="row main-row-2">
                              <h2>Setup miner config</h2>
                          </div>
                          
                          <div class="row main-row-3">    
                              <div class="col-6">
                                  <img class="">
                              </div>
                              <div class="col-6">
                                  <div class="row">
                                      We recommned BZmienr for this coin.
                                  </div>
                                  <div class="row">
                                      Select Kaspa
                                  </div>
                                  <div class="row">
                                      Write...
                                  </div>
                                  <div class="row">
                                      Write...
                                  </div>
                              </div>
                          </div>
                          <table>
                              <tr>
                                  <th>Add {{pools.pool.coin.name}}<br>- coin</th>
                                  <th>Add {{pools.pool.coin.name}}<br>- wallet</th>
                                  <th>Configure <br>in miner</th>
                                  <th>Select miner</th>
                              </tr> 
                              <tr style="background-color:#363d45">
                                  <td><img src="./../assets/img/HiveOS/flightsheet_coin.webp" style="width:120px;"></td>
                                  <td><img src="./../assets/img/HiveOS/flightsheet_wallet.webp" style="width:120px;"></td>
                                  <td><img src="./../assets/img/HiveOS/flightsheet_pool.webp" style="width:120px;"></td>
                                  <td v-if="pools.pool.coin.algorithm == 'Ghostrider'"><img src="./../assets/img/HiveOS/flightsheet_XMRig.webp" style="width:120px;"></td>
                                  <td v-else-if="pools.pool.coin.algorithm == 'kHeavyHash' || pools.pool.coin.algorithm == 'KawPow'"><img src="./../assets/img/HiveOS/flightsheet_bzminer.webp" style="width:120px;"></td>
                                  <td v-else-if="pools.pool.coin.algorithm == 'Karlsenhash'"><img src="./../assets/img/HiveOS/flightsheet_rigel.webp" style="width:120px;"></td>
                              </tr>
                          </table>
                          <table>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/flightsheet_bottom.webp" style="width:487px;"></td>
                                  <th>Choose a name and Create flightsheet</th>
                              </tr>
                          </table>
                          <br>
                          <h5>Setup miner config</h5>
                          <br>
                          <div class="hiveosOutside">hello</div>
                          <table v-if="pools.pool.coin.algorithm == 'kHeavyHash'">
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_top.webp" style="width:450px;"></td>
                                  <th>We recommend Bzminer for this coin.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/bzminer_algo.webp" style="width:450px;"></td>
                                  <th>Select kaspa.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_wallet.webp" style="width:450px;"></td>
                                  <th>Write %WAL% to use your HiveOS wallet.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_worker.webp" style="width:450px;"></td>
                                  <th>Write %WORKER_NAME% to display workername</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_pool.webp" style="width:450px;"></td>
                                  <th>Add pool from above.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_extra.webp" style="width:450px;"></td>
                                  <th>Optional. Here we're dualmining zil, <br>theres also some OC Settings.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_bottom.webp" style="width:450px;"></td>
                                  <th>Press update to save changes.</th>
                              </tr>
                          </table>
                          <table v-else-if="pools.pool.coin.algorithm == 'Karlsenhash'">
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_top.webp" style="width:450px;"></td>
                                  <th>We recommend Rigel miner for this coin.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/karlsen_algo.webp" style="width:450px;"></td>
                                  <th>Select karlsenhash.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_wallet.webp" style="width:450px;"></td>
                                  <th>Write %WAL% to use your HiveOS wallet.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_worker.webp" style="width:450px;"></td>
                                  <th>Write %WORKER_NAME% to display workername
                                      <br>
                                      Pass: x or empty, input d=xxxx for static diff<br>
                                      (replace xxxx with desired difficulty)

                                  </th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_pool.webp" style="width:450px;"></td>
                                  <th>Add pool from above.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_extra.webp" style="width:450px;"></td>
                                  <th>Optional. Here we're dualmining zil, <br>theres also some OC Settings.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/karlsen_bottom.webp" style="width:450px;"></td>
                                  <th>Press Apply changes</th>
                              </tr>
                          </table>
                          <table v-else-if="pools.pool.coin.algorithm == 'KawPow'">
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_top.webp" style="width:450px;"></td>
                                  <th>We recommend bzminer miner for this coin.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/kawpow_algo.webp" style="width:450px;"></td>
                                  <th>Search and select kawpow.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_wallet.webp" style="width:450px;"></td>
                                  <th>Write %WAL% to use your HiveOS wallet.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_worker.webp" style="width:450px;"></td>
                                  <th>Write %WORKER_NAME% to display workername
                                      <br>
                                      Pass: x or empty, input d=xxxx for static diff<br>
                                      (replace xxxx with desired difficulty)

                                  </th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_pool.webp" style="width:450px;"></td>
                                  <th>Add pool from above.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_extra.webp" style="width:450px;"></td>
                                  <th>Optional. Here we're dualmining zil, <br>theres also some OC Settings.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/kawpow_bottom.webp" style="width:450px;"></td>
                                  <th>Press Apply changes</th>
                              </tr>
                          </table>
                          <table v-else-if="pools.pool.coin.algorithm == 'Ghostrider'">
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_top.webp" style="width:450px;"></td>
                                  <th>We recommend XMRIG(new) for this coin.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/Ghostrider_algo.webp" style="width:450px;"></td>
                                  <th>Search and select Ghostrider(RTM).</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_pool.webp" style="width:450px;"></td>
                                  <th v-if="selectedRegion == 'Europe'">Add pool: stratum+tcp://eu.flazzard.com:{{ selectedPort }} 
                                      <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                                          <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                                      </button>
                                  </th>
                                  <th v-if="selectedRegion == 'North America'">Add pool: stratum+tcp://na.flazzard.com:{{ selectedPort }} 
                                      <button @click="copyMe('na', selectedPort)" style="background-color: transparent; padding: 0px;">
                                          <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                                      </button>
                                  </th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_hugePages.webp" style="width:450px;"></td>
                                  <th>Set CPU hugepages to 1248.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_cpuConfig.webp" style="width:450px;"></td>
                                  <th>"cpu": {
                                      "ghostrider": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
                                      <br> 
                                      "huge-pages": true,
                                      <br>
                                      "hw-aes": null,
                                      <br>
                                      "priority": null,
                                      <br>
                                      "memory-pool": false,
                                      <br>
                                      "asm": true
                                     }</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_bottom.webp" style="width:450px;"></td>
                                  <th>Press Apply changes</th>
                              </tr>
                          </table>
                      </div>
                      <div v-else-if="selectedOS == 'Windows'">Windows config suggestions:
                          <div v-bind="setMiner(pools.pool.coin.algorithm)">
                              For {{ pools.pool.coin.name }} we recommend {{ minerName }} <a :href="minerLink" target="_blank">[Download here]</a>
                              <br> Choose the latest version and download to your PC / Miningrig
                              <div v-if="pools.pool.coin.algorithm == 'KawPow'">
                                  <hr>
                                  Either edit aipg.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCard">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  bzminer -a gamepass -w WALLET_ADDRESS -p stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} --nc 1
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pools.pool.coin.algorithm == 'Karlsenhash'">
                                  <hr>
                                  Either edit kls.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCard">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  rigel.exe -a karlsenhash -o stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} -u YOUR_KLS_WALLET -w my_rig --log-file
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pools.pool.coin.algorithm == 'kHeavyHash'">
                                  <hr>
                                  There doesnt appear to be a file for Kaspa in the {{ minerName }} folder,<br> so create one named kaspa.bat in the {{ minerName }} folder.
                                  <hr>
                                  <div class="codeCard">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  bzminer -a kaspa -w WALLET_ADDRESS -p stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} --nc 1
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pools.pool.coin.algorithm == 'Pyrin'">
                                  <hr>
                                  Either edit pyi.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCard">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  rigel.exe -a pyrinhash -o stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} -u YOUR_KLS_WALLET -w my_rig --log-file
                                  <br>
                                  pause
                                  </div>
                              </div>
                              Then save the batfile and double click to run it.<br>
                              Check out the miner's github for more commands.
                          </div>
                      </div>
                      <div v-else>[Miner OS unselected] please select from dropdown above</div>
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
const route = useRoute();
const id = ref(route.params.id);
const selectedRegion = ref("Europe");
const selectedPort = ref("");
const selectedOS = ref("HiveOS");
const minerName = ref("");
const minerLink = ref("");
const stratumPrefix = ref("");
function getPools() {
    axios
    .get('https://pool.flazzard.com/api/pools/' + id.value)
    .then((response) => {
        pools.value =response.data
        console.log("Returned Pools: ", response.data)
        selectedPort.value = Object.keys(pools.value.pool.ports)[0]
    })
    .catch((error) => {
        console.warn("getPools error: ", error)
    }) 
}
function setMiner(algorithm){
    if (algorithm == 'kHeavyHash'){
        minerName.value = 'Bzminer'
        minerLink.value = 'https://github.com/bzminer/bzminer/releases'
    }
    if(algorithm == 'Karlsenhash'){
        minerName.value = 'Rigel miner'
        minerLink.value = 'https://github.com/rigelminer/rigel/releases'
    }
    if(algorithm == 'KawPow'){
        minerName.value = 'Bzminer'
        minerLink.value = 'https://github.com/bzminer/bzminer/releases'
    }
    if(algorithm == 'Ghostrider'){
        minerName.value = 'XMRig(new)'
        minerLink.value = 'https://github.com/xmrig/xmrig/releases'
    }
}
watch(selectedRegion,(newValue,oldValue) => { 
    if(newValue != oldValue) {
        if(selectedRegion.value == 'Europe'){
            stratumPrefix.value = 'eu'
        }else if(selectedRegion.value == 'North America'){
            stratumPrefix.value = 'na'
        }
        
    }});
function copyMe(region,port){
  navigator.clipboard.writeText('stratum+tcp://' + region + '.flazzard.com:' + port);
}
onMounted(() => {
      getPools()
    })
  </script>