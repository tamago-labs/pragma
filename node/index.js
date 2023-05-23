
import * as fastq from "fastq";
import express from "express";
import cors from "cors"
// import routes from "./routes/index.js"
import Worker from "./lib/worker.js";
import Db from "./lib/db.js"
import { ethers } from "ethers";
import { slugify } from "./helpers/index.js"

import 'dotenv/config'


const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5000)
    })
}

const onWorker = async (args) => {

    console.log(args)

    const { task, payload } = args

    const worker = new Worker()

    switch (task) {
        case "new_collection":
            await worker.createCollection(payload)
            break
        case "proof_sync":
            await worker.syncCollection(payload)
            break

    }

}


// Queue
const queue = fastq.promise(onWorker, 1)

// API

export const app = express();

app.use(express.json());
app.use(cors())

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})

app.get('/collections', async (req, res) => {

    const worker = new Worker()
    const collections = await worker.getAllCollection()

    return res.status(200).json({ status: "ok", collections });
});

app.post('/collection/new', (req, res) => {

    const { body } = req
    const { message, signature, collectionName } = body

    const ownerAddress = ethers.utils.verifyMessage(message, signature)

    queue.push({
        task: "new_collection",
        payload: {
            collectionName,
            ownerAddress
        }
    })

    return res.status(200).json({ status: "ok" });
});

app.post('/collection/:id', async (req, res) => {

    const { body, params } = req
    const { id } = params
    const { message, signature, docs, items } = body

    const ownerAddress = ethers.utils.verifyMessage(message, signature)

    const worker = new Worker()

    const collections = await worker.getAllCollection()

    const col = collections.find(item => Number(item.id) === Number(id))

    const onProofSync = () => {
        queue.push({
            task: "proof_sync",
            payload: {
                collection: col
            }
        })
    }

    if (col) {

        if (col.owner.toLowerCase() !== ownerAddress.toLowerCase()) {
            return res.status(400).json({ status: "error", error: "Not authorize to add items" });
        }

        const db = new Db(slugify(col.name), true)


        if (docs) {
            await db.addDocs(docs)
            onProofSync()
            return res.status(200).json({ status: "ok", collection: col.name });
        } else {
            await db.addItems(
                items.map(item => item.id),
                items.map(item => item.content),
                []
            )
            onProofSync()
            return res.status(200).json({ status: "ok", collection: col.name, addedItems: items });
        }


    } else {
        return res.status(400).json({ status: "error", error: "Given ID is invalid" });
    }

});


app.get('/collection/:id', async (req, res) => {

    const { params } = req
    const { id } = params

    const worker = new Worker()
    const collections = await worker.getAllCollection()
    const col = collections.find(item => Number(item.id) === Number(id))

    if (!col) {
        return res.status(400).json({ status: "error", error: "Given ID is invalid" });
    }

    const db = new Db(slugify(col.name))
    const items = await db.getAllItems()

    return res.status(200).json({ status: "ok", items });
})

app.get('/query/:id', async (req, res) => {

    const { params, query } = req
    const { id } = params
    const { q, option } = query

    const worker = new Worker()
    const collections = await worker.getAllCollection()
    const col = collections.find(item => Number(item.id) === Number(id))

    if (!col) {
        return res.status(400).json({ status: "error", error: "Given ID is invalid" });
    }

    if (!["qa", "summary", "search"].includes(option)) {
        return res.status(400).json({ status: "error", error: "Option is invalid" });
    }

    const result = await worker.query(col.name, q, option)

    // const db = new Db(slugify(col.name))
    // const result = await db.similaritySearch(q)

    return res.status(200).json({ status: "ok", result });
})

const main = async () => {



}

main().catch(console.error);