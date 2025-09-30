import { Request, Response } from 'express';

interface Product {
    id: number;
    name: string;
    description: string;
    stock_quantity: number;
    low_stock_threshold: number;
}

let products: Product[] = [];
let nextId = 1;

export class ProductController {
    // Create Product
    public createProduct(req: Request, res: Response) {
        const { name, description, stock_quantity, low_stock_threshold } = req.body;
        if (
            typeof name !== 'string' ||
            typeof description !== 'string' ||
            typeof stock_quantity !== 'number' ||
            typeof low_stock_threshold !== 'number' ||
            stock_quantity < 0 ||
            low_stock_threshold < 0
        ) {
            return res.status(400).json({ error: 'Invalid product data.' });
        }
        const product: Product = {
            id: nextId++,
            name,
            description,
            stock_quantity,
            low_stock_threshold,
        };
        products.push(product);
        res.status(201).json(product);
    }

    // Get Product by ID
    public getProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    }

    // Update Product
    public updateProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        const { name, description, stock_quantity, low_stock_threshold } = req.body;
        if (
            typeof name !== 'string' ||
            typeof description !== 'string' ||
            typeof stock_quantity !== 'number' ||
            typeof low_stock_threshold !== 'number' ||
            stock_quantity < 0 ||
            low_stock_threshold < 0
        ) {
            return res.status(400).json({ error: 'Invalid product data.' });
        }
        product.name = name;
        product.description = description;
        product.stock_quantity = stock_quantity;
        product.low_stock_threshold = low_stock_threshold;
        res.status(200).json(product);
    }

    // Delete Product
    public deleteProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        products.splice(index, 1);
        res.status(204).send();
    }

    // Increase Stock
    public increaseStock(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { amount } = req.body;
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount.' });
        }
        product.stock_quantity += amount;
        res.status(200).json(product);
    }

    // Decrease Stock
    public decreaseStock(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { amount } = req.body;
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount.' });
        }
        if (product.stock_quantity < amount) {
            return res.status(400).json({ error: 'Insufficient stock.' });
        }
        product.stock_quantity -= amount;
        res.status(200).json(product);
    }

    // List Products Below Low Stock Threshold
    public listLowStock(req: Request, res: Response) {
        const lowStockProducts = products.filter(
            p => p.stock_quantity < p.low_stock_threshold
        );
        res.status(200).json(lowStockProducts);
    }

    // List All Products
    public listProducts(req: Request, res: Response) {
        res.status(200).json(products);
    }
}