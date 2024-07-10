import axios from 'axios';
export async function setCoinPrice(ticker) {

    return await axios
        .get('https://api.xeggex.com/api/v2/market/getbysymbol/' + ticker + '%2FUSDT')
        .then((response) => {
              const coinData = response.data.lastPrice
              console.log("Returned Pool: ", coinData)
              return coinData
        })
        .catch((error) => {
            console.warn("getPrice error: ", error)
            //if price does not exist.
            const coinData = 0;
            return coinData
        })  
}