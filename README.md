WTWR (What to Wear?) – Back End
This is the back-end server for the WTWR (What to Wear?) full-stack application. It manages user authentication, clothing item collections, and user interactions (such as liking/disliking items).
Built with Node.js, Express, and MongoDB, the project follows best practices in security, error handling, and continuous integration.

🌍 Deployed Project Links
Frontend:
https://alinagarapp.crabdance.com/se_project_react/

Backend API:
https://api.alinagarapp.crabdance.com

Features
✅ User registration and login with JWT-based authentication

🔐 Secure password hashing using bcrypt

👕 Full CRUD operations for clothing items

👍 Like/Dislike functionality

🛡️ Centralized error handling with custom messages

✅ Input validation using Celebrate and Joi

🌐 Configurable environment variables

🤖 GitHub Actions for automated linting and test validation

Project Structure
bash
Copy
Edit
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── utils/ # Constants and helpers
├── middlewares/ # Auth and error middleware
├── app.js # Main entry point
├── .eslintrc # Linting config
└── package.json
Getting Started (Local Setup)
Clone the Repository

bash
Copy
Edit
git clone https://github.com/aliminagar/se_project_express.git
cd se_project_express
Install Dependencies

bash
Copy
Edit
npm install
Create .env File

In the root directory, add:

ini
Copy
Edit
JWT_SECRET=yourSuperSecretKey
Run the Server

bash
Copy
Edit
npm run start
Development Mode (with Hot Reload)

bash
Copy
Edit
npm run dev
Testing
All API endpoints are tested using Postman, covering:

Creating users (valid/invalid data)

Duplicate user creation (409 conflict)

Authentication flows and invalid tokens

Clothing item creation, deletion, and edge cases

Validation for URL, email, and ObjectId

Proper status codes and JSON error responses

CI/CD with GitHub Actions
Workflows:
.github/workflows/tests-12.yml
.github/workflows/tests-13.yml

Each workflow validates:

Linting compliance

File structure and naming

Route/controller behavior

Error messages and response formats

Technologies Used
Node.js + Express.js

MongoDB + Mongoose

JWT for stateless authentication

bcrypt for password hashing

Celebrate + Joi for request validation

dotenv for environment config

GitHub Actions for CI/CD automation

Production/Deployment Notes
Backend API is deployed to:
https://api.alinagarapp.crabdance.com

Frontend is deployed to:
https://alinagarapp.crabdance.com/se_project_react/

MongoDB:
Hosted on the same VM (or as otherwise configured in .env).

Note: Accessing the root endpoint (/) of the deployed API will return { "message": "Requested resource not found" } by design.

Reviewer/Testing Instructions
Use the Sign Up page on the deployed frontend to register a new user.

Required fields: name, email, password, avatar (URL)

You can use this sample account:

Name: Janet Doe

Email: janet.doe.2025@example.com

Password: JanetRocks!77

Avatar: link

After signup, log in and test card (clothing item) creation and liking/disliking functionality.

Backend endpoints (e.g., /signin, /signup, /items) can be tested directly via Postman on the deployed API address.

Notes
MongoDB should be running locally if testing locally (mongodb://127.0.0.1:27017/wtwr_db).

Do not commit .env or sensitive data.

Always update sprint.txt before new sprint deliverables.

Follow ESLint rules for code consistency.

Author
Alireza Minagar
GitHub: @aliminagar
Frontend repo: https://github.com/aliminagar/se_project_react
