const { expect } = require("chai")
const { ethers } = require("hardhat")

let admin
let alice

let instance

describe("Collection", () => {

    before(async () => {

        [admin, alice] = await ethers.getSigners();

        const Pragma = await ethers.getContractFactory("Pragma");

        instance = await Pragma.deploy()
    })

    it("should create new collection success", async function () {

        const text = "My Collection"

        await instance.createCollection(
            ethers.utils.formatBytes32String(text),
            "https://api.cryptokitties.co/kitties/1",
            ethers.utils.formatBytes32String("0x"),
            alice.address
        )

        expect(await instance.getCollectionName(1)).to.equal(ethers.utils.formatBytes32String(text))
        expect(await instance.getCollectionRetrievalUrl(1)).to.equal("https://api.cryptokitties.co/kitties/1")
        expect(await instance.getCollectionRoot(1)).to.equal(ethers.utils.formatBytes32String("0x"))

    })

    it("should create update collection info success", async function () {

        const text = "My Collection Updated"

        await instance.updateCollectionName(
            1,
            ethers.utils.formatBytes32String(text)
        )

        expect(await instance.getCollectionName(1)).to.equal(ethers.utils.formatBytes32String(text))

    })

})