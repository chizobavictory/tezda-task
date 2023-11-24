import bcrypt from "bcryptjs";
import { _getDateTime, buildResponse, _getShortDate } from "../utils/generalUtils.mjs";
import { _checkUserList, saveToDynamo } from "../utils/databaseUtils.mjs";
import { _generateEmailMessage, emailClient } from "../utils/emailUtils.mjs";
import { confirmEmail } from "../utils/emailTemplates/confirmEmail.mjs";
import { generateToken } from "../utils/authUtils.mjs";

export const register = async (event, settings) => {
  try {
    // Parse the event body if it's a JSON string
    // let requestBody = event.body;
    let requestBody = event.body;
    if (typeof requestBody === "string") {
      requestBody = JSON.parse(requestBody);
    }

    const { first_name, last_name, email, password, web_domain } = requestBody;
    const user_id = email.toLowerCase().trim();

    if (!first_name || first_name.trim() === "") {
      return buildResponse(400, { message: "first name is required" });
    }
    if (!last_name || last_name.trim() === "") {
      return buildResponse(400, { message: "last name is required" });
    }
    if (!email || email.trim() === "") {
      return buildResponse(400, { message: "email is required" });
    }
    if (!password || password.trim() === "") {
      return buildResponse(400, { message: "password is required" });
    }

    // validate user exists in DB
    const userExists = await _checkUserList(user_id, settings.USERS_DB);

    if (userExists.status) {
      return buildResponse(400, {
        message: "A user with this email already exists",
      });
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);

    const new_user = {
      user_id,
      confirmed_email: false,
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPW,
      is_admin: false,
      user_image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
      registration_date: _getShortDate(),
      created_at: _getDateTime(),
    };

    const saveUserResponse = await saveToDynamo(new_user, settings.USERS_DB);

    if (!saveUserResponse.status) {
      return buildResponse(503, {
        message: saveUserResponse.message,
      });
    }

    // generate token
    const token = generateToken(user_id);

    // generate email template
    const email_template = await confirmEmail(email, token, web_domain);

    // generate email message
    const message = await _generateEmailMessage(`Welcome to Tezda!`, email, email_template);

    // send confirmation email
    const emailResponse = await emailClient(message);

    if (!emailResponse.status) {
      return buildResponse(500, {
        status: false,
        message: "The user has been registered, but there was a problem sending the email" + "-" + emailResponse.message,
      });
    }

    const API_RESPONSE_DATA = {
      status: true,
      message: `User ${email} registration successful.`,
      email: emailResponse,
    };

    return buildResponse(201, API_RESPONSE_DATA);
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
};
