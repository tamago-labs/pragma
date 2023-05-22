

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { ethers } from 'ethers'

import {PragmaABI} from "../abi/index.js"

class Worker {

    wallet
    contractAddress
    apiHost
    
    constructor() {
        const privateKey = process.env.PRIVATE_KEY
        this.contractAddress = process.env.CONTRACT_ADDRESS
        this.apiHost = process.env.API_HOST

        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
        
        this.wallet = new ethers.Wallet(privateKey, provider);
        
    }

    createCollection = async (payload) => {

        const { collectionName, ownerAddress } = payload

        const pragmaContract = new ethers.Contract(this.contractAddress, PragmaABI, this.wallet)

        const collectionId = Number(await pragmaContract.collectionCount())+1

        const tx = await pragmaContract.createCollection(
            ethers.utils.formatBytes32String(collectionName),
            `${this.apiHost}/collection/${collectionId}/retrieval`,
            ethers.utils.formatBytes32String(""),
            ownerAddress
        )
        console.log("Processing Tx : ", tx.hash)
        await tx.wait()

        console.log("Completed")

    }

    getAllCollection = async () => {
        const pragmaContract = new ethers.Contract(this.contractAddress, PragmaABI, this.wallet)

        const collectionCount = await pragmaContract.collectionCount()

        let output = []

        for (let i = 0; i < collectionCount ; i++) {
            const result = await pragmaContract.collections(i+1)

            const collection = {
                id : i+1,
                name : ethers.utils.parseBytes32String(result["name"]),
                retrievalUrl : result["retrievalUrl"],
                owner: result["owner"]
            }
            output.push(collection)
        }

        return output
    }

}

export default Worker