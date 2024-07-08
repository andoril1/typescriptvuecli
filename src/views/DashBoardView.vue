<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-auto" v-if="pools.pool">
            <div class="info-box bg-yellow-gradient">
                <span class="info-box-text">
                    <h5>Your Dashboard - {{ pools.pool.coin.name }} [{{ pools.pool.coin.symbol }}]</h5>
                    <hr>
                    <h5>{{headerText}}</h5>
                    <input v-model="walletAddress" type="input" style="width: 85%" id="walletAddress"><input type="submit" @click="checkWallet()" autocomplete="on" class="btn btn-info btn-fill btn-sm">
                    <div v-if="blocks && minerBlocks.length">
                        <table style="margin: auto;">
                            <tr>
                                <th id="time" style="padding-right: 10px;">[Pending Shares]</th>
                                <th id="time" style="padding-right: 10px;">[Pending Balance]</th>
                                <th id="time" style="padding-right: 10px;">[Payout Today]</th>
                                <th id="time" style="padding-right: 10px;">[Lifetime Balance]</th>
                                <th id="time" style="padding-right: 10px;">[Last Payment]</th>
                            </tr>
                            <tr>
                                <td style="padding-right: 10px;">{{ formatHashrate(blocks.pendingShares,2,"") }}</td>
                                <td style="padding-right: 10px;">{{ formatHashrate(blocks.pendingBalance,2,"") }}</td>
                                <td style="padding-right: 10px;">{{ formatHashrate(blocks.todayPaid,2,"") }}</td>
                                <td style="padding-right: 10px;">{{ formatHashrate(blocks.totalPaid,2,"") }}</td>
                                <td style="padding-right: 10px;"><a :href="blocks.lastPaymentLink" style="text-decoration: none;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a><span v-html="renderTimeAgoBox(blocks.lastPayment)"></span></td>
                            </tr>
                            <tr>
                                <th id="time" style="padding-right: 10px;">[Personal TTF]</th>
                                <th id="time" style="padding-right: 10px;">[24 Hour Estimate]</th>
                            </tr>
                            <tr>
                                <td style="padding-right: 10px;">{{readableSeconds(pools.pool.networkStats.networkHashrate / minerHashrate * pools.pool.blockRefreshInterval) }}</td>
                                <td style="padding-right: 10px;">{{ formatHashrate(blocks.pendingBalance,2,"") }}</td>
                            </tr>
                        </table>
                    </div>
                </span>
                </div>
                <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <div>
                            <hr>
                            <button class="btn btn-info btn-fill btn-sm" @click="buttonString = 'blocks'">Blocks</button>
                            <button class="btn btn-info btn-fill btn-sm" @click="buttonString = 'payment'">Payments</button>
                            <button class="btn btn-info btn-fill btn-sm" @click="buttonString = 'miners'">Miners</button>
                            <button class="btn btn-info btn-fill btn-sm" @click="buttonString = 'customPayout'">Custom Payout</button>
                            <h4 v-if="buttonString == 'blocks'">Blocks found by you :</h4>
                            <h4 v-if="buttonString == 'payment'">Payments made to you :</h4>
                            <h4 v-if="buttonString == 'miners'">Your active miners :</h4>
                            <h4 v-if="buttonString == 'customPayout'">Your custom payout setting :</h4>
                            <hr>
                            <table style="margin:auto">
                                <div v-if="buttonString == 'blocks'">
                                    <tr>
                                        <th id="time">[Time]</th>
                                        <th id="two">[Height]</th>
                                        <th id="three">[Net-Diff]</th>
                                        <th id="four">[Effort]</th>
                                        <th id="four">[Reward]</th>
                                        <th id="five">[Block Status]</th>
                                        <th id="six">[Block Progress]</th>
                                    </tr>
                                    
                                    <tr v-for="minerBlock in minerBlocks" :key="minerBlock.id">
                                        <td style="padding-right: 10px;"><span v-html="renderTimeAgoBox(minerBlock.created)"></span><hr></td>
                                        <td style="padding-right: 10px;">{{minerBlock.blockHeight}}<hr></td>
                                        <td style="padding-right: 10px;">{{ formatHashrate(minerBlock.networkDifficulty,1, "") }}<hr></td>
                                        <td style="padding-right: 10px;">coming soon...<hr></td>
                                        <td style="padding-right: 10px;">{{minerBlock.reward}}<hr></td>
                                        <td style="padding-right: 10px;">{{minerBlock.status}} <a :href="minerBlock.infoLink" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a><hr></td>
                                        <td style="padding-right: 10px;">{{ formatHashrate(minerBlock.confirmationProgress * 100, 2, '%') }}<hr></td>     
                                    </tr>
                                </div>
                                <div v-if="buttonString == 'payment'">
                                    <tr>
                                        <th id="time">[Time]</th>
                                        <th id="two">[Amount]</th>
                                        <th id="three">[Confirmation]</th>
                                    </tr>
                                    <tr v-for="minerPayment in minerPay" :key="minerPayment.id">
                                        <td style="padding-right: 10px;"><span v-html="renderTimeAgoBox(minerPayment.created)"></span><hr></td>
                                        <td style="padding-right: 10px;">{{formatHashrate(minerPayment.amount,2,"")}}<hr></td>
                                        <td style="padding-right: 10px;"><a :href="minerPayment.transactionInfoLink" target="_blank">{{minerPayment.transactionConfirmationData.substring(0, 8)}}...{{minerPayment.transactionConfirmationData.substring(minerPayment.transactionConfirmationData.length - 8) }}]</a><hr></td>
                                        
                                    </tr>
                                </div>
                                <div v-if="buttonString == 'miners'">
                                        <tr>
                                            <th id="one">[Worker name]</th>
                                            <th id="two">[Hashrate]</th>
                                            <th id="three">[Shares per second]</th>
                                            <th id="three">Total Hashrate: {{formatHashrate(minerHashrate, 2, "")}}</th>

                                        </tr>
                                        <tr v-for="(_id,value) in minerPerformance[minerPerformance.length -1].workers" :key="_id">
                                            <td style="padding-right: 10px;">[{{ value }}]<hr></td>
                                            <td style="padding-right: 10px;">{{formatHashrate(_id.hashrate,2,"H/s")}}<hr></td>
                                            <td style="padding-right: 10px;">{{formatHashrate(_id.sharesPerSecond, 2,"S/s")}}<hr></td>
                                        </tr>
                                </div>
                                <div v-if="buttonString == 'customPayout'">
                                    <tr>
                                        <th id="one">[Current Payout Limit]</th>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 10px;">[{{ minerSettings.paymentThreshold }} {{ pools.pool.coin.symbol }}]<hr></td>
                                    </tr>
                                    <tr>
                                        <th id="one">[Enter ip-address]</th>
                                        
                                        <th id="one">[Enter new amount]</th>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 10px;"><input v-model="ipAddress" type="input" style="width: 120px" id="ipAddress"></td>
                                        <td style="padding-right: 10px;"><input v-model="thresholdAmount" type="input" style="width: 120px" id="thresholdAmount"></td>
                                        <input type="submit" autocomplete="on" class="btn btn-info btn-fill btn-sm" @click="setMinerThreshold()">
                                    </tr>
                                </div>
                            </table> 
                        </div>
                    </span>
            </div>
        </div>
    </div>
</div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios'
import {ref,watch, onMounted} from 'vue'
import {useRoute} from 'vue-router'        
        const pools = ref([]);
        const blocks = ref([]);
        const minerBlocks = ref([]);
        const minerPay = ref([]);
        const minerPerformance = ref([]);
        let minerHashrate = ref(0);
        const minerSettings = ref([]);
        const route = useRoute();
        const id = ref(route.params.id);
        const walletAddress = ref("");
        const ipAddress = ref("");
        const thresholdAmount = ref(""); 
        const buttonString =ref("blocks");
        let headerText =ref("Please input your address to load stats");

        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools/' + id.value)
            .then((response) => {
                pools.value =response.data
                //console.log("Returned Pools: ", response.data)
            })
            .catch((error) => {
                console.warn("getPools error: ", error)
            })
            
        }
        function getBlocks() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value)
            .then((response) => {
                blocks.value =response.data
                //console.log("Returned Blocks: ", response.data)

            })
            .catch((error) => {
                console.warn("getBlocks error: ", error)
            })           
        }
        function getMinerBlocks() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value + '/blocks' )
            .then((response) => {
                minerBlocks.value =response.data
                //console.log("Returned MinerBlocks: ", response.data)
            })
            .catch((error) => {
                console.warn("getMinerBlocks error: ", error)
            })           
        }
        function getMinerPay() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value + '/payments' )
            .then((response) => {
                minerPay.value =response.data
                //console.log("Returned MinerPay: ", response.data)
            })
            .catch((error) => {
                console.warn("getMinerPay error: ", error)
            })           
        }
        function getMinerPerformance() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value + '/performance' )
            .then((response) => {
                minerPerformance.value =response.data
                console.log("Returned MinerPerformance: ", response.data)
            })
            .catch((error) => {
                console.warn("getMinerPerformance error: ", error)
            })           
        }
        function getMinerSettings() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value + '/settings' )
            .then((response) => {
                minerSettings.value =response.data
                //console.log("Returned MinerSettings: ", response.data)
            })
            .catch((error) => {
                console.warn("getMinerSettings error: ", error)
            })           
        }
        function setMinerThreshold() {
            axios
            .post('https://pool.flazzard.com/api/pools' + '/' + id.value + '/' + 'miners' + '/' + walletAddress.value + '/settings', 
            {settings: {
                PaymentThreshold: thresholdAmount.value
            },
            ipAddress: ipAddress.value })
            .then((response) => {
                //console.log("Returned MinerThreshold: ", response.data)
                getMinerSettings()
            })
            .catch((error) => {
                console.warn("getMinerThreshold error: ", error)
            })           
        }
        watch(blocks,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                setTimeout(() => {
                    getBlocks()
                }, 60000);
        }});
        watch(buttonString,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                //console.log("Returned buttonString: ", buttonString)
        }});
        watch(headerText,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                return headerText
        }});
        function checkWallet() {
            headerText.value = 'Wallet loaded!';
            //console.log(headerText)
            getBlocks()
            getMinerBlocks()
            getMinerPay()
            getMinerPerformance()
            getMinerSettings()
        }
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
        onMounted(() => {
          getPools()
        })
  </script>