

import * as dotenv from 'dotenv'
import { ethers } from 'ethers'
import Db from "./db.js"

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256"; 

import { PragmaABI } from "../abi/index.js"
import { slugify } from '../helpers/index.js'

dotenv.config()

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

        const collectionId = Number(await pragmaContract.collectionCount()) + 1

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

    syncCollection = async (payload) => {

        const { collection } = payload

        const { id, name } = collection

        const db = new Db(slugify(name))
        const allItems = await db.getAllItems()

        const leaves = allItems.map((item) => ethers.utils.keccak256(ethers.utils.solidityPack(["string", "string"], [item["_id"], item.pageContent])))

        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
        const hexRoot = tree.getHexRoot()

        console.log(hexRoot)

        const pragmaContract = new ethers.Contract(this.contractAddress, PragmaABI, this.wallet)

        const tx = await pragmaContract.updateCollectionRoot(
            id,
            hexRoot
        )
        console.log("Processing Tx : ", tx.hash)
        await tx.wait()

        console.log("Completed")

    }



    getAllCollection = async () => {
        const pragmaContract = new ethers.Contract(this.contractAddress, PragmaABI, this.wallet)

        const collectionCount = await pragmaContract.collectionCount()

        let output = []

        for (let i = 0; i < collectionCount; i++) {

            const collectionId = i + 1

            const result = await pragmaContract.collections(collectionId)

            const name = ethers.utils.parseBytes32String(result["name"])
            
            let totalDocs = 0

            try {
                const db = new Db(slugify(name))
                totalDocs = await db.length()
            } catch (e) {
                console.log(e)
            }

            const collection = {
                id: collectionId,
                name,
                totalDocs,
                root : result[3] ,
                retrievalUrl: result["retrievalUrl"],
                owner: result["owner"]
            }
            output.push(collection)
        }

 

        return output
    }

    query = async (name, text, option) => {

        const db = new Db(slugify(name))

        if (option === "search") {
            return await db.similaritySearch(text)
        } else if (option === "qa") {
            return await db.qa(text)
        } else if (option === "summary") {
            return await db.summary()
        }

    }

}

export default Worker