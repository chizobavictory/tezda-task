import { buildResponse } from './generalUtils.mjs';
// Check the userType and switch the DB accordingly
export const getTargetDB = (userType, settings) => {
  let targetDB;
  if (userType === 'user') {
    targetDB = settings.USERS_DB;
  } else if (userType === 'biko_admin') {
    targetDB = settings.BIKO_ADMINS_DB;
  } else if (userType === 'hospital_admin') {
    targetDB = settings.HOSPITAL_ADMINS_DB;
  } else {
    // Handle the case for other userTypes
    return buildResponse(400, {
      message:
        "Invalid userType. userType should be 'user', 'biko_admin', or 'hospital_admin' ",
    });
  }
  return targetDB;
};
