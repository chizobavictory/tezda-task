import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function generateToken(user_id) {
  const payload = {
    user_id,
  };
  if (!user_id) {
    throw new Error('user_id is required to generate a token');
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
}

export function verifyToken(user_id, token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken.user_id !== user_id) {
      return {
        verified: false,
        error: 'Invalid User',
        message: 'User ID in the token does not match the provided user ID',
      };
    }

    return { verified: true, message: 'Token is valid', decodedToken };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return {
        verified: false,
        error: 'TokenExpired',
        message: error.message,
      };
    } else if (error.name === 'JsonWebTokenError') {
      return {
        verified: false,
        error: 'InvalidToken',
        message: error.message,
      };
    }
  }
}
