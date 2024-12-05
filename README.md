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

### 3. Place Recommendations Based on Last Seen

#### Request

| **Method** | **POST**                             |
| :--------- | :----------------------------------- |
| `Endpoint` | `/api/destination/recommend/history` |

#### Headers

| **Key**       | **Value**            | **Description**              |
| :------------ | :------------------- | :--------------------------- |
| Authorization | `Bearer <JWT_TOKEN>` | JWT token for authentication |

### Pre-requisite

| **Step**        | **Description**                                                          |
| --------------- | ------------------------------------------------------------------------ |
| `validateToken` | Middleware to validate the JWT token. Ensures the user is authenticated. |

#### Response

| **Status Code** | **Description**                      | **Response Body** |
| --------------- | ------------------------------------ | ----------------- |
| 200             | Recommendations fetched successfully | See example below |

##### Response Example

```json
{
  "status": "success",
  "data": [
    {
      "category": "Wisata Budaya dan Sejarah",
      "city": "Kota Jakarta Barat",
      "city_tag": "jakarta",
      "cluster": 4,
      "description": "Museum yang menampilkan sejarah perbankan lokal, termasuk mata uang antik dan uang kertas internasional.",
      "id": 30,
      "image_url": "https://lh5.googleusercontent.com/p/AF1QipOKS6m4idJIhAlg02WwUkMaRzCHZlkhwjtA5qh6=w675-h390-n-k-no",
      "lat": "-6.1371066",
      "lng": "106.8129846",
      "phone": "+62 812-9157-3940",
      "place_name": "Museum Bank Indonesia",
      "rating": 4.7,
      "reviews_count": 10637,
      "state": "Daerah Khusus Ibukota Jakarta"
    }
  ]
}
```

## Cloud Architecture

![hotrip architecture drawio (6)](https://github.com/user-attachments/assets/051882ee-3d5a-4981-91c9-3ea2eb106b96)
