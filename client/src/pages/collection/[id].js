import FullLayout from "@/layouts/fullLayout";
import CollectionContainer from "@/containers/collection";
import { API_HOST } from "@/constants";
import axios from "axios";

export default function Collection({ collectionId, collections }) {

    return (
        <FullLayout>
            <CollectionContainer
                collectionId={collectionId}
                collections={collections}
            />
        </FullLayout>
    )
}

export const getStaticPaths = async () => {
    return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context) {

    const { params } = context
    const { id } = params

    let collections = []

    try {

         const { data } = await axios.get(`${API_HOST}/collections`) 
         collections = data.collections

    } catch (e) {

    }

    return {
        props: {
            collectionId: id,
            collections
        }
    };
}