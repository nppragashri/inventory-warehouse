export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public stock_quantity: number,
        public low_stock_threshold: number
    ) {}
}