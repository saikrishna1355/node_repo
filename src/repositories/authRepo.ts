import { User } from '../models/User';

export const findByUsername = async (user_name: string) => {
  return await User.findOne({ where: { user_name } });
};

