// import { Schema, model } from 'mongoose';
// import autopopulate from 'mongoose-autopopulate';
// import { IFamily } from '../interfaces/IFamily';

// const FamilySchema = new Schema(
//   {
//     applicationId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Apllication',
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     cost: {
//       type: Number,
//       required: true,
//     },
//     AccountSlots: {
//       type: Number,
//       required: true,
//     },
//     Onboarding: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// FamilySchema.plugin(autopopulate);
// export const Plan = model<IPlan>('Plan', FamilySchema);