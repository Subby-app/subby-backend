import mongoose from 'mongoose';

export const mongooseConnect = () => {
  const { MONGODB_URI } = process.env;
  mongoose
    .connect(MONGODB_URI!)
    .then(() => console.log('connected to mongodb')) //!use logger
    .catch((err) => {
      console.log('failed to connect to mongodb');
      handleReconnection();
    });
};

const handleReconnection = () => {
  setTimeout(() => {
    console.log('reconnecting to mongodb...');
    mongooseConnect();
  }, 10000); //!use env var
};
