import mongoose from 'mongoose';

export default class Id {
  static makeId() {
    return new mongoose.Types.ObjectId();
  }

  static isValidId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
