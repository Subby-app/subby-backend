import { Schema, model } from 'mongoose';
import { IFamily } from './family.interface';

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
    type: {
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
      required: true,
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

export const FamilyModel = model<IFamily>('Family', FamilySchema);
