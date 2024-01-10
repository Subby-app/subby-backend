import mongoose from 'mongoose';

export function createObjectId() {
  return new mongoose.Types.ObjectId();
}

export function isEqualObjectId(objectID: string, otherId: string) {
  return new mongoose.Types.ObjectId(objectID).equals(otherId);
}
