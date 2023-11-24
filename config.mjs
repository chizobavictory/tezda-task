import dotenv from 'dotenv';
dotenv.config();

export const settings = {
  REGION: process.env.REGION,
  USERS_DB: process.env.USERS_DB,
};
