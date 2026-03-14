import MoveHistory from '../models/MoveHistory.js';

export const getMoveHistory = async (req, res) => {
  const moves = await MoveHistory.find({}).sort({ createdAt: -1 }).populate('product');
  res.json(moves);
};
