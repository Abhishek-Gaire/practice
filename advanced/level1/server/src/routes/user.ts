import express, { Request, Response } from 'express';
import User from '../models/user';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/profile', auth, async (req: Request, res: Response) => {
    const user = await User.findById((req as any).user.id).select('-password');
    res.json(user);
});

router.get('/all', auth, async (req: Request, res: Response) => {
    if ((req as any).user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    const users = await User.find().select('-password');
    res.json(users);
});

export default router;