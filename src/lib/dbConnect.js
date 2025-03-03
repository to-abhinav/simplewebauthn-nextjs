// // import mongoose from "mongoose";

// // const dbConnect = async () => {
// //   try {
// //     if (mongoose.connection.readyState === 1) {
// //       console.log("Already connected to database");
// //       return;
// //     }
// //     await mongoose.connect(process.env.MONGO_URI);
// //     const connection = mongoose.connection;

// //     connection.on("error", (error) => {
// //       console.log("Error connecting to database: ", error);
// //     });

// //     connection.once("connected", () => {
// //       console.log("Connected to database");
// //     });

// //     process.exit();
// //   } catch (error) {
// //     console.log("Error connecting to database: ", error);
// //     process.exit(1);
// //   }
// // };

// // export default dbConnect;
// //**THIS IS FOR THE OFFLINE USE ***/

// // Load users from localStorage if available
// const USERS = JSON.parse(localStorage.getItem("users")) || [];

// // Save USERS array to localStorage
// function saveUsersToLocalStorage() {
//   localStorage.setItem("users", JSON.stringify(USERS));
// }

// // Get user by email
// function getUserByEmail(email) {
//   return USERS.find((user) => user.email === email);
// }

// // Get user by ID
// function getUserById(id) {
//   return USERS.find((user) => user.id === id);
// }

// // Create a new user and save to localStorage
// function createUser(id, email, passKey) {
//   USERS.push({ id, email, passKey });
//   saveUsersToLocalStorage();
// }

// // Update user counter and save changes
// function updateUserCounter(id, counter) {
//   const user = USERS.find((user) => user.id === id);
//   if (user) {
//     user.passKey.counter = counter;
//     saveUsersToLocalStorage();
//   } else {
//     console.warn("User not found!");
//   }
// }

// // Remove a user by ID
// function removeUser(id) {
//   const index = USERS.findIndex((user) => user.id === id);
//   if (index !== -1) {
//     USERS.splice(index, 1);
//     saveUsersToLocalStorage();
//   }
// }

// // Export functions
// export { getUserByEmail, getUserById, createUser, updateUserCounter, removeUser };


import { LocalStorage } from "node-localstorage";

// Initialize localStorage in a directory called "storage"
const localStorage = new LocalStorage("./storage");

// Load USERS from localStorage or initialize as an empty array
const USERS = JSON.parse(localStorage.getItem("users")) || [];

// Save USERS array to localStorage
function saveUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(USERS));
}

// Get user by email
function getUserByEmail(email) {
  return USERS.find((user) => user.email === email);
}

// Get user by ID
function getUserById(id) {
  return USERS.find((user) => user.id === id);
}

// Create a new user and save to localStorage
function createUser(id, email, passKey) {
  USERS.push({ id, email, passKey });
  saveUsersToLocalStorage();
}

// Update user counter and save changes
function updateUserCounter(id, counter) {
  const user = USERS.find((user) => user.id === id);
  if (user) {
    user.passKey.counter = counter;
    saveUsersToLocalStorage();
  } else {
    console.warn("User not found!");
  }
}

// Remove a user by ID
function removeUser(id) {
  const index = USERS.findIndex((user) => user.id === id);
  if (index !== -1) {
    USERS.splice(index, 1);
    saveUsersToLocalStorage();
  }
}

// Export functions
export { getUserByEmail, getUserById, createUser, updateUserCounter, removeUser };
