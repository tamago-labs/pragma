import { Router } from "express";
import { ethers } from "ethers";

const router = Router();

// list all collections
router.get('/', (req, res) => {
    return res.status(200).json({ status: "ok" });
});

// make a new collection

router.post('/new', (req, res) => {

    const { body } = req

    const { message, signature, collectionName } = body

    const ownerAddress = ethers.utils.verifyMessage(message, signature)

    return res.status(200).json({ status: "ok" });
});

// get an existing collection

router.get('/:collectionId', (req, res) => {



    return res.status(200).json({ errors: { email: req.params.collectionId } });
});


// delete a collection

// reset

// get the number of items in a collection


// add new items to a collection 


// add a document to a collection


// get items from a collection


// get first 5 items from a collection


// do nearest neighbor search to find similar embeddings or documents, supports filtering

// delete items


export default router;