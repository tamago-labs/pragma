
import MainLayout from "@/layouts/mainLayout"
import { useWeb3React } from "@web3-react/core"
import { useContext } from "react"
import Link from "next/link"

import { shortAddress } from "@/helpers"
import { CollectionContext } from "@/hooks/useCollection"
import { ExternalLink } from "react-feather"
import { useRouter } from "next/router"
import Header from "../components/header.js"

const MainContainer = () => {

   
    const { collectionList } = useContext(CollectionContext)

    const router = useRouter()

    return (
        <MainLayout>
            <div class="p-6 flex-grow bg-gray-900 text-white flex flex-col pt-2 overflow-y-auto">

                <div class="w-full py-2 mx-auto px-4 pt-0">
                    {/* HEADER */}
                    <Header/>

                    {/* TABLE */}
                    <div class="relative  shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-white">
                            <thead class="text-xs ppercase border-b bg-transparent">
                                <tr>

                                    <th scope="col" class="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Collection Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Documents
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Owner
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {collectionList.map((item, index) => {
                                    const { name, owner, totalDocs } = item
                                    return (

                                        <tr onClick={() => router.push(`/collection/${item.id}`)} key={index} class="cursor-pointer hover:underline border-b bg-transparent">
                                            <td class="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td class="px-6 py-4">
                                                {name}
                                            </td>
                                            <td class="px-6 py-4">
                                                {totalDocs}
                                            </td>
                                            <td class="px-6 py-4">
                                                {shortAddress(owner)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {collectionList.length === 0 && <div class="p-3">Loading...</div>}
                    </div>


                </div>

            </div>
        </MainLayout>
    )
}

export default MainContainer