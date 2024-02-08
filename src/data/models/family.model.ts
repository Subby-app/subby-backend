import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IFamily } from '../interfaces/IFamily';

const FamilySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      // autopopulate: { select: 'firstName lastName' },
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    maxSubscribers: {
      type: Number,
      // required: true,
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

// FamilySchema.post('save', async function (doc, next) {
//   await doc.populate('owner subscribers');
//   next();
// });

// FamilySchema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
//   this.populate('owner', 'subscribers');
//   next();
// });

FamilySchema.plugin(autopopulate);
export const Family = model<IFamily>('Family', FamilySchema);
