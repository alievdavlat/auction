// ProductRouter
import express from 'express';
import {
createProduct,
deleteProduct,
getAllProducts,
getProductById,
updateProduct,
getProductsBySearch,
getProductsWithFilterAndPagination,
} from '../controllers/product.controller';

const ProductRouter = express.Router();

ProductRouter.post('/auction-products', createProduct);
ProductRouter.get('/auction-products', getAllProducts);
ProductRouter.get('/auction-products/search', getProductsBySearch);
ProductRouter.get('/auction-products/list', getProductsWithFilterAndPagination);
ProductRouter.get('/auction-products/:id', getProductById);
ProductRouter.put('/auction-products/:id', updateProduct);
ProductRouter.delete('/auction-products/:id', deleteProduct);

export default ProductRouter;
