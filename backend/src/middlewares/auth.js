import { verifyToken } from '../utils/jwt.js';

// Auth middleware untuk protected routes
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan',
        timestamp: new Date().toISOString(),
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa',
        timestamp: new Date().toISOString(),
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      timestamp: new Date().toISOString(),
    });
  }
};

// Optional auth - jika ada token, verify; jika tidak, lanjutkan
export const optionalAuthMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        req.user = decoded;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

// Validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors,
        timestamp: new Date().toISOString(),
      });
    }

    req.validatedBody = value;
    next();
  };
};
