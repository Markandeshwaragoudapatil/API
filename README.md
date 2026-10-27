# API Backend

A RESTful backend API built with **Node.js**, **Express 5**, **MongoDB**, and **Mongoose**. It provides user registration and login, JWT-based authentication using HTTP-only cookies, profile access, and product management with role-based authorization.

## Features

- **User registration and login** with password hashing using Argon2.
- **JWT authentication**: signed tokens contain the user ID and expire after 5 minutes.
- **HTTP-only cookie** storage for the authentication token.
- **Profile endpoint** for authenticated users.
- **Product CRUD endpoints**: list, retrieve, create, update, and delete products.
- **Role-based authorization**: product creation, updates, and deletion are restricted to users with the `admin` role.
- **MongoDB persistence** with Mongoose schemas and validation.
- **Centralized error handling** and reusable middleware.

## Tech stack

- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- Argon2
- `cookie-parser`

## Getting started

### Prerequisites

Install a recent version of Node.js and have access to a running MongoDB instance (local MongoDB or MongoDB Atlas).

### 1. Clone the repository

```bash
git clone https://github.com/Markandeshwaragoudapatil/API.git
cd API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/api
JWT_SECRET=replace_with_a_long_random_secret
```

Use your own MongoDB connection string for `MONGO_URI`. Keep `.env` out of version control and never commit database credentials or JWT secrets. The current code reads variables from `process.env`; make sure your runtime or development command loads the `.env` file (for example, with a dotenv setup) before starting the app.

### 4. Start the server

```bash
node app.js
```

The server uses port `3000` if `PORT` is not set. The database connection must succeed before the server starts listening.

> **Cookie / local development note:** the current login and registration handlers set the JWT cookie with `secure: true`. Browsers send Secure cookies only over HTTPS, so cookie-based authentication may not work on plain HTTP localhost. For local development, configure cookie options appropriately; in production, use HTTPS.

## Automated tests

Run the automated API tests with:

```bash
npm test
```

The test suite uses Node.js's built-in test runner and does not require a running MongoDB instance. GitHub Actions runs the same command on pushes to the test branch and on pull requests targeting `main`.

## API endpoints

All request and response bodies use JSON unless noted otherwise.

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/register` | No | Register a user and set the JWT cookie |
| `POST` | `/login` | No | Authenticate a user and set the JWT cookie |
| `GET` | `/profile` | JWT cookie | Return the authenticated user's profile |
| `DELETE` | `/logout` | JWT cookie | Clear the authentication cookie |
| `GET` | `/products` | JWT cookie | List all products |
| `GET` | `/products/:id` | JWT cookie | Retrieve one product |
| `POST` | `/products` | JWT cookie + admin role | Create a product |
| `PUT` | `/products/:id` | JWT cookie + admin role | Update a product |
| `DELETE` | `/products/:id` | JWT cookie + admin role | Delete a product |

### Example requests

Register a user:

```http
POST /register
Content-Type: application/json

{
  "name": "Example User",
  "username": "example",
  "password": "choose-a-strong-password"
}
```

Log in:

```http
POST /login
Content-Type: application/json

{
  "username": "example",
  "password": "choose-a-strong-password"
}
```

Get the current user's profile (send the cookie created by registration or login):

```http
GET /profile
```

Get all products (requires a valid JWT cookie):

```http
GET /products
```

Create a product (requires an authenticated admin account):

```http
POST /products
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 2499,
  "status": "available"
}
```

Allowed product statuses are `available` and `out of stock`. Product creation, editing, and deletion require a user whose database role is `admin`; ordinary registrations default to `user`.

## Authentication flow

1. A client submits registration or login details.
2. The server hashes new passwords using Argon2 and stores the hash, not the original password.
3. On login, the server verifies the provided password against the stored hash.
4. The server signs a JWT containing the user's ID using `JWT_SECRET` and sets it in a cookie.
5. Protected routes verify the token before continuing. Admin-only product mutations also check the user's role.
6. Logout clears the token cookie in the browser.

The JWT expires after **5 minutes** in the current implementation. Clearing the cookie on logout removes it from the client, but does not independently revoke a copied JWT before its expiry.

## Project structure

```text
API/
├── app.js
├── controllers/       # HTTP request handlers
├── middleware/        # JWT authentication and admin authorization
├── models/            # Mongoose User and Product schemas
├── routes/            # Endpoint definitions
├── services/          # Database and business logic
├── utils/             # JWT helper, async handler and app error
└── package.json
```

## Security notes

- Use a strong, private `JWT_SECRET` and keep environment files out of Git.
- Use HTTPS in production and configure cookie options, including `httpOnly`, `secure`, and an appropriate `sameSite` policy.
- Because authentication uses cookies, assess CSRF protections for your deployment and client architecture.
- Validate and sanitize incoming request data and return consistent error responses.
- Give admin privileges only to trusted accounts.

## License

No license is specified in the repository at the time this README was written. Add a `LICENSE` file if you want to define how others may use, modify, and distribute this project.
