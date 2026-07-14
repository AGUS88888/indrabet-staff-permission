import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, comparePassword } from '../utils/password.js';

const prisma = new PrismaClient();

// Register
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.validatedBody;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar',
        timestamp: new Date().toISOString(),
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate token
    const token = generateToken(user.id, user.email);

    // Log audit
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'REGISTER',
        entityType: 'User',
        entityId: user.id,
        newValue: { email: user.email, name: user.name },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Register berhasil',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Register gagal',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.validatedBody;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah',
        timestamp: new Date().toISOString(),
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah',
        timestamp: new Date().toISOString(),
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'User tidak aktif',
        timestamp: new Date().toISOString(),
      });
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    // Log audit
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'LOGIN',
        entityType: 'User',
        entityId: user.id,
      },
    });

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login gagal',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
        timestamp: new Date().toISOString(),
      });
    }

    res.json({
      success: true,
      message: 'Get user berhasil',
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Get user gagal',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    // Log audit
    await prisma.auditLog.create({
      data: {
        actorId: req.user.userId,
        action: 'LOGOUT',
        entityType: 'User',
        entityId: req.user.userId,
      },
    });

    res.json({
      success: true,
      message: 'Logout berhasil',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout gagal',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
