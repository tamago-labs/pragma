import { AccountContext } from "@/hooks/useAccount"
import { useWeb3React } from "@web3-react/core"
import { useContext } from "react"
import { shortAddress } from "@/helpers"

const Header = () => {

    const { showSignInModal, corrected } = useContext(AccountContext)
    const { account } = useWeb3React()

    return (
        <div class="flex flex-row pt-0 mt-2">
            <div class="flex-1 py-2 px-2 ">
                <div class="flex items-center">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-whit">Only My Collection</label>
                </div>
            </div>
            <div class="flex-1 text-right">
                {(account && corrected) && (
                    <>
                        <button class=" bg-transparent border-0 text-white font-semibold hover:underline py-2 px-4  rounded-lg text-sm  ">
                            {shortAddress(account)}
                        </button>
                    </>
                )}
                {(account && !corrected) && (
                    <>
                        <button class=" bg-transparent hover:bg-white  text-white font-semibold hover:text-slate-700 py-2 px-4 border border-white hover:border-transparent rounded-lg text-sm  ">
                            Wrong Network
                        </button>
                    </>
                )}
                {!account && (
                    <button type="button" onClick={() => showSignInModal()} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sign In</button>
                )}

            </div>
        </div>
    )
}

export default Header