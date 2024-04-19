import mongoose from 'mongoose';

export function mongooseConnect() {
  if (mongoose.connection.readyState == 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri: any = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}
