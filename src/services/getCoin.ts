import axios from 'axios';
export async function getCoin(id) {

    return await axios
        .get('https://pool.flazzard.com/api/pools/' + id)
        .then((response) => {
              const poolData = response.data.pool
              console.log("Returned Pool: ", poolData)
              return poolData
        })
}