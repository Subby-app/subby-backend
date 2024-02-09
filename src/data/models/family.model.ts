import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IFamily } from '../interfaces/IFamily';

// when to use Schema<IFamily>
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
    appId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //!ref App
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //!ref Plan
      required: true,
    },
    maxSubscribers: {
      type: Number,
      // required: true,
      default: 6, //! plan.maxSubs
    },
    slotsAvailable: {
      type: Number,
      required: true,
    },
    subscriptionStart: {
      type: Date,
      required: true,
    },
    renewal: {
      type: String,
      required: true,
    },
    onboarding: {
      type: {
        label: {
          type: String,
          required: true,
        },
        url: String,
        email: String,
        password: String,
      },
      required: true,
      _id: false,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
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
