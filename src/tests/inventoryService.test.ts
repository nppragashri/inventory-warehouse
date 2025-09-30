import { InventoryService } from '../services/inventoryService';
import { Product } from '../models/product';

describe('InventoryService', () => {
    let inventoryService: InventoryService;

    beforeEach(() => {
        inventoryService = new InventoryService();
    });

    describe('increaseStock', () => {
        it('should increase stock quantity correctly', () => {
            const product = new Product('1', 'Test Product', 'Test Description', 10, 5);
            inventoryService.addProduct(product);
            inventoryService.increaseStock('1', 5);
            const updatedProduct = inventoryService.getProduct('1');
            expect(updatedProduct?.stock_quantity).toBe(15);
        });

        it('should not increase stock for non-existent product', () => {
            expect(() => inventoryService.increaseStock('999', 5)).toThrow('Product not found.');
        });
    });

    describe('decreaseStock', () => {
        it('should decrease stock quantity correctly', () => {
            const product = new Product('2', 'Test Product', 'Test Description', 10, 5);
            inventoryService.addProduct(product);
            inventoryService.decreaseStock('2', 5);
            const updatedProduct = inventoryService.getProduct('2');
            expect(updatedProduct?.stock_quantity).toBe(5);
        });

        it('should throw an error if stock goes below zero', () => {
            const product = new Product('3', 'Test Product', 'Test Description', 5, 5);
            inventoryService.addProduct(product);
            expect(() => inventoryService.decreaseStock('3', 10)).toThrow('Insufficient stock available.');
        });

        it('should not decrease stock for non-existent product', () => {
            expect(() => inventoryService.decreaseStock('999', 5)).toThrow('Product not found.');
        });
    });
});