import { Schema, model } from 'mongoose';
import { IFamily } from '../interfaces/IFamily';

const FamilySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subscribers: {
      type: [
        {
          subscriber: { type: Schema.Types.ObjectId, ref: 'User' },
          joinedAt: Date,
          joinMethod: String,
          isActive: Boolean,
          revokeAccess: Boolean,
        },
      ],
    },
    label: {
      type: String,
      required: true,
    },
    maxSubscribers: {
      type: Number,
      required: true,
    },
    spotsAvailable: {
      type: Number,
      required: true,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    membershipPrice: {
      type: Number,
      required: true,
    },
    subscribeLinks: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

FamilySchema.post('save', async function (doc, next) {
  await doc.populate('owner subscribers');
  next();
});

FamilySchema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
  this.populate('owner', 'subscribers');
  next();
});

export const Family = model<IFamily>('Family', FamilySchema);
