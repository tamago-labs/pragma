
import * as fastq from "fastq";
import express from "express";
import cors from "cors"

import routes from "./routes/index.js"

import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(cors())

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})

app.use("/collections", routes.collection)


const main = async () => {



}

main().catch(console.error);