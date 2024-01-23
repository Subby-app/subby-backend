import mongoose from 'mongoose';

export const mongooseConnect = () => {
  const { MONGODB_URI } = process.env;
  mongoose
    .connect(MONGODB_URI!)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => {
      console.log('failed to connect to mongodb', err.message);
      handleReconnection();
    });
};

const handleReconnection = () => {
  setTimeout(() => {
    console.log('reconnecting to mongodb...');
    mongooseConnect();
  }, 10000);
};
