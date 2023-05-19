import { Router } from "express";

const router = Router();

// list all collections
router.get('/', (req, res) => {
    return res.status(200).json({ status: "ok" });
});

// make a new collection

// get an existing collection

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