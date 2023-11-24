import bcrypt from "bcryptjs";
import { buildResponse } from "../utils/generalUtils.mjs";
import { _checkUserList, updateDBRecord } from "../utils/databaseUtils.mjs";

export async function upadatePassword(event, settings) {
  try {
    const requestBody = JSON.parse(event.body);
    // const requestBody = event.body;

    const { user_id, old_password, new_password } = requestBody;

    if (!user_id || user_id.trim() === "") {
      return buildResponse(400, { message: "user_id is required" });
    }

    if (!old_password || old_password.trim() === "") {
      return buildResponse(400, { message: "old_password is required" });
    }

    if (!new_password || new_password.trim() === "") {
      return buildResponse(400, { message: "new_password is required" });
    }

    // validate user exists
    const userExists = await _checkUserList(user_id, settings.USERS_DB);

    if (!userExists.status) {
      return buildResponse(400, {
        message: "User not found",
      });
    }
    const user = userExists.data[0];

    // validate old password
    if (!bcrypt.compareSync(old_password, user.password)) {
      return buildResponse(400, {
        message: "Current password is incorrect",
      });
    }

    // validate new_password is not the same as the old_password
    if (bcrypt.compareSync(new_password, user.password)) {
      return buildResponse(400, {
        message: "new_password cannot be the same as the old_password",
      });
    }

    // update password
    const updateResponse = await updateDBRecord(settings.USERS_DB, "user_id", user_id, "", null, {
      password: bcrypt.hashSync(new_password.trim(), 10),
    });
    if (updateResponse.status) {
      return buildResponse(200, {
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
}
