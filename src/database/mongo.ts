import mongoose from 'mongoose';

const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTH_DATABASE,
} = process.env as Record<string, string>;

let mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// Credentials only if username is provided
if (DB_USERNAME && DB_PASSWORD) {
  mongoURI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  if (DB_AUTH_DATABASE) {
    mongoURI += `?authSource=${DB_AUTH_DATABASE}`;
  }
}

mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

export {};
