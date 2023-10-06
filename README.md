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
- `POST https://online-cow-service.vercel.app/api/v1/cows`: Add a new cow.
- `PUT https://online-cow-service.vercel.app/api/v1/cows/:id`: Update details of a specific cow.
- `DELETE https://online-cow-service.vercel.app/api/v1/cows/:id`: Delete a specific cow.
  

### Order

- `GET https://online-cow-service.vercel.app/api/v1/orders`: Get a list of all order.
- `GET https://online-cow-service.vercel.app/api/v1/orders/:id`: Get details of a specific order.
- `POST https://online-cow-service.vercel.app/api/v1/orders`: Add a new order.
- `PUT https://online-cow-service.vercel.app/api/v1/orders/:id`: Update details of a specific order.
- `DELETE https://online-cow-service.vercel.app/api/v1/orders/:id`: Delete a specific order.
  
  
### Admin

- `GET https://online-cow-service.vercel.app/api/v1/admins`: Get a list of all admin.
- `GET https://online-cow-service.vercel.app/api/v1/admins/login`: Admin Login.
- `POST https://online-cow-service.vercel.app/api/v1/auth/signup/admins/create-admin`: Add a new Admin.

### Auth

- `PUT https://online-cow-service.vercel.app/api/v1/auth/login`: User Login.
- `POST https://online-cow-service.vercel.app/api/v1/auth/refresh-token`: Request a refresh token.

### User

- `GET https://online-cow-service.vercel.app/api/v1/users`: Get a list of all user.
- `GET https://online-cow-service.vercel.app/api/v1/users/:id`: Get details of a specific user.
- `Post https://online-cow-service.vercel.app/api/v1/auth/signup`: Sign Up A User
- `PATCH https://online-cow-service.vercel.app/api/v1/users/:id`: Update an user
- `Delete https://online-cow-service.vercel.app/api/v1/users/:id`: delete an user
- `GET https://online-cow-service.vercel.app/api/v1/users/my-profile`: Get a user profile.
- `PATCH https://online-cow-service.vercel.app/api/v1/users/my-profile`: Update details of a specific user profile.
  
