import { Pool } from '@/definitions/pool.model';
import axios from 'axios';
export async function getCoin(id, pool:Pool) {

    const response = await axios
        .get('https://pool.flazzard.com/api/pools/' + id)
        .then((response) => {
              pool = response.data.pool
              console.log("Returned Pool: ", pool)
              return pool
        })
}