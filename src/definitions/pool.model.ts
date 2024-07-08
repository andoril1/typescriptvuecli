import { Coin } from "./coin.model"
import { Networkstats } from "./networkStats.model"
import { Paymentprocessing } from "./paymentProcessing.model"
import { Poolstats } from "./poolStats.model"
export interface Pool {
    id: string
    coin: Coin
    //ports: // Need to define a separate Ports object
    paymentProcessing: Paymentprocessing
    clientConnectionTimeout: number
    jobRebroadcastTimeout: number
    blockRefreshInterval: number
    poolFeePercent: number
    address: string
    addressInfoLink: string // Maybe use URL
    poolStats: Poolstats
    networkStats: Networkstats
    //topMiners: // This is an array it will need a definition if the values are objects (not number or string)
    totalPaid: number
    totalBlocks: number 
    lastPoolBlockTime: Date
    poolEffort: number
  }