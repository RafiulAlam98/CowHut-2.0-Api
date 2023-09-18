# Cow Service Management Backend API Documentation

### Live URL: https://online-cow-service.vercel.app/api/v1
Welcome to the Cow Service Management Backend API documentation. This API provides various endpoints to manage cow-related operations, including interactions between sellers, buyers, users, and cows. Authentication is a crucial part of this API to ensure secure access to the platform.

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Cows](#cows)
  - [Sellers](#sellers)
  - [Buyers](#buyers)
  - [Orders](#orders)
  - [Admin](#admin)
  - [Auth](#auth)
  - [Users](#users)


## Authentication

To access protected endpoints, you need to authenticate using JSON Web Tokens (JWT). After registration or login, the backend will provide you with a JWT token. Include this token in the `Authorization` header of your requests.

## Endpoints

### Sellers

### Cows

- `GET /cows`: Get a list of all cows.
- `GET /cows/:id`: Get details of a specific cow.
- `POST /cows/addcows`: Add a new cow.
- `PUT /cows/:id`: Update details of a specific cow.
- `DELETE /cows/:id`: Delete a specific cow.
  
### Seller

- `GET /seller`: Get a list of all seller.
- `GET /seller/:id`: Get details of a specific seller.
- `POST /auth/signup/create-seller`: Add a new seller.
- `PUT /seller/:id`: Update details of a specific seller.
- `DELETE /seller/:id`: Delete a specific seller.
  
### Buyer

- `GET /buyer`: Get a list of all buyer.
- `GET /buyer/:id`: Get details of a specific buyer.
- `POST /auth/signup/create-buyer`: Add a new buyer.
- `PUT /buyer/:id`: Update details of a specific buyer.
- `DELETE /buyer/:id`: Delete a specific buyer.
  
### Order

- `GET /order`: Get a list of all order.
- `GET /order/:id`: Get details of a specific order.
- `POST /order/addOrder`: Add a new order.
- `PUT /order/:id`: Update details of a specific order.
- `DELETE /order/:id`: Delete a specific order.
  
  
### Admin

- `GET /admins`: Get a list of all admin.
- `POST /auth/signup/admins/create-admin`: Add a new Admin.

### Auth

- `PUT /auth/login`: User Login.
- `POST /auth/refresh-token`: Request a refresh token.

### User

- `GET /users`: Get a list of all user.
- `GET /users/:id`: Get details of a specific user.
- `GET /users/profile`: Get a user profile.
- `PATCH /users/profile`: Update details of a specific user profile.
  
