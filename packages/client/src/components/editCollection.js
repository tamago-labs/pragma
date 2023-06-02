import { CollectionContext } from "@/hooks/useCollection"
import { useContext, useEffect, useState } from "react"
import { AccountContext } from "@/hooks/useAccount"
import { useWeb3React } from "@web3-react/core"
import { Check, X } from "react-feather"

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers"

const EditCollection = ({ collectionId, collections }) => {

    const { loadItems, showEditModal } = useContext(CollectionContext)
    const { showSignInModal, closeModal } = useContext(AccountContext)

    const { account } = useWeb3React()

    const [items, setItems] = useState()

    useEffect(() => {
        account && closeModal()
    }, [account])

    useEffect(() => {
        collectionId && loadItems(collectionId).then(
            (items) => {
                setItems(items)
            }
        ).catch(
            (e) => {
                setItems([])
            }
        )
    }, [collectionId])

    const checkProof = (root, id, content, items) => {

        const leaves = items.map((item) => ethers.utils.keccak256(ethers.utils.solidityPack(["string", "string"], [item["_id"], item.pageContent])))
        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

        const leaf = ethers.utils.keccak256(ethers.utils.solidityPack(["string", "string"], [id, content]))
        const proof = tree.getProof(leaf)

        const bufRoot = tree.bufferify(root)
        return (tree.verify(proof, leaf, bufRoot))
    }

    const collection = collections.find(item => Number(item.id) === Number(collectionId))

    console.log("collection --> ", collection)

    const name = collection ? collection.name : ""

    return (
        <div class="w-full p-6">
            <div class="flex flex-col mb-2">
                <h1 class="text-2xl text-white font-bold  mb-2">
                    Edit Collection
                </h1>
                <h1 class="text-xl text-gray-400 font-bold  mb-2">
                    {name}
                </h1>
            </div>
            <div class="grid grid-cols-4 xl:grid-cols-8 gap-3 mt-3">
                <div>
                    <button type="button" onClick={() => account ? showEditModal(collectionId) : showSignInModal()} class="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Items</button>
                </div>
                <div class="flex text-sm">
                    <div class="mt-auto pb-4 pl-1">
                        Items: {items ? items.length : "Loading..."}
                    </div>
                </div>
            </div>
            {/* TABLE */}
            <div class="relative mt-2  shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-white">
                    <thead class="text-xs ppercase border-b bg-transparent">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Document
                            </th>
                            <th scope="col" width="10%" class="px-6 py-3">
                                On-Chain
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item, index) => {
                            const { pageContent } = item
                            const id = item["_id"]
                            return (
                                <tr key={index} class=" border-b bg-transparent">
                                    {/* <td class="px-6 py-4">
                                        {id}
                                    </td> */}
                                    <td class="px-6 py-4">
                                        {pageContent}
                                    </td>
                                    <td class="px-6 py-4">
                                        {collection && collection.root && checkProof(collection.root, id, pageContent, items) ? <Check /> : <X />}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default EditCollection