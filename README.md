# Bank Application

This is a comprehensive Bank Management System that empowers users to efficiently organize their transactions. The backend is built using Node.js and Express. The data is managed using mongodb.

## Features 

### Task Operations 

- **User Register  :** User Can Register.
- **User Login :** Users can login.
- **User logout :** Users can logout.
- **User Profile  :** User Profile .
  
- **Deposit money  :** User can deposit money to own account.
- **Withdraw money :** Users can withdraw money from own account.
- **Transfer money :** Users can transfer own money to other users account.
- **Transactions History  :** User can show transactions history.


## Tech Stack 
**Server:** Handles business logic, transaction operations, and database interactions using Node.js and Express.
**Database:** MonogoDB


## Project Setup
## Backend Setup
- Clone the repository.
- Navigate to the backend directory.



## API Endpoints Documentation

### 1.User Register

- **Endpoint:** `POST http://localhost:8000/api/user/register`
- **Description:** User can register.
- **Request Body:**
  ```json
  {
  "username": "user4",
   "pin": "1234",
  "initial": "500"
  }

 - **Response Body:**
   ```json
   {
    "message": "User registered successfully",
    "accountNumber": "BANK-9825230"
   }


### 2. User Login
- **Endpoint**: POST- `http://localhost:8000/api/user/login`
- **Description**: User can login.
- **Request Body:**
  ```json
  {
  "username": "user4",
   "pin": "1234",
  "initial": "500"
  }

 - **Response Body:**
   ```json
   {
    "message": "User registered successfully",
    "accountNumber": "BANK-9825230"
   }
```

```
### 3. User Profile
- **Endpoint**: GET- `http://localhost:8000/api/user/profile`
- **Description**: Reterived User Profile.

- Response Body:
```json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2VkZmIzZjJkZTllMmE4MjFjODRhYyIsInRva2VuVmVyc2lvbiI6MSwiaWF0IjoxNzMyMTc4MTQ4LCJleHAiOjE3MzIxNzkwNDh9.wjVGYkhSSfdLeNRvWhi4_xuKN9fUn7uiPY7Nh5VM83g",
    "transactionHistory": [],
    "user": {
        "_id": "673edfb3f2de9e2a821c84ac",
        "username": "user3",
        "pin": "$2a$10$LX6/Qcukh3RPjV0jgfqCJeSzw5zqtRhDiiSZubDFL2r51K86k5dty",
        "accountNumber": "BANK-5218408",
        "balance": 400,
        "isLocked": false,
        "failedAttempts": 0,
        "transactions": [],
        "tokenVersion": 1,
        "__v": 0
    }
}

```

### 5. User Logout
- **Endpoint**: DELETE- `http://localhost:8080/api/user/logout`
- **Description**:User can Logout. 
- Response Body:
```json

{
    "message": "Logout successful."
}

```

## Transactions EndPoints


### 1. Deposit Money
- **Endpoint**: POST- `http://localhost:8000/api/transactions/deposit`
- **Description**: User can deposit money to own money.
- **Request Body:**
  ```json
  {
  "amount":"500",
  "pin":"1234"
  }

 - **Response Body:**
   ```json
   {
    "message": "Deposit successful",
    "balance": 900
   }

### 2. WithDraw Money
- **Endpoint**: POST- `http://localhost:8000/api/transactions/withdraw`
- **Description**: User can withdraw money from own money.
- **Request Body:**
  ```json
  {
  "amount":"300",
  "pin":"1234"
  }

 - **Response Body:**
   ```json
   {
    "message": "Withdrawal successful",
    "balance": 600
   }

### 3. Transfer Money to other account
- **Endpoint**: POST- `http://localhost:8000/api/transactions/transfer`
- **Description**: User can transfer money to other account.
- **Request Body:**
  ```json
  {
  "toAccount":"BANK-5688649",
  "amount":"500",
  "pin":"1234"
  }

 - **Response Body:**
   ```json
   {
    "message": "Transfer successful",
    "balance": 100
   }

 ### 4. Transaction History 
- **Endpoint**: POST- `http://localhost:8000/api/transactions/histpry`
- **Description**: Transactions history.
- **Response Body:**
   ```json
     {
        "_id": "673ef2b58ee4d415becfd630",
        "type": "TRANSFER",
        "amount": 500,
        "fromAccount": "BANK-5218408",
        "toAccount": "BANK-5688649",
        "balanceAfter": 100,
        "timestamp": "2024-11-21T08:43:33.284Z",
        "__v": 0
    },
   


---------------------------------------------------------------------------------------
## video
https://drive.google.com/file/d/1uc3vFNZvjG3WZYmSOyO2mYOaouUr1nPc/view?usp=sharing
