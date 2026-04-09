# OTP-Based Authentication System

This backend implements a complete OTP (One-Time Password) based authentication system using email verification.

## Features

- **Email OTP Authentication**: Users can register/login using email + OTP instead of passwords
- **Secure OTP Generation**: 6-digit random OTP with 5-minute expiration
- **Email Integration**: Automated OTP delivery via email using nodemailer
- **JWT Token Generation**: Secure token-based authentication after OTP verification
- **Database Security**: Automatic cleanup of expired OTPs
- **User Management**: Automatic user creation/verification

## API Endpoints

### 1. Request OTP

**POST** `/api/auth/request-otp`

Request OTP to be sent to user's email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "OTP sent successfully to your email",
  "data": null
}
```

### 2. Verify OTP

**POST** `/api/auth/verify-otp`

Verify the OTP and authenticate the user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful", // or "Registration successful" for new users
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "isVerified": true
    },
    "token": "jwt_token_here",
    "isNewUser": false // true if newly registered
  }
}
```

## Database Models

### User Collection

```javascript
{
  email: String (required, unique),
  isVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Collection

```javascript
{
  email: String (required),
  otp: String (required),
  expiresAt: Date (required),
  createdAt: Date
}
// Note: TTL index automatically deletes expired OTPs
```

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=My Department
```

## Security Features

- ✅ OTP expires in 5 minutes
- ✅ OTP deleted after successful verification
- ✅ One OTP per email at a time (replaces old ones)
- ✅ Email validation
- ✅ JWT token-based authentication
- ✅ Automatic cleanup of expired OTPs via MongoDB TTL index

## Usage Flow

1. **User enters email** → Frontend calls `/api/auth/request-otp`
2. **Backend generates OTP** → Saves to database with expiration
3. **OTP sent to email** → User receives email with 6-digit code
4. **User submits OTP** → Frontend calls `/api/auth/verify-otp`
5. **Backend verifies OTP** → Checks validity and expiration
6. **Authentication success** → User created/verified, JWT token generated
7. **OTP cleanup** → Used OTP deleted from database

## Error Responses

### Invalid Email

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Invalid email format"
}
```

### Invalid OTP

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Invalid OTP"
}
```

### Expired OTP

```json
{
  "statusCode": 400,
  "success": false,
  "message": "OTP has expired"
}
```

## Email Configuration

For Gmail SMTP:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

For other email providers, update the `EMAIL_HOST`, `EMAIL_PORT`, and authentication details accordingly.

## Testing

You can test the endpoints using tools like Postman or curl:

```bash
# Request OTP
curl -X POST http://localhost:5000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Verify OTP (replace 123456 with actual OTP)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456"}'
```

## Integration with Frontend

The JWT token returned in the verify OTP response should be stored in the frontend (localStorage/cookies) and included in the Authorization header for subsequent API calls:

```
Authorization: Bearer <jwt_token>
```

## JWT Authentication Middleware

A JWT authentication middleware is available at `src/middlewares/jwtAuthMiddleware.ts` for protecting routes:

```typescript
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware";

// Use in routes
router.get("/protected", jwtAuthMiddleware, (req, res) => {
  // req.user contains the decoded JWT payload
  res.json({ user: req.user });
});
```
