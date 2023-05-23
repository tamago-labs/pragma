import { CollectionContext } from "@/hooks/useCollection"
import { useCallback, useContext, useState } from "react"
import { X } from "react-feather"

const EditCollectionModal = ({
    closeModal,
    collectionId
}) => {

    const [isLong, setLong] = useState(false)
    const [loading, setLoading] = useState(false)

    const { addItems, addDocs } = useContext(CollectionContext)

    const [docs, setDocs] = useState("")
    const [items, setItems] = useState([
        "",
        "",
        ""
    ])

    const removeItem = useCallback((index) => {
        setItems(items.filter((item, idx) => idx !== index))
    }, [items])

    const moreItem = useCallback(() => {
        setItems(items.concat([""]))
    }, [items])

    const onSave = useCallback(async () => {

        // validate
        for (let item of items) {
            if (!item) {
                return
            }
        }

        await addItems(collectionId, items)

        setItems([
            "", "", ""
        ])

        closeModal()

    }, [items, collectionId])

    const onSaveDocs = useCallback(async () => {

        // validate
        if (!docs || docs.length < 5) {
            return
        }

        await addDocs(collectionId, docs)

        setDocs("")

        closeModal()

    }, [docs, collectionId])

    const disabled = false

    return (
        <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="relative bg-gray-800 p-6 w-full max-w-4xl text-white rounded-lg">
                <h5 class="text-xl font-bold">Add Items</h5>
                <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-400" onClick={closeModal}>
                    <X />
                </button>
                <div class="w-full mt-1 text-white">

                    <div className="grid grid-cols-3 text-white gap-3 mt-4 mb-4">
                        <div class="flex items-center cursor-pointer">
                            <input checked={!isLong} id="default-radio-1" onChange={() => setLong(false)} type="radio" name="default-radio" class="w-4 h-4   bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-1" class="ml-2 text-sm font-medium cursor-pointer ">Multiple Entries</label>
                        </div>
                        <div class="flex items-center cursor-pointer" >
                            <input checked={isLong} id="default-radio-2" type="radio" onChange={() => setLong(true)} name="default-radio" class="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-2" class="ml-2 text-sm font-medium cursor-pointer ">Long Document</label>
                        </div>
                    </div>

                    {!isLong
                        ?
                        <>
                            {items.map((item, index) => {
                                return (
                                    <div className="grid grid-cols-12 text-white gap-3 mt-2 mb-2">
                                        <div class="col-span-11">
                                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Entry #{index + 1}</label>
                                            <input value={item} onChange={(e) => {
                                                const value = e.target.value
                                                setItems(items.map((i, idx) => (index === idx ? value : i)))
                                            }} type="text" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hey there! Just wanted to say that I'm really excited about the progress we're making" />
                                        </div>
                                        <div class="col-span-1 flex">
                                            {index !== 0 && (
                                                <div class="mt-auto mb-auto pt-7 pl-3 cursor-pointer" onClick={() => removeItem(index)}>
                                                    <X />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            <div class=" mt-6">

                                <div class="col-span-4">
                                    <textarea onChange={(e) => setDocs(e.target.value)} value={docs} id="message" rows="4" class={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write your content here..."></textarea>
                                </div>
                            </div>
                        </>
                    }
                    <div class="grid grid-cols-12 gap-3  mt-8">
                        <div class="col-span-3 flex flex-row">
                            <div>
                                {!isLong && (
                                    <button onClick={onSave} disabled={loading || disabled} type="button" class={`${(loading || disabled) && "opacity-60"} text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-40`}>Save</button>
                                )
                                }
                                 {isLong && (
                                    <button onClick={onSaveDocs} type="button" class={`${(loading || disabled) && "opacity-60"} text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-40`}>Save</button>
                                )
                                }

                            </div>
                            {loading && (
                                <div class="text-sm flex items-center justify-center mb-2 ml-2">
                                    Loading...
                                </div>
                            )}
                        </div>
                        {!isLong && (
                            <div class="col-span-8 flex flex-row">
                                <div class="ml-auto">
                                    <button onClick={moreItem} type="button" class={`  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-40`}>
                                        + More
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditCollectionModal