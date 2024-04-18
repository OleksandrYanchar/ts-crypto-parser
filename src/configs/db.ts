import mongoose from 'mongoose';

const buildMongoUrl = (): string => {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env;
  
    return `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
};

const DB_URI = buildMongoUrl();

const connectDB = async (retries = 5, interval = 5000) => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Database connection failed.', error);
    if (retries > 0) {
      console.log(`Retrying to connect to MongoDB... Attempts left: ${retries}`);
      setTimeout(() => connectDB(retries - 1, interval), interval);
    } else {
      console.error('Exiting now after retries exhausted.');
      process.exit(1);
    }
  }
};

export default connectDB;