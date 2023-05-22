
import PouchDB from 'pouchdb';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


import 'dotenv/config'


class Db {

    db
    collectionName

    isIndexed

    constructor(collectionName, isIndex = true) {

        this.collectionName = collectionName

        this.db = new PouchDB(collectionName)
        this.isIndexed = isIndex
    }

    // basic database functions

    // addItem = async (id, pageContent, metadata) => {

    //     return await this.db.put({
    //         _id: `${id}`,
    //         pageContent,
    //         metadata
    //     })

    // }

    addItems = async (ids = [], pageContent = [], metadata = []) => {

        if (ids.length !== pageContent.length) {
            throw new Error("array length mismatch")
        }

        const res = await this.db.bulkDocs(ids.map(((id, index) => ({ _id: `${id}`, pageContent: pageContent[index], metadata: metadata[index] }))));

        if (this.isIndexed) {
            const noConflictIds = res.reduce((arr, item, index) => (item.ok ? arr.concat(index) : arr), []);

            const filter = (array) => {
                return array.reduce((arr, item, index) => (noConflictIds.includes(index) ? arr.concat(item) : arr), []);
            }

            await this.indexItems(filter(ids), filter(pageContent), filter(metadata))
        }

        return res
    }

    updateItem = async (id, rev, pageContent, metadata) => {

        return await this.db.put({
            _id: `${id}`,
            _rev: rev,
            pageContent,
            metadata
        })

    }

    // TODO: updateItems

    getItem = async (id) => {
        return await this.db.get(id)
    }

    getItems = async (startkey, endkey) => {
        const { rows } = await this.db.allDocs({
            include_docs: true,
            attachments: true,
            startkey,
            endkey
        });
        return rows.map(item => (item.doc))
    }

    getAllItems = async () => {
        const { rows } = await this.db.allDocs({
            include_docs: true,
            attachments: true
        });
        return rows.map(item => (item.doc))
    }

    destroy = async () => {
        await this.db.destroy();

        const fs = await import("node:fs/promises");
        const dir = this.collectionName

        // delete directory recursively
        await fs.rm(dir, { recursive: true, force: true })
    }

    // indexing

    indexItems = async (ids = [], pageContent = [], metadata = []) => {

        try {

            const loadedVectorStore = await HNSWLib.load(this.collectionName, new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }));
            const docs = [];

            for (let i = 0; i < pageContent.length; i += 1) {
                const extended = metadata[i]
                const id = ids[i]
                const newDoc = ({
                    pageContent: pageContent[i],
                    metadata: {
                        id: (id),
                        ...extended
                    }
                });
                docs.push(newDoc);
            }
            await loadedVectorStore.addDocuments(docs)
            await loadedVectorStore.save(this.collectionName);
        } catch (e) {

            const vectorStore = await HNSWLib.fromTexts(
                pageContent,
                ids.map((id, index) => {
                    const extended = metadata[index]
                    return {
                        id: (id),
                        ...extended
                    }
                }),
                new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
            )

            await vectorStore.save(this.collectionName);
        }

    }

    similaritySearch = async (text, k = 1) => {
        const loadedVectorStore = await HNSWLib.load(this.collectionName, new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }));
        return await loadedVectorStore.similaritySearch(text, k);
    }

    rebuild = async () => {

    }


}

export default Db