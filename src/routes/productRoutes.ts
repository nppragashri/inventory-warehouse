import { Application } from 'express';
import { ProductController } from '../controllers/productController';

const controller = new ProductController();

export function setProductRoutes(app: Application) {
    app.post('/products', controller.createProduct.bind(controller));
    app.get('/products', controller.listProducts.bind(controller));
    app.get('/products/low-stock', controller.listLowStock.bind(controller));
    app.get('/products/:id', controller.getProduct.bind(controller));
    app.put('/products/:id', controller.updateProduct.bind(controller));
    app.delete('/products/:id', controller.deleteProduct.bind(controller));
    app.post('/products/:id/increase-stock', controller.increaseStock.bind(controller));
    app.post('/products/:id/decrease-stock', controller.decreaseStock.bind(controller));
}