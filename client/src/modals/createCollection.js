import { CollectionContext } from "@/hooks/useCollection"
import { useCallback, useContext, useState } from "react"
import {  X } from "react-feather"

const CreateCollectionModal = ({
    closeModal
}) => {

    const { create } = useContext(CollectionContext)
    const [collectionName, setCollectionName] = useState()

    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)

    const onCreate = useCallback(async () => {

        if (!collectionName) {
            return
        }

        setLoading(true)

        await create(collectionName)

        // setLoading(false)
        setCompleted(true)

    }, [create, collectionName])

    return (
        <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="relative bg-gray-800 p-6 w-full max-w-2xl text-white rounded-lg">
                <h5 class="text-xl font-bold">Create Collection</h5>
                <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-400" onClick={closeModal}>
                    <X />
                </button>
                <div class="w-full mt-1 text-white">
                    <div className="grid grid-cols-8 p-2 gap-3">
                        <div class="col-span-1 flex">
                            <label class="block text-md text-md font-medium text-gray-300 mt-auto mb-auto mr-auto">Name</label>
                        </div>
                        <div class="col-span-7">
                            <input onChange={(e) => setCollectionName(e.target.value)} placeholder="Bitcoin whitepaper #1" class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base" type="text" />
                            {/* <p class=" text-gray-300 mt-1 text-xs">
                                Ex. Bitcoin whitepaper, children book
                            </p> */}
                        </div>
                    </div>
                    <div class="flex mt-3">
                        <button onClick={onCreate} disabled={loading} class={`bg-blue-500 hover:bg-blue-600 text-white mx-auto py-2 px-4  flex flex-row rounded ${loading && "opacity-60"}`}>
                            Sign
                        </button>

                    </div>
                    {completed && (
                        <p class=" text-gray-300 mt-3 text-center text-sm">
                            Your transaction is being processed by the indexer node and will be completed in 3-4 mins.
                        </p>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default CreateCollectionModal