# Vue + Node.js + Mongoose Project Study Notes
Ps : I write this note in english for convience and practice
## Project Setup

**Frontend (Vue)**:
```bash
npm create vue@latest
```

**Backend (Node.js)**:
```bash
npm init -y
npm install express mongoose cors
```

## Project Start

**Backend**:
```bash
node server.js
```

**Frontend**:
```bash
npm run dev
```

## File Structure (For Reference)
```python
mygo-project/
├── backend/                 # Backend server files
│   ├── controllers/         # Contains controller files to handle requests
│   │   └── userController.js
│   ├── models/              # Contains Mongoose models (schemas)
│   │   └── User.js
│   ├── routes/              # Routes for different endpoints
│   │   └── userRoutes.js
│   ├── server.js            # Main backend server file
│   ├── .env                 # Environment variables (e.g., MongoDB URI)
│   └── package.json         # Backend dependencies and scripts
├── frontend/                # Frontend (Vue) files
│   ├── public/              # Public assets (e.g., index.html, images)
│   │   └── index.html       # Main HTML template
│   ├── src/                 # Source files for the frontend application
│   │   ├── assets/          # Static assets (e.g., images, styles)
│   │   ├── components/      # Reusable Vue components
│   │   │   └── Header.vue
│   │   ├── router/          # Vue Router configuration
│   │   │   └── index.js
│   │   ├── store/           # Vuex store for state management (optional)
│   │   │   └── index.js
│   │   ├── views/           # Vue views (pages)
│   │   │   ├── Home.vue
│   │   │   └── Login.vue
│   │   ├── App.vue          # Root Vue component
│   │   ├── main.js          # Main entry point for Vue app
│   │   └── assets/          # Styles (CSS or SCSS files)
│   │       └── main.css
│   ├── .env                 # Environment variables for frontend
│   └── package.json         # Frontend dependencies and scripts
└── README.md                # Project documentation
```

## App.vue, main.js, and server.js (Backend) [Quick Start Help]

> **App.vue**
```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
const name = 'App'
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
```

> **main.js**
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router) // Use the router for navigation

app.mount('#app')   // Mount the Vue app to the DOM
```

> **server.js (Backend)**
```javascript
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')    // Solves cross-origin issues. Express blocks cross-origin requests by default, and browsers block them as well.
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors()) // Enable CORS for all routes
app.use(express.json())   // Middleware to parse JSON requests

app.use('/api/user', userRoutes) // User routes

mongoose.connect('mongodb://127.0.0.1:27017/mygo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
})
```

### Common Files in Most Projects
- `App.vue` (Vue Component)
- `main.js` (Vue Setup & Routing)
- `server.js` (Backend Setup with Express and MongoDB)

## Communication Process
1. **Login.vue (Client-side)** sends a request to the API.
2. **userRoutes (Server-side)** handles the API request.
3. Server processes the data and returns a response to the **Client-side**.

**Login or Register Data** is stored in `req.body`.  
The **Backend** can then operate on this data.


## mongo Cheatsheet
```c
mongosh                                    // Start MongoDB shell
mongosh "mongodb://127.0.0.1:27017/mydb"   // Connect to specific database

show dbs                                   // Show all databases
use mydb                                   // Switch to (or create) database
db                                         // Show current database

show collections                           // Show all collections in current database

db.users.find()                            // Find all documents in 'users' collection
db.users.findOne({ username: 'test' })      // Find one document matching condition

db.users.insertOne({ username: 'a', password: '123' })    // Insert one document
db.users.insertMany([{...}, {...}])                        // Insert multiple documents

db.users.updateOne(
  { username: 'a' }, 
  { $set: { password: 'newpass' } }
)                                           // Update one document (change fields)

db.users.deleteOne({ username: 'a' })        // Delete one document
db.users.deleteMany({ age: { $lt: 18 } })    // Delete multiple documents matching condition

db.users.drop()                             // Drop (delete) the whole 'users' collection

db.dropDatabase()                           // Drop (delete) the whole current database

exit                                        // Exit the mongosh shell
```

```bash
Quick Tips:
Database = like a folder (contains collections)

Collection = like a table (contains documents)

Document = like a row (JSON object)
```