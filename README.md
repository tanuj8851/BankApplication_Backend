# Bank Application

This is a comprehensive Bank Management System that empowers users to efficiently organize their transactions. The backend is built using Node.js and Express. The data is managed using mongodb.

## Features 

### Task Operations 

- **User Register  :** User Can Register.
- **User Login :** Users can login.
- **User logout :** Users can logout.
- **User Profile  :** User Profile .
- 
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
- Response Body:
```json
{
  "username":"user4",
  "pin":"1234"
 }


```
### 3. User Profile
- **Endpoint**: GET- `http://localhost:8000/api/user/profile`
- **Description**: Reterived User Profile.

- Response Body:
```json

{
   "message": "Task Updated",
    "id": "1",
    "title": "Task 5",
    "description": "This is the fifth task",
    "status": "completed"
}

```

### 5. Delete Task
- **Endpoint**: DELETE- `http://localhost:8080/api/task/tasks/5`
- **Description**: Deletes a task by its ID.
- Response Body:
```json

{
  "message": "Task deleted successfully"
}

```
---------------------------------------------------------------------------------------
## video
https://drive.google.com/file/d/1uc3vFNZvjG3WZYmSOyO2mYOaouUr1nPc/view?usp=sharing
