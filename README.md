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

- `GET https://online-cow-service.vercel.app/api/v1/cows`: Get a list of all cows.
- `GET https://online-cow-service.vercel.app/api/v1/cows/:id`: Get details of a specific cow.
- `POST https://online-cow-service.vercel.app/api/v1/cows/addcows`: Add a new cow.
- `PUT https://online-cow-service.vercel.app/api/v1/cows/:id`: Update details of a specific cow.
- `DELETE https://online-cow-service.vercel.app/api/v1/cows/:id`: Delete a specific cow.
  
### Seller

- `GET https://online-cow-service.vercel.app/api/v1/seller`: Get a list of all seller.
- `GET https://online-cow-service.vercel.app/api/v1/seller/:id`: Get details of a specific seller.
- `POST https://online-cow-service.vercel.app/api/v1/auth/signup/create-seller`: Add a new seller.
- `PUT https://online-cow-service.vercel.app/api/v1/seller/:id`: Update details of a specific seller.
- `DELETE https://online-cow-service.vercel.app/api/v1/seller/:id`: Delete a specific seller.
  
### Buyer

- `GET https://online-cow-service.vercel.app/api/v1/buyer`: Get a list of all buyer.
- `GET https://online-cow-service.vercel.app/api/v1/buyer/:id`: Get details of a specific buyer.
- `POST https://online-cow-service.vercel.app/api/v1/auth/signup/create-buyer`: Add a new buyer.
- `PUT https://online-cow-service.vercel.app/api/v1/buyer/:id`: Update details of a specific buyer.
- `DELETE https://online-cow-service.vercel.app/api/v1/buyer/:id`: Delete a specific buyer.
  
### Order

- `GET https://online-cow-service.vercel.app/api/v1/order`: Get a list of all order.
- `GET https://online-cow-service.vercel.app/api/v1/order/:id`: Get details of a specific order.
- `POST https://online-cow-service.vercel.app/api/v1/order/addOrder`: Add a new order.
- `PUT https://online-cow-service.vercel.app/api/v1/order/:id`: Update details of a specific order.
- `DELETE https://online-cow-service.vercel.app/api/v1/order/:id`: Delete a specific order.
  
  
### Admin

- `GET https://online-cow-service.vercel.app/api/v1/admins`: Get a list of all admin.
- `POST https://online-cow-service.vercel.app/api/v1/auth/signup/admins/create-admin`: Add a new Admin.

### Auth

- `PUT https://online-cow-service.vercel.app/api/v1/auth/login`: User Login.
- `POST https://online-cow-service.vercel.app/api/v1/auth/refresh-token`: Request a refresh token.

### User

- `GET https://online-cow-service.vercel.app/api/v1/users`: Get a list of all user.
- `GET https://online-cow-service.vercel.app/api/v1/users/:id`: Get details of a specific user.
- `GET https://online-cow-service.vercel.app/api/v1/users/profile`: Get a user profile.
- `PATCH https://online-cow-service.vercel.app/api/v1/users/profile`: Update details of a specific user profile.
  
