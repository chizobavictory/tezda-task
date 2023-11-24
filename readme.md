### Tezda Task

# Lambda
This Serverless Lambda API provides functionality for user authentication, registration, and password management. The lambda function is exposed via API Gateway. The database is DynamoDB and I setup a CI/CD pipeline using CodePipeline. 

# Base URL
https://mul2xiuj3i.execute-api.us-east-1.amazonaws.com/production/

# Endpoints
- Health Check
- Path: /health
- Method: GET
- Description: Check the health of the serverless function.
- Example: GET /health

- Register
- Path: /register
- Method: POST
- Description: Register a new user.
- Example: POST /register

- Login
- Path: /login
- Method: POST
- Description: Login a user.
- Example: POST /login

- Forgot Password
- Path: /forgot-password
- Method: POST
- Description: Send a password reset email to the user.
- Example: POST /forgot-password

- Reset Password
- Path: /reset-password
- Method: POST
- Description: Reset the user's password.
- Example: POST /reset-password

- Change Password
- Path: /change-password
- Method: POST
- Description: Change the user's password.
- Example: POST /change-password

- Refresh Token
- Path: /refresh-token
- Method: POST
- Description: Refresh the user's access token.
- Example: POST /refresh-token
