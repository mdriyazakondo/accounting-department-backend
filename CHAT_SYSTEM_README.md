# Real-Time Chat System with Socket.IO

This backend implements a complete real-time chat system using Socket.IO with OTP-based authentication and JWT tokens.

## Features

- **Real-Time Messaging**: Instant message delivery using WebSocket connections
- **JWT Authentication**: Secure socket authentication using JWT tokens
- **Chat Rooms**: Support for public, private, and direct message rooms
- **Message History**: Persistent message storage with pagination
- **Online Status**: Real-time online/offline user status tracking
- **Typing Indicators**: Live typing status for better UX
- **Message Read Status**: Track which users have read messages
- **OTP Integration**: Requires OTP-verified users for chat access

## Database Models

### Message Collection

```javascript
{
  sender: String,           // User ID
  senderEmail: String,      // User email for display
  roomId: String,           // Chat room ID
  content: String,          // Message content
  messageType: String,      // "text", "image", "file"
  timestamp: Date,          // Message timestamp
  readBy: [String],         // Array of user IDs who read the message
}
```

### ChatRoom Collection

```javascript
{
  name: String,             // Room name
  type: String,             // "public", "private", "direct"
  participants: [String],   // Array of user IDs
  createdBy: String,        // User ID who created the room
  lastMessage: {            // Last message in room
    content: String,
    sender: String,
    senderEmail: String,
    timestamp: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### UserStatus Collection

```javascript
{
  userId: String,           // User ID (unique)
  email: String,            // User email
  isOnline: Boolean,        // Online status
  lastSeen: Date,           // Last seen timestamp
  socketId: String          // Current socket connection ID
}
```

## REST API Endpoints

All chat endpoints require JWT authentication via `Authorization: Bearer <token>` header.

### 1. Get User's Chat Rooms

**GET** `/api/chat/rooms`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Chat rooms retrieved successfully",
  "data": [
    {
      "_id": "room_id",
      "name": "General Chat",
      "type": "public",
      "participants": ["user1", "user2"],
      "lastMessage": {
        "content": "Hello everyone!",
        "sender": "user1",
        "senderEmail": "user1@example.com",
        "timestamp": "2024-01-01T10:00:00.000Z"
      }
    }
  ]
}
```

### 2. Create Chat Room

**POST** `/api/chat/rooms`

**Request Body:**

```json
{
  "name": "Project Discussion",
  "type": "private",
  "participants": ["user2", "user3"]
}
```

**Response:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Chat room created successfully",
  "data": {
    "_id": "room_id",
    "name": "Project Discussion",
    "type": "private",
    "participants": ["user1", "user2", "user3"]
  }
}
```

### 3. Get Message History

**GET** `/api/chat/rooms/:roomId/messages?limit=50&offset=0`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Message history retrieved successfully",
  "data": [
    {
      "_id": "msg_id",
      "sender": "user1",
      "senderEmail": "user1@example.com",
      "roomId": "room_id",
      "content": "Hello!",
      "messageType": "text",
      "timestamp": "2024-01-01T10:00:00.000Z",
      "readBy": ["user1", "user2"]
    }
  ]
}
```

### 4. Join Chat Room

**POST** `/api/chat/rooms/:roomId/join`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Successfully joined the room",
  "data": {
    /* room object */
  }
}
```

### 5. Get Online Users

**GET** `/api/chat/online-users`

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Online users retrieved successfully",
  "data": [
    {
      "userId": "user1",
      "email": "user1@example.com",
      "isOnline": true,
      "lastSeen": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

## Socket.IO Events

### Connection & Authentication

**Client Connection:**

```javascript
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: "your-jwt-token-here",
  },
});
```

### Room Management

**Join Room:**

```javascript
socket.emit("join-room", "room_id");
```

**Leave Room:**

```javascript
socket.emit("leave-room", "room_id");
```

### Messaging

**Send Message:**

```javascript
socket.emit("send-message", {
  roomId: "room_id",
  content: "Hello everyone!",
  messageType: "text", // optional: 'text', 'image', 'file'
});
```

**Receive Message:**

```javascript
socket.on("new-message", (message) => {
  console.log("New message:", message);
  // message object contains sender, content, timestamp, etc.
});
```

**Message History:**

```javascript
socket.on("message-history", (messages) => {
  console.log("Message history:", messages);
  // Array of message objects
});
```

### Typing Indicators

**Start Typing:**

```javascript
socket.emit("typing-start", "room_id");
```

**Stop Typing:**

```javascript
socket.emit("typing-stop", "room_id");
```

**Receive Typing Status:**

```javascript
socket.on("user-typing", (data) => {
  console.log(
    data.userEmail,
    data.isTyping ? "is typing..." : "stopped typing",
  );
});
```

### Online Status

**Get Online Users:**

```javascript
socket.emit("get-online-users");
```

**Receive Online Users:**

```javascript
socket.on("online-users", (users) => {
  console.log("Online users:", users);
});
```

**Online Users Update:**

```javascript
socket.on("online-users-update", (users) => {
  console.log("Online users updated:", users);
});
```

### Error Handling

**Receive Errors:**

```javascript
socket.on("error", (error) => {
  console.error("Socket error:", error.message);
});
```

## Client Implementation Example

```javascript
import io from "socket.io-client";

// Connect with JWT token
const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

// Connection events
socket.on("connect", () => {
  console.log("Connected to chat server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from chat server");
});

// Join a room
function joinRoom(roomId) {
  socket.emit("join-room", roomId);
}

// Send a message
function sendMessage(roomId, content) {
  socket.emit("send-message", {
    roomId,
    content,
    messageType: "text",
  });
}

// Listen for new messages
socket.on("new-message", (message) => {
  displayMessage(message);
});

// Listen for typing indicators
socket.on("user-typing", (data) => {
  showTypingIndicator(data.userEmail, data.isTyping);
});

// Handle errors
socket.on("error", (error) => {
  alert("Chat error: " + error.message);
});
```

## Security Features

- ✅ **JWT Authentication**: All socket connections require valid JWT tokens
- ✅ **Room Authorization**: Users can only join rooms they are participants in
- ✅ **OTP Verification**: Only OTP-verified users can access chat
- ✅ **Input Validation**: All inputs are validated and sanitized
- ✅ **Rate Limiting**: Ready for rate limiting implementation
- ✅ **Connection Limits**: Single connection per user

## Architecture

```
Client (Browser/Mobile)
    ↓ WebSocket
Socket.IO Server
    ↓ JWT Auth
Authentication Middleware
    ↓ Business Logic
Chat Service
    ↓ Database
MongoDB Collections
```

## Environment Variables

Add to your `.env` file:

```env
# Socket.IO (optional - defaults provided)
SOCKET_CORS_ORIGIN=*
```

## Testing

### Start the server:

```bash
npm run dev
```

### Test with curl (REST API):

```bash
# Get chat rooms (replace TOKEN with actual JWT)
curl -H "Authorization: Bearer TOKEN" \
     http://localhost:5000/api/chat/rooms
```

### Test with Socket.IO client:

```javascript
// Use browser console or Node.js client
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  auth: { token: "your-jwt-token" },
});
```

## Production Considerations

1. **CORS Configuration**: Update `SOCKET_CORS_ORIGIN` for production domains
2. **Rate Limiting**: Implement rate limiting for socket events
3. **Message Encryption**: Consider end-to-end encryption for sensitive chats
4. **File Upload**: Implement file upload handling for image/file messages
5. **Load Balancing**: Use Redis adapter for multi-server deployments
6. **Monitoring**: Add logging and monitoring for chat events

## Integration with OTP System

The chat system seamlessly integrates with the existing OTP authentication:

1. User authenticates via OTP → receives JWT token
2. JWT token used for Socket.IO authentication
3. User can access chat features immediately
4. All chat operations are secured with the same JWT

This ensures only verified users can participate in real-time chat!
