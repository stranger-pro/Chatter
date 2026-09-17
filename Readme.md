# Chatter 💬

A modern real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO.

Chatter allows users to register, log in, search for users, create conversations, send real-time messages, edit messages, delete messages, and see online users.

## ✨ Features

- 🔐 User Authentication
- 📝 User Registration
- 🔑 User Login
- 🛡️ JWT Authentication
- 👤 User Search
- 💬 One-to-One Chat
- ⚡ Real-Time Messaging
- 🟢 Online User Status
- ✏️ Edit Messages
- 🗑️ Delete Messages
- 🔒 Protected Routes
- 🔔 Toast Notifications
- 📱 Responsive UI
- 🎨 Tailwind CSS
- 🚀 Vite Development Environment

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Socket.IO Client
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv
- Nodemon

## 📁 Project Structure

    Chatter/
    │
    ├── Backend/
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── controllers/
    │   │   ├── chat_controller.js
    │   │   ├── message.js
    │   │   └── user_controller.js
    │   │
    │   ├── middleware/
    │   │   └── auth.js
    │   │
    │   ├── models/
    │   │   └── ...
    │   │
    │   ├── routes/
    │   │   ├── user.js
    │   │   ├── chat.js
    │   │   └── message.js
    │   │
    │   ├── Socket/
    │   │   └── soket.js
    │   │
    │   ├── index.js
    │   ├── package.json
    │   └── .env
    │
    ├── Frontend/
    │   ├── public/
    │   │
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── App.jsx
    │   │   └── ...
    │   │
    │   ├── package.json
    │   └── ...
    │
    ├── .gitignore
    ├── package-lock.json
    └── README.md

## 🔄 Application Architecture

    ┌──────────────────────┐
    │      React App       │
    │   Vite + Tailwind    │
    └──────────┬───────────┘
               │
               │ HTTP / REST API
               │
               ▼
    ┌──────────────────────┐
    │    Express Server    │
    │       Node.js        │
    └───────┬────────┬─────┘
            │        │
            │        │ Socket.IO
            │        │
            ▼        ▼
     ┌──────────┐  ┌──────────────┐
     │ MongoDB  │  │ Real-Time    │
     │ Database │  │ Communication│
     └──────────┘  └──────────────┘

## 🚀 Getting Started

Follow the steps below to run Chatter locally.

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB
- Git

You can use either a local MongoDB installation or MongoDB Atlas.

## 📥 Installation

Clone the repository:

    git clone https://github.com/stranger-pro/Chatter.git

Move into the project directory:

    cd Chatter

## ⚙️ Backend Setup

Go to the backend directory:

    cd Backend

Install backend dependencies:

    npm install

## 🔐 Environment Variables

Create a `.env` file inside the `Backend` directory.

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

Example:

    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/chatter
    JWT_SECRET=your_super_secret_key

Never commit your `.env` file to GitHub.

## ▶️ Run Backend

For development:

    npm run dev

For production:

    npm start

The backend will run on:

    http://localhost:5000

## 💻 Frontend Setup

Open another terminal and go to the frontend directory:

    cd Frontend

Install dependencies:

    npm install

## ▶️ Run Frontend

Start the Vite development server:

    npm run dev

The frontend will normally be available at:

    http://localhost:5173

Open the URL in your browser.

## 🔑 Authentication API

### Register User

    POST /api/user/register

Used to create a new user account.

### Sign In

    POST /api/user/signin

Used to authenticate an existing user.

### Fetch Current User

    GET /api/user/fetchUser

Returns information about the authenticated user.

## 💬 Chat API

### Create Chat

    POST /api/chat/createChat

Creates a conversation between users.

### Fetch Chat

    POST /api/chat/fetchChat

Fetches conversation information for the authenticated user.

## 📨 Message API

### Create Message

    POST /api/message/createMessage

Creates and sends a message.

### Edit Message

    PUT /api/message/editMessage

Updates an existing message.

### Delete Message

    DELETE /api/message/deleteMessage

Deletes an existing message.

## ⚡ Real-Time Communication

Chatter uses Socket.IO for real-time communication.

When a user connects, the Socket.IO server identifies the user and maintains an active connection.

The application keeps track of connected users and broadcasts online-user information.

The online users event used by the application is:

    getOnlineUsers

The basic Socket.IO flow is:

    Client
       │
       │ Socket.IO Connection
       ▼
    Socket.IO Server
       │
       ├── Track Connected Users
       │
       ├── Broadcast Online Users
       │
       └── Handle Disconnect

## 🖥️ Frontend Routes

| Route | Description |
|---|---|
| `/signin` | User login |
| `/signup` | User registration |
| `/chat` | Chat dashboard |
| `/search` | Search users |
| `/chat/:chatid` | Individual chat |
| `*` | Not Found page |

## 📜 NPM Scripts

### Frontend

Start development server:

    npm run dev

Build for production:

    npm run build

Run ESLint:

    npm run lint

Preview production build:

    npm run preview

### Backend

Start server:

    npm start

Start development server:

    npm run dev

The development command uses Nodemon so the server can automatically restart when backend files change.

## 🧑‍💻 How Chatter Works

The basic application flow is:

    1. User opens Chatter
              │
              ▼
    2. User signs up / signs in
              │
              ▼
    3. Backend authenticates user
              │
              ▼
    4. JWT is used for protected requests
              │
              ▼
    5. User searches for another user
              │
              ▼
    6. Conversation is created
              │
              ▼
    7. Users exchange messages
              │
              ▼
    8. Socket.IO provides real-time communication
              │
              ▼
    9. Messages can be edited or deleted

## 🔒 Security

Chatter uses several security mechanisms:

- JWT authentication
- Password hashing using bcrypt
- Protected API routes
- Authentication middleware
- Environment variables
- CORS
- Protected frontend routes

### Production Security Recommendations

Before deploying the application:

- Use a strong JWT secret.
- Do not expose your `.env` file.
- Use HTTPS.
- Use a secure MongoDB connection.
- Restrict CORS to your frontend domain.
- Configure Socket.IO origins correctly.
- Keep dependencies updated.
- Never store passwords as plain text.

## 🌐 Production Deployment

Before deploying Chatter, configure your production environment variables.

    PORT=5000
    MONGO_URI=your_production_mongodb_uri
    JWT_SECRET=your_strong_production_secret

Build the frontend:

    cd Frontend
    npm install
    npm run build

Start the backend:

    cd Backend
    npm install
    npm start

Make sure the frontend is configured to communicate with your production backend API and Socket.IO server.

## 🧪 Development Workflow

Run the backend:

    cd Backend
    npm install
    npm run dev

Open another terminal and run the frontend:

    cd Frontend
    npm install
    npm run dev

Then open the URL provided by Vite.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Clone your fork.
3. Create a new branch.
4. Make your changes.
5. Test your changes.
6. Run the frontend lint command.
7. Commit your changes.
8. Push your branch.
9. Create a Pull Request.

Example:

    git checkout -b feature/your-feature

    git add .

    git commit -m "Add your feature"

    git push origin feature/your-feature

## 🐛 Issues

If you find a bug or have a feature request, please create an issue in the GitHub repository.

## 📄 License

The backend package configuration specifies the ISC License.

Please check the repository for the complete licensing information before redistributing the project.

## 👨‍💻 Author

Developed by stranger-pro.

GitHub:

https://github.com/stranger-pro

Repository:

https://github.com/stranger-pro/Chatter

## ⭐ Support

If you like this project, consider giving the repository a star on GitHub.

## 📌 Quick Start

### Backend

    cd Backend
    npm install
    npm run dev

### Frontend

    cd Frontend
    npm install
    npm run dev

Then open:

    http://localhost:5173

Enjoy chatting with Chatter! 💬🚀
