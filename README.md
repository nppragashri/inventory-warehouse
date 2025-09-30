# Warehouse API

## Overview
The Warehouse API is a backend-heavy application designed to track products in a warehouse. It provides a robust set of features for managing product inventory, including full CRUD operations and inventory management logic.

## Features
- **Product Management**: Create, read, update, and delete products.
- **Inventory Logic**: 
  - Increase and decrease stock quantities with validation to prevent negative stock levels.
  - List products that are below a specified low stock threshold.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd warehouse-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the application, run:
```
npm start
```
The server will start on `http://localhost:3000`.

### API Endpoints
- **Create Product**: `POST /products`
- **Get Product**: `GET /products/:id`
- **Update Product**: `PUT /products/:id`
- **Delete Product**: `DELETE /products/:id`
- **Increase Stock**: `PATCH /products/:id/increase`
- **Decrease Stock**: `PATCH /products/:id/decrease`
- **List Low Stock Products**: `GET /products/low-stock`

## Running Tests
To run the unit tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.