import bcrypt from "bcryptjs";
import { _checkUserList } from "../utils/databaseUtils.mjs";
import { buildResponse } from "../utils/generalUtils.mjs";
import { generateToken } from "../utils/authUtils.mjs";

export const login = async (event, settings) => {
  try {
    // Parse the event body if it's a JSON string
    // let requestBody = event.body;
    let requestBody = event.body;
    if (typeof requestBody === "string") {
      requestBody = JSON.parse(requestBody);
    }

    const { email, password, userType } = requestBody;
    const user_id = email.toLowerCase().trim();

    if (!email || email.trim() === "") {
      return buildResponse(400, { message: "email is required" });
    }

    if (!password || password.trim() === "") {
      return buildResponse(400, { message: "password is required" });
    }

    // determine the target DB
    const targetDB = settings.USERS_DB;

    // check if the user exists
    const userExists = await _checkUserList(user_id, targetDB);

    if (!userExists.status) {
      return buildResponse(401, {
        message: "Invalid email. User does not exist",
      });
    }
    const user = userExists.data[0];

    // validate password
    if (!bcrypt.compareSync(password, user.password)) {
      return buildResponse(401, {
        message: "Incorrect password",
      });
    }

    // check if user confirmed email
    if (userType === "user" && !user.confirmed_email) {
      return buildResponse(403, {
        message: "This email has not yet been confirmed.Please confirm your email to login",
      });
    }

    const token = generateToken(user.user_id);

    // clone the user object
    const user_data = { ...user };
    // remove the 'password' key
    delete user_data.password;

    // build login response
    const LOGIN_RESPONSE = {
      token: token,
      user_data,
    };

    return buildResponse(200, LOGIN_RESPONSE);
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
};
