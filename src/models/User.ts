import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/mysql';

export interface UserAttributes {
  id: number;
  email: string;
  user_name: string;
  password: string;
  profile_path?: string | null;
  first_name: string;
  middle_name?: string | null;
  last_name?: string | null;
  phone_number: string;
  is_active: '0' | '1';
  hash_username?: string | null;
  password_attempt_count?: string | null;
  hash_generated_date?: Date | null;
  last_login?: Date;
  created_at?: Date;
  created_by: number;
  updated_at?: Date | null;
  updated_by?: number | null;
  deleted_at?: Date | null;
  deleted_by?: number | null;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'profile_path'
  | 'middle_name'
  | 'last_name'
  | 'hash_username'
  | 'password_attempt_count'
  | 'hash_generated_date'
  | 'last_login'
  | 'created_at'
  | 'updated_at'
  | 'updated_by'
  | 'deleted_at'
  | 'deleted_by'
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public user_name!: string;
  public password!: string;
  public profile_path?: string | null;
  public first_name!: string;
  public middle_name?: string | null;
  public last_name?: string | null;
  public phone_number!: string;
  public is_active!: '0' | '1';
  public hash_username?: string | null;
  public password_attempt_count?: string | null;
  public hash_generated_date?: Date | null;
  public last_login?: Date;
  public created_at?: Date;
  public created_by!: number;
  public updated_at?: Date | null;
  public updated_by?: number | null;
  public deleted_at?: Date | null;
  public deleted_by?: number | null;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    user_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profile_path: { type: DataTypes.STRING, allowNull: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    middle_name: { type: DataTypes.STRING, allowNull: true },
    last_name: { type: DataTypes.STRING, allowNull: true },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.ENUM('0', '1'), defaultValue: '1' },
    hash_username: { type: DataTypes.STRING, allowNull: true },
    password_attempt_count: { type: DataTypes.STRING, allowNull: true },
    hash_generated_date: { type: DataTypes.DATE, allowNull: true },
    last_login: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    deleted_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  }
);

export default User;

