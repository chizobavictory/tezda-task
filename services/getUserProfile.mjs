import { buildResponse } from "../utils/generalUtils.mjs";
import { _checkUserList } from "../utils/databaseUtils.mjs";

export async function getUserProfile(event, settings) {
  try {
    const { user_id } = event.queryStringParameters;

    if (!user_id || user_id.trim() === "") {
      return buildResponse(400, { message: "user_id is required" });
    }

    // validate user exists
    const userExists = await _checkUserList(user_id, settings.USERS_DB);
    if (!userExists.status) {
      return buildResponse(400, {
        message: "User not found",
      });
    }
    const user = userExists.data[0];

    // clone the user object and
    const user_data = { ...user };
    // remove the 'password' key
    delete user_data.password;

    return buildResponse(200, user_data);
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
}
