import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

// Cache across hot-reloads in dev and across route handlers
let cached = global._mongooseCached;
if (!cached) {
  cached = global._mongooseCached = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // Add options you need; Mongoose v8 defaults are fine.
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
