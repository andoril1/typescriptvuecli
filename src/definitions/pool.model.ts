export interface Pool {
    id: string
    //coin: // Need to define a separate Coin object
    //ports: // Need to define a separate Ports object
    //paymentProcessing: // Need to define a separate object
    clientConnectionTimeout: number
    jobRebroadcastTimeout: number
    blockRefreshInterval: number
    poolFeePercent: number
    address: string
    addressInfoLink: string // Maybe use URL
    //poolStats: // Need to define a separate object
    //networkStats: // Need to define a separate object
    //topMiners: // This is an array it will need a definition if the values are objects (not number or string)
    totalPaid: number
    totalBlocks: number 
    lastPoolBlockTime: Date
    poolEffort: number
  }