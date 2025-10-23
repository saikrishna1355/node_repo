import addEmailJob from '../jobs/addEmailJob';
import { findByUsername } from '../repositories/authRepo';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

interface JwtPayload {
  id: number;
  user_name: string;
}

export const login = async (req: Request, res: Response) => {
  const { user_name, password } = req.body as {
    user_name: string;
    password: string;
  };

  const user = await findByUsername(user_name);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password as unknown as string);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id as unknown as number, user_name: user.user_name as unknown as string } as JwtPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  await addEmailJob({
    to: 'test@example.com',
    subject: 'Welcome',
    body: 'Thanks for signing up!',
  });
  Log.info(`📧 Sending email to:`);
  res.json({ token });
};

export const logout = async (_req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};

