// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://carmart-server.onrender.com"); // Replace with your backend URL

export default socket;
