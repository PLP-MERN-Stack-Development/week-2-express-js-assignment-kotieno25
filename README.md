[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19779067&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

A RESTful API built with Express.js that implements CRUD operations for a product resource, with features like authentication, validation, error handling, filtering, pagination, and search.

## Features

- RESTful API endpoints for product management
- Custom middleware for logging, authentication, and validation
- Comprehensive error handling
- Advanced features:
  - Filtering by category
  - Pagination
  - Search functionality
  - Product statistics

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   API_KEY=your-secret-api-key-123
   ```

4. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:
```bash
npm run dev
```

## API Documentation

### Authentication

All API endpoints require an API key to be included in the request headers:
```
X-API-Key: your-secret-api-key-123
```

### Endpoints

#### Products

- `GET /api/products`
  - Get all products
  - Query parameters:
    - `category`: Filter by category
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `search`: Search by product name
  - Response:
    ```json
    {
      "total": 3,
      "page": 1,
      "limit": 10,
      "products": [...]
    }
    ```

- `GET /api/products/stats`
  - Get product statistics
  - Response:
    ```json
    {
      "total": 3,
      "categories": {
        "electronics": 2,
        "kitchen": 1
      },
      "inStock": 2,
      "outOfStock": 1
    }
    ```

- `GET /api/products/:id`
  - Get a specific product
  - Response:
    ```json
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
    ```

- `POST /api/products`
  - Create a new product
  - Request body:
    ```json
    {
      "name": "New Product",
      "description": "Product description",
      "price": 99.99,
      "category": "electronics",
      "inStock": true
    }
    ```

- `PUT /api/products/:id`
  - Update a product
  - Request body: Same as POST

- `DELETE /api/products/:id`
  - Delete a product
  - Response: Deleted product object

### Error Responses

All error responses follow this format:
```json
{
  "error": "ErrorType",
  "message": "Error message"
}
```

Common error types:
- `NotFoundError`: 404
- `ValidationError`: 400
- `AuthenticationError`: 401

## Testing

You can test the API using tools like Postman, Insomnia, or curl. Here's an example using curl:

```bash
# Get all products
curl -H "X-API-Key: your-secret-api-key-123" http://localhost:3000/api/products

# Create a new product
curl -X POST -H "X-API-Key: your-secret-api-key-123" -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Description","price":99.99,"category":"electronics","inStock":true}' \
  http://localhost:3000/api/products
```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 