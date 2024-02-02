import mongoose, { Types } from 'mongoose';

export function createObjectId() {
  return new mongoose.Types.ObjectId();
}

export function isEqualObjectId(objectID: Types.ObjectId, otherId?: Types.ObjectId) {
  return new mongoose.Types.ObjectId(objectID).equals(otherId);
}
