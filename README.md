# Hotrip - Horas Trip App - CLOUD COMPUTING

## Bangkit Capstone Project 2024H2

## Description

## API Documentation

### 1. Register User

#### Request

| **Method**     | **POST**                         |
| :------------- | :------------------------------- |
| `Endpoint`     | `/api/user/register`             |
| `Headers`      | `Content-Type: application/json` |
| `Request Body` | `JSON`                           |

##### Example

```json
{
  "username": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "johndoesecret",
  "confirmPassword": "johndoesecret",
  "userLocation": "Jakarta"
}
```

#### Response

| **Method** | **Description**      | **Response Body**                                                         |
| :--------- | :------------------- | ------------------------------------------------------------------------- |
| 201        | Success              | `{"status": "success","message": "User has been successfully created"}`   |
| 400        | Bad request          | `{"status": "failed","data": "Email has been used for registration"}`     |
| 422        | Unprocessable Entity | `{"status": "failed", "message": "\"email\" is not allowed to be empty"}` |

### 2. Login User

#### Request

| **Method**     | **POST**                         |
| :------------- | :------------------------------- |
| `Endpoint`     | `/api/user/login`                |
| `Headers`      | `Content-Type: application/json` |
| `Request Body` | `JSON`                           |

##### Example

```json
{
  "email": "johndoe@gmail.com",
  "password": "johndoesecret"
}
```

#### Response

| **Method** | **Description**        | **Response Body**                                                                 |
| :--------- | :--------------------- | --------------------------------------------------------------------------------- |
| 200        | Success                | `{"status": "success","token":"this-is-a-secret-token"}`                          |
| 400        | Bad request (Password) | `{"status": "failed","message": "Wrong Password"} or  `                           |
| 400        | Bad request (Email)    | `{"status": "failed","message": "Account is not found. Email is not registered"}` |
| 422        | Unprocessable Entity   | `{"status": "failed", "message": "\"email\" is not allowed to be empty"}`         |

## Cloud Architecture

![hotrip architecture drawio (6)](https://github.com/user-attachments/assets/051882ee-3d5a-4981-91c9-3ea2eb106b96)
{"status": "success","message": "User has been successfully created"}
