import { settings } from "./config.mjs";
import { login } from "./services/login.mjs";
import { confirmEmail } from "./services/confirmEmail.mjs";
import { buildResponse } from "./utils/generalUtils.mjs";

import { forgotPassword } from "./services/forgotPassword.mjs";
import { resetPassword } from "./services/resetPassword.mjs";
import { updateUserProfile } from "./services/updateUserProfile.mjs";
import { getUserProfile } from "./services/getUserProfile.mjs";
import { upadatePassword } from "./services/updatePassword.mjs";
import { register } from "./services/register.mjs";

const healthPath = "/health";
const registerPath = "/register";
const confirmEmailPath = "/register/confirm-email";
const loginPath = "/login";
const forgotPasswordPath = "/forgot-password";
const resetPasswordPath = "/reset-password";
const updateUserProfilePath = "/user/update-profile";
const getUserProfilePath = "/user";
const updatePasswordPath = "/update-password";

export const handler = async (event) => {
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;

    case event.httpMethod === "POST" && event.path === registerPath:
      response = await register(event, settings);
      break;

    case event.httpMethod === "POST" && event.path === confirmEmailPath:
      response = await confirmEmail(event, settings);
      break;

    case event.httpMethod === "POST" && event.path === loginPath:
      response = await login(event, settings);
      break;

    case event.httpMethod === "POST" && event.path === forgotPasswordPath:
      response = await forgotPassword(event, settings);
      break;

    case event.httpMethod === "POST" && event.path === resetPasswordPath:
      response = await resetPassword(event, settings);
      break;

    case event.httpMethod === "PATCH" && event.path === updateUserProfilePath:
      response = await updateUserProfile(event, settings);
      break;

    case event.httpMethod === "GET" && event.path === getUserProfilePath:
      response = await getUserProfile(event, settings);
      break;

    case event.httpMethod === "PATCH" && event.path === updatePasswordPath:
      response = await upadatePassword(event, settings);
      break;

    default:
      response = buildResponse(404, "Not Found");
  }

  return response;
};
