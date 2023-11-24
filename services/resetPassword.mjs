import bcrypt from "bcryptjs";
import { buildResponse } from "../utils/generalUtils.mjs";
import { _checkUserList } from "../utils/databaseUtils.mjs";
import { updateDBRecord } from "../utils/databaseUtils.mjs";
import { verifyToken } from "../utils/authUtils.mjs";

export const resetPassword = async (event, settings) => {
  try {
    // Parse the event body if it's a JSON string
    // let requestBody = event.body;
    let requestBody = event.body;
    if (typeof requestBody === "string") {
      requestBody = JSON.parse(requestBody);
    }

    const { token, user_id, new_password } = requestBody;

    if (!new_password || new_password.trim() === "") {
      return buildResponse(400, { message: "password is required" });
    }

    if (!user_id || user_id.trim() === "" || !token || token.trim() === "") {
      return buildResponse(400, {
        message: "Both user_id and token are required",
      });
    }

    // verify token
    const verification = verifyToken(user_id, token);

    if (!verification.verified) {
      return buildResponse(400, {
        message: verification.message,
      });
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

    // reset user password
    const updateResponse = await updateDBRecord(
      targetDB,
      "user_id",
      user_id,
      "",
      null,
      { password: bcrypt.hashSync(new_password.trim(), 10) }
    );

    if (updateResponse.status) {
      return buildResponse(200, {
        message: "Password reset successful",
      });
    }
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
};
