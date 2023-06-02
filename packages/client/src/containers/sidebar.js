import { AccountContext } from "@/hooks/useAccount"
import { CollectionContext } from "@/hooks/useCollection"
import { useWeb3React } from "@web3-react/core"
import { useCallback, useContext, useEffect } from "react"
import { Crop, Plus, Settings } from "react-feather" 

const SidebarContainer = () => {

    const { showSignInModal, closeModal } = useContext(AccountContext)
    const { showCreateModal } = useContext(CollectionContext)

    const { account } = useWeb3React()

    useEffect(() => {
        account && closeModal()
    }, [account])

    return (
        <div class="bg-gray-800 w-2/5 flex-none flex flex-col">
            <div class="text-white p-6 flex flex-col h-full items-center justify-center">
                <div class=" w-full max-w-2xl mx-auto">
                    <div class="p-20">
                        <div class="flex flex-row mb-2">
                            <h1 class="text-5xl text-white font-bold mb-4">
                                Pragma
                            </h1> 
                             
                        </div>
                        <p class="text-xl text-gray-300  mb-2">Handling data from Web3 and DAO that can be understood by AI</p>
                        <p class="text-sm text-white  mb-2">Pragma is a decentralized vector database built on FVM, employing Merkle tree proof to synchronize off-chain vector data with the state on-chain. It allows the leveraging of AI models to generate knowledge and facts, serving the needs of your community 😊</p>
                        <div class="mt-6">
                            <div class="w-full  ">
                                <button onClick={account ? (() => showCreateModal()) : (() => showSignInModal())} class="bg-blue-500 w-full hover:bg-blue-600 text-white  py-2 px-4  flex flex-row rounded">
                                    <Plus />
                                    <div class="mx-auto">
                                        Create Collection
                                    </div>
                                </button>
                            </div>
                            <div class="flex flex-row mt-5">
                               <div>
                                <a class="underline mx-auto" href="https://github.com/pisuthd/pragma" target="_blank">
                                    GitHub
                                </a> 
                               </div>
                               <div className="ml-4">
                                 <a  class="underline mx-auto" href="https://twitter.com/PisuthD" target="_blank">
                                Twitter
                               </a> 
                               </div>
                               <div className="ml-4">
                                 <a  class="underline mx-auto" href="https://devpost.com/software/pragma-dc4h6g" target="_blank">
                                Devpost
                               </a> 
                               </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarContainer