// /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import { Request, Response, NextFunction } from 'express';
// import { HttpStatus } from '@/utils/exceptions';
// import { FamilyService } from '../../logic/services/family.service';
// import { TFamilyFilter } from '../../data/interfaces/family.interface';

// const familyService = new FamilyService();

// export async function create(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { name, label } = req.body;
//     const data = await familyService.create(req.user?._id!, name, label);

//     res.status(HttpStatus.CREATED).json({
//       message: 'family created',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function findMany(req: Request, res: Response, next: NextFunction) {
//   try {
//     const filter: TFamilyFilter = req.query;
//     const data = await familyService.findMany(filter);

//     res.status(HttpStatus.OK).json({
//       message: 'families retrieved',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function familyOwner(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = await familyService.familiesOfOwner(req.user?._id!);

//     res.status(HttpStatus.OK).json({
//       message: 'all families retrieved',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function familyOverview(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = await familyService.familyOverview(req.user?._id!);

//     res.status(HttpStatus.OK).json({
//       message: 'overview generated',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function subscriptions(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = await familyService.getAllSubscriptions(req.user?._id!);

//     res.status(HttpStatus.OK).json({
//       message: 'all subscriptions retrieved',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function findOne(req: Request, res: Response, next: NextFunction) {
//   try {
//     const _id = req.params.familyId;
//     const _filter: TFamilyFilter = req.query;
//     const filter = { ..._filter, _id };
//     const data = await familyService.findOne(filter);

//     res.status(HttpStatus.OK).json({
//       message: 'family found',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function joinFamily(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = await familyService.addSubscriber(req.params.familyId, req.user?._id!, 'join');

//     res.status(HttpStatus.OK).json({
//       message: 'you have been added to the family successfully',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function inviteSubscriber(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { familyId, subscriberId } = req.params;
//     const data = await familyService.addSubscriber(familyId, subscriberId, 'invite');

//     res.status(HttpStatus.OK).json({
//       message: 'subscriber added, an invitation link has been sent',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export async function updateSubscriber() {}

// export async function removeSubscriber(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = await familyService.leaveFamily(req.params.familyId, req.user?._id!);

//     res.status(HttpStatus.OK).json({
//       message: 'you have left the family successfully',
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
