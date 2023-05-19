import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


import Db from "./db.js"

import 'dotenv/config'

class Index {

    db 

    constructor(name) {
        this.db = new Db(name)
    }

    addItem = async () => {

    }

    addItems = async () => {

    }

    rebuild = async () => {

    }



}

export default Index