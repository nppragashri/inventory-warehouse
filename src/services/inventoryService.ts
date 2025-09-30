import { Product } from '../models/product';

export class InventoryService {
    private products: Map<string, Product>;

    constructor() {
        this.products = new Map<string, Product>();
    }

    public increaseStock(productId: string, quantity: number): void {
        if (quantity < 0) {
            throw new Error('Quantity must be a positive number.');
        }

        const product = this.products.get(productId);
        if (!product) {
            throw new Error('Product not found.');
        }

        product.stock_quantity += quantity;
    }

    public decreaseStock(productId: string, quantity: number): void {
        if (quantity < 0) {
            throw new Error('Quantity must be a positive number.');
        }

        const product = this.products.get(productId);
        if (!product) {
            throw new Error('Product not found.');
        }

        if (product.stock_quantity < quantity) {
            throw new Error('Insufficient stock available.');
        }

        product.stock_quantity -= quantity;
    }

    public addProduct(product: Product): void {
        this.products.set(product.id, product);
    }

    public getProduct(productId: string): Product | undefined {
        return this.products.get(productId);
    }
}