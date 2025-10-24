import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  // Don't throw at import-time in production builds; throw when actually used
  // so `next build` doesn't die. We'll validate in connectToDatabase().
  // console.warn('MONGO_URI is not set yet. It must be set at runtime.');
}

let cached = (global as any)._mongooseCached as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any)._mongooseCached = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error('MONGO_URI is not defined (runtime). Set it in docker-compose or env.');
    }
    cached.promise = mongoose.connect(MONGODB_URI, {
      // add your options here if needed
      // serverSelectionTimeoutMS: 5000,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
