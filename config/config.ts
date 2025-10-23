import dotenv from 'dotenv';

// Load env per environment like the JS version
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

type Env = 'dev' | 'sit' | 'uat' | 'live';
type Dialect = 'mysql';

interface DbConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  port: string | number | undefined;
  dialect: Dialect;
}

const base: Omit<DbConfig, 'dialect'> & { dialect: Dialect } = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT as unknown as number | string,
  dialect: 'mysql',
};

const config: Record<Env, DbConfig> = {
  dev: { ...base },
  sit: { ...base },
  uat: { ...base },
  live: { ...base },
};

// CommonJS export for sequelize-cli compatibility
export = config;

