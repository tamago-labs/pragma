import { expect } from "chai";
import Db from "../lib/db.js"

let instance

const EXAMPLE = [
    "Hello world",
    "Bye bye",
    "hello nice world",
    "Hello there! How are you doing today?",
    "Good morning!",
    "Warm greetings!",
    "Hi!",
    "Good day to you!",
    "Greetings and salutations!",
    "Hey, how's it going?"
]

const parseArray = (array, startIndex = 0) => {

    let ids = []
    let contents = []
    let metadatas = []

    for (let i = 0; i < array.length; i++) {
        ids.push(`${startIndex + i + 1}`)
        contents.push(array[i])
        metadatas.push({ source: `${startIndex + i + 1}` })
    }

    return {
        ids,
        contents,
        metadatas
    }
}

describe('#index()', function () {


    before(function () {
        instance = new Db("my_index", true)
    })

    it('should index items', async function () {

        const array = EXAMPLE.slice(0, 3)

        const { ids, contents, metadatas } = parseArray(array)

        await instance.addItems(ids, contents, metadatas)

        const result = await instance.similaritySearch("Bye", 1);

        expect(result[0]["pageContent"]).equal("Bye bye")
    })

    it('should index items in two batches', async function () {

        const array1 = EXAMPLE.slice(0, 5)
        const array2 = EXAMPLE.slice(5)

        let { ids, contents, metadatas } = parseArray(array1)

        await instance.addItems(ids, contents, metadatas)

        const parsed = parseArray(array2, 5)

        await instance.addItems(parsed.ids, parsed.contents, parsed.metadatas)

        const result = await instance.similaritySearch("Good day", 1);

        expect(result[0]["pageContent"]).equal("Good day to you!")
    })

    it('should return result when k = 3', async function () {

        const result = await instance.similaritySearch("hello", 3);

        expect(result[0]["pageContent"]).equal("Hi!")
        expect(result[1]["pageContent"]).equal("hello nice world")
        expect(result[2]["pageContent"]).equal("Hello world")

    })

    // it('should return filtered result', async function () {
        


    // })

    it('Destroy it', async function () {

        await instance.destroy()

    })

})