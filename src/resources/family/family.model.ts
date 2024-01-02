import { Schema, model } from 'mongoose';
import { IFamily } from './family.interface';

const FamilySchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  type: {
    type: String,
    required: true,
  },
  maxCount: {
    type: Number,
    required: true,
  },
  membershipPrice: {
    type: Number,
    required: true,
  },
  membersLinks: [{
    type: String,
    required: true,
  }]
}, {
  timestamps: true,
});

FamilySchema.post('save', async function (doc, next) {
  await doc.populate('creator members', 'email username');
  next();
});

FamilySchema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
  this.populate('creator', 'members');
  next();
});

export const FamilyModel = model<IFamily>('Family', FamilySchema);