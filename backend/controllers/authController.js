import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = createToken(user);
  res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = createToken(user);
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
