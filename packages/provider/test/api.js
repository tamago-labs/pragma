

import { app } from "../index.js"

import chai from "chai"
import chaiHttp from "chai-http"
import { ethers } from "ethers"

import { faker } from '@faker-js/faker';


import * as dotenv from 'dotenv'

dotenv.config()

const should = chai.should()

chai.use(chaiHttp)

const { expect } = chai

describe('#api', () => {

    let collections
    let collectionId
    let collectionItems

    describe('/collections', () => {

        // it('should add new colletion success ', (done) => {

        //     const privateKey = process.env.PRIVATE_KEY
        //     const wallet = new ethers.Wallet(privateKey);

        //     const message = "Sign this message to submit"

        //     wallet.signMessage(message).then(
        //         (signature) => {
        //             const entry = {
        //                 collectionName: faker.music.songName(),
        //                 message,
        //                 signature
        //             }
        //             chai.request(app)
        //                 .post('/collection/new')
        //                 .send(entry)
        //                 .end((err, res) => {
        //                     const { body, status } = res
        //                     expect(status).equal(200)
        //                     console.log("body : ", body)
        //                     done();
        //                 });
        //         }
        //     )
        // });

        it('should get collections from smart contract success', (done) => {
            chai.request(app)
                .get('/collections')
                .end((err, res) => {
                    const { body, status } = res

                    collections = body.collections

                    expect(status).equal(200)
                    expect(body.collections.length > 0).equal(true)
                    done();
                });
        });

        it('should add items to the collection success', (done) => {

            const privateKey = process.env.PRIVATE_KEY
            const wallet = new ethers.Wallet(privateKey);

            const message = "Sign this message to submit"

            const ids = collections.map(item => item.id)
            const randomId = ids[Math.floor(Math.random() * ids.length)];

            collectionId = randomId

            wallet.signMessage(message).then(
                (signature) => {

                    let items = []

                    while (true) {
                        items.push({
                            id: faker.person.firstName(),
                            content: faker.person.bio()
                        })

                        if (items.length === 10) {
                            break
                        }
                    }
                    const entry = {
                        items,
                        message,
                        signature
                    }

                    chai.request(app)
                        .post(`/collection/${randomId}`)
                        .send(entry)
                        .end((err, res) => {
                            const { body, status } = res

                            expect(status).equal(200)
                            expect(body.addedItems.length).equal(items.length)

                            done();
                        });
                }
            )
        });

        it('should add docs to the collection success', (done) => {

            const privateKey = process.env.PRIVATE_KEY
            const wallet = new ethers.Wallet(privateKey);

            const message = "Sign this message to submit"

            const ids = collections.map(item => item.id)
            const randomId = ids[Math.floor(Math.random() * ids.length)];

            collectionId = randomId

            wallet.signMessage(message).then(
                (signature) => {

                    const docs = `
                    Once upon a time in a small village nestled amidst rolling hills, there lived a poor farmer named Thomas. Thomas was known for his hard work and kind heart. One day, a mischievous fox started wreaking havoc in the village, stealing chickens from the farmers' yards. The villagers grew worried, and their livelihoods were at stake.
                    `

                    const entry = {
                        docs,
                        message,
                        signature
                    }

                    chai.request(app)
                        .post(`/collection/${randomId}`)
                        .send(entry)
                        .end((err, res) => {
                            const { body, status } = res
                            expect(status).equal(200)

                            done();
                        });
                }
            )
        });

        it('should get all new items from the collection success', (done) => {
            chai.request(app)
                .get(`/collection/${collectionId}`)
                .end((err, res) => {
                    const { body, status } = res

                    collectionItems = body.items

                    expect(status).equal(200)
                    expect(body.items.length > 0).equal(true)

                    done();
                });
        });

        it('should perform similarity search success', (done) => {

            const lastItem = collectionItems[collectionItems.length - 1]

            const q = `${lastItem.pageContent.replace(/[^a-zA-Z0-9 ]/g, '')}`

            chai.request(app)
                .get(`/query/${collectionId}?q=${q}&option=search`)
                .end((err, res) => {
                    const { body, status } = res

                    expect(status).equal(200) 
                    expect(body.result[0].pageContent.replace(/[^a-zA-Z0-9 ]/g, '')).equal(lastItem.pageContent.replace(/[^a-zA-Z0-9 ]/g, ''))
                    expect(body.result[0].metadata["id"]).equal( lastItem["_id"] )

                    done();
                });
        });

    });

});