import express from 'express';
// import { jwtVerified } from '';
import {
    productCreate,
    productDeleteAll,
    productDeleteOne,
    productGetAll,
    productGetOne,
    productUpdate
} from '../controller/product.controller.js';
import { upload } from '../middleware/multer.middleware.js'

const productRouter = express.Router();

productRouter.post("/product-create",upload.single('image'),productCreate);
productRouter.put("/product-update",upload.single('image'), productUpdate);
productRouter.get("/product-get-one", productGetOne);
productRouter.get("/product-get-all", productGetAll);
productRouter.delete("/product-delete/:id", productDeleteOne);
productRouter.delete("/product-delete-all", productDeleteAll);

export default productRouter;