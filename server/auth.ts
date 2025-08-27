import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { storage } from './storage';

// Secret key for JWT signing (should be in environment variables in production)
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-for-development';

// Extended Request type with userId property
export interface AuthRequest extends Request {
  userId?: number;
}

/**
 * Register a new user
 */
export async function register(req: Request, res: Response) {
  const { username, password, email, name } = req.body;
  
  try {
    // Check if user exists
    const existingUser = await storage.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await storage.createUser({
      username,
      password: hashedPassword,
      email,
      name,
      created_at: new Date().toISOString()
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    // Create token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '7d' });
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

/**
 * Login an existing user
 */
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  
  try {
    // Find user
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    // Create token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '7d' });
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

/**
 * Authentication middleware
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
