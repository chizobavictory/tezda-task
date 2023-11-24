import { buildResponse } from "../utils/generalUtils.mjs";
import { _checkUserList, _checkFacility } from "../utils/databaseUtils.mjs";
import { generateToken } from "../utils/authUtils.mjs";
import { resetPasswordEmail } from "../utils/emailTemplates/resetPasswordEmail.mjs";
import { _generateEmailMessage, emailClient } from "../utils/emailUtils.mjs";

export const forgotPassword = async (event, settings) => {
  try {
    // Parse the event body if it's a JSON string
    // let requestBody = event.body;
    let requestBody = event.body;
    if (typeof requestBody === "string") {
      requestBody = JSON.parse(requestBody);
    }

    const { email, web_domain } = requestBody;
    const user_id = email.toLowerCase().trim();

    if (!email || email.trim() === "") {
      return buildResponse(400, { message: "email is required" });
    }

    // determine the target DB
    const targetDB = settings.USERS_DB;

    // validate user exists
    const userExists = await _checkUserList(user_id, targetDB);

    if (!userExists.status) {
      return buildResponse(400, {
        message: "No user exist with this email",
      });
    }

    // generate token
    const token = generateToken(user_id);

    // generate email template
    const email_template = await resetPasswordEmail(email, token, web_domain);

    // generate email message
    const message = await _generateEmailMessage(`Reset Password`, email, email_template);

    // send password reset email
    const emailResponse = await emailClient(message);

    if (!emailResponse.status) {
      return buildResponse(500, {
        status: false,
        message: "There was an error sending email" + "-" + emailResponse.message,
      });
    }

    return buildResponse(200, `A link was sent to ${email} to reset your password`);
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
};
