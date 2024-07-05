<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios"
import {ref, computed, watch, onMounted} from 'vue'

const pools = ref([]);
const showPplns = ref(false);
const showSolo = ref(false);
const schemeButtonText = ref("SOLO");

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});

function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools')
            .then((response) => {
                pools.value =response.data.pools
                console.log("Returned Pools: ", response.data)
            })
            .catch((error) => {
                console.warn("getPools error: ", error)
            })
            
        }

onMounted(() => {
  getPools()
})
</script>
