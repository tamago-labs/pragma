import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import CreateCollectionModal from "@/modals/createCollection"
import { API_HOST } from "@/constants"

import axios from "axios"
import EditCollectionModal from "@/modals/editCollection"

export const CollectionContext = createContext()

const MODAL = {
    NONE: "NONE",
    CREATE: "CREATE",
    EDIT: "EDIT"
}

const Provider = ({ children }) => {

    const [values, dispatch] = useReducer(
        (curVal, newVal) => ({ ...curVal, ...newVal }),
        {
            collectionList: [],
            modal: MODAL.NONE,
            collectionId : 0
        }
    )

    const { modal, collectionList, collectionId } = values

    const { account, library } = useWeb3React()

    useEffect(() => {

        try {
            axios.get(`${API_HOST}/collections`).then(
                ({ data }) => { 
                    if (data && data.collections) {
                        dispatch({
                            collectionList: data.collections
                        })
                    }

                }
            )
        } catch (e) {

        }

    }, [])

    const closeModal = () => {
        dispatch({ modal: MODAL.NONE })
    }

    const showCreateModal = () => {
        dispatch({ modal: MODAL.CREATE })
    }

    const showEditModal = (collectionId) => {
        dispatch({ modal: MODAL.EDIT, collectionId })
    }

    const loadItems = async (collectionId) => {
        const { data } = await axios.get(`${API_HOST}/collection/${collectionId}`)

        if (data && data.items) {
            return data.items
        }
        return []
    }

    const query = async (collectionId, text, option) => {

        const { data } = await axios.get(`${API_HOST}/query/${collectionId}`, {
            params: {
                q: text,
                option
            }
        })

        return data
    }

    const create = useCallback(async (collectionName) => {

        if (!account) {
            return
        }

        const MESSAGE = "Sign this message to submit"
        const signature = await library.getSigner().signMessage(MESSAGE)

        const payload = {
            collectionName,
            message: MESSAGE,
            signature
        }

        await axios.post(`${API_HOST}/collection/new`, payload)

    }, [account])

    const addItems = useCallback(async (collectionId, contents) => {



        if (!account) {
            return
        }

        const MESSAGE = "Sign this message to submit"
        const signature = await library.getSigner().signMessage(MESSAGE)

        let items = []

        for (let content of contents) {
            items.push({
                id: Math.floor(new Date().valueOf() / 1000) + items.length,
                content
            })
        }

        const payload = {
            items,
            message: MESSAGE,
            signature
        }

        await axios.post(`${API_HOST}/collection/${collectionId}`, payload)

    }, [account])

    const addDocs = useCallback(async (collectionId, docs) => {

        if (!account) {
            return
        }

        const MESSAGE = "Sign this message to submit"
        const signature = await library.getSigner().signMessage(MESSAGE)

        const payload = {
            docs,
            message: MESSAGE,
            signature
        }

        await axios.post(`${API_HOST}/collection/${collectionId}`, payload)

    }, [account])

    const collectionContext = useMemo(
        () => ({
            showCreateModal,
            showEditModal,
            closeModal,
            loadItems,
            query,
            create,
            addItems,
            addDocs,
            collectionList: collectionList
        }),
        [collectionList, create, addItems, addDocs]
    )

    return (
        <CollectionContext.Provider value={collectionContext}>
            {modal === MODAL.CREATE && <CreateCollectionModal closeModal={closeModal} />}
            {modal === MODAL.EDIT && <EditCollectionModal collectionId={collectionId} closeModal={closeModal} />}
            {children}
        </CollectionContext.Provider>
    )
}

export default Provider