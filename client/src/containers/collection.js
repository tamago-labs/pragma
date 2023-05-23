import EditCollection from "@/components/editCollection"
import QueryCollection from "@/components/queryCollection"
import { useState } from "react"
import { Edit, Edit2, Terminal } from "react-feather"


const IconWrapper = ({ children, onClick }) => {
    return (
        <div onClick={onClick} class="mx-auto text-white p-4 cursor-pointer">
            {children}
        </div>
    )
}

const NAV = {
    EDIT: "EDIT",
    QUERY: "QUERY"
}

const CollectionContainer = ({
    collectionId,
    collections
}) => {

    const [nav, setNav] = useState(NAV.EDIT)

    return (
        <>
            <div class="bg-gray-800 w-20 flex-none flex flex-col pt-4">
                <IconWrapper onClick={() => setNav(NAV.EDIT)}>
                    <Edit />
                </IconWrapper>
                <IconWrapper onClick={() => setNav(NAV.QUERY)}>
                    <Terminal />
                </IconWrapper>
            </div>
            <div class="  flex-grow bg-gray-900 text-white overflow-y-auto flex flex-col">
                {nav === NAV.EDIT && <EditCollection collectionId={collectionId} collections={collections} />}
                {nav === NAV.QUERY && <QueryCollection collectionId={collectionId} collections={collections} />}
            </div>
        </>
    )
}

export default CollectionContainer