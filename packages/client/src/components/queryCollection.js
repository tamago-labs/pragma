import { useWeb3React } from "@web3-react/core"
import { CollectionContext } from "@/hooks/useCollection"
import { useCallback, useContext, useEffect, useState } from "react"
import { AccountContext } from "@/hooks/useAccount"

const QueryCollection = ({ collectionId, collections }) => {

    const [option, setOption] = useState("qa")
    const [text, setText] = useState()
    const [result, setResult] = useState()

    const [loading, setLoading] = useState(false)

    const { query } = useContext(CollectionContext)

    const onQuery = useCallback(async () => {

        setResult()
        setLoading(true)

        const response = await query(collectionId, text, option)

        let result

        switch (option) {
            case "qa":
                result = response["result"]["output_text"]
                break
            case "summary":
                result = response["result"]["text"]
                break
            default:
                result = response["result"][0]["pageContent"]
        }

        setResult(result)
        setLoading(false)

    }, [text, option, collectionId])

    const { name, retrievalUrl, totalDocs } = collections.find(item => Number(item.id) === Number(collectionId))

    const disabled = totalDocs === 0 ? true : false

    return (
        <div class="w-full p-6 xl:w-1/2">
            <div class="flex flex-col mb-2">
                <h1 class="text-2xl text-white font-bold  mb-2">
                    Query Collection
                </h1>
                <h1 class="text-xl text-gray-400 font-bold  mb-2">
                    {name}
                </h1>
            </div>
            <div class="grid grid-cols-5 gap-3 px-2 mt-4">
                <div class="col-span-1 flex">
                    <div class="mx-auto ">
                        <label class="block mt-2 text-sm font-medium text-white">
                            Retrieval URL
                        </label>
                    </div>
                </div>
                <div class="col-span-4">
                    <div class="mx-auto underline">
                        {retrievalUrl}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-3 px-2 mt-4">
                <div class="col-span-1 flex">
                    <div class="mx-auto ">
                        <label class="block mt-2 text-sm font-medium text-white">Select an option</label>
                    </div>
                </div>
                <div class="col-span-4">
                    <select onChange={(e) => setOption(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected={option === "qa"} value="qa">Document QA</option>
                        <option selected={option === "summary"} value="summary">Summarization</option>
                        <option selected={option === "search"} value="search">Similarity Search</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-3 px-2 mt-4">
                <div class="col-span-1 flex">
                    <div class="mx-auto ">
                        <label class="block mt-2 text-sm font-medium text-white">Operation</label>
                    </div>

                </div>
                <div class="col-span-4">
                    <textarea disabled={option === "summary"} onChange={(e) => setText(e.target.value)} value={text} id="message" rows="4" class={`${option === "summary" && "opacity-60"} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="What is proof of work?"></textarea>
                </div>
            </div>

            <div class="grid grid-cols-5 gap-3 px-2 mt-4">
                <div class="col-span-1 flex">

                </div>
                <div class="col-span-4 flex flex-row">
                    <div>
                        <button disabled={loading} type="button" onClick={onQuery} class={`${(loading || disabled) && "opacity-60"} text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-40`}>Query</button>
                    </div>
                    {loading && (
                        <div class="text-sm flex items-center justify-center mb-2 ml-2">
                            Processing...
                        </div>
                    )}
                </div>
            </div>

            <div class="grid grid-cols-5 gap-3 px-2 mt-4">
                <div class="col-span-1 flex">

                </div>
                <div class="col-span-4 text-sm text-white flex flex-row">
                    {result && (
                        <div
                            dangerouslySetInnerHTML={{ __html: result }}
                        />
                    )}
                </div>
            </div>



        </div>
    )
}

export default QueryCollection