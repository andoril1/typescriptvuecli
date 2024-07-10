import axios from 'axios';
export async function getBlocks(id,height:number) {

    return await axios
        .get('https://pool.flazzard.com/api/pools/' + id + '/blocks?page=0&pageSize=' + height)
        .then((response) => {
              const poolData = response.data
              console.log("Return blocks ", poolData)
              return poolData
        })
}