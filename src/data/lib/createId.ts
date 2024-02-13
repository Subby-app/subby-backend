import mongoose, { Types } from 'mongoose';

export function createObjectId(inputId?: string) {
  return new mongoose.Types.ObjectId(inputId);
}

export function isEqualObjectId(objectID: Types.ObjectId, otherId?: Types.ObjectId) {
  return new mongoose.Types.ObjectId(objectID).equals(otherId);
}
