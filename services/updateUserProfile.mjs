import { _checkUserList, updateDBRecord } from "../utils/databaseUtils.mjs";
import { getDefaultValue } from "../utils/getDefaultValue.mjs";
import { buildResponse } from "../utils/generalUtils.mjs";

export async function updateUserProfile(event, settings) {
  try {
    const requestBody = JSON.parse(event.body);
    // const requestBody = event.body;
    const { user_id, first_name, last_name, user_image } = requestBody;

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

    // update user profile
    const updateResponse = await updateDBRecord(settings.USERS_DB, "user_id", user_id, "", null, {
      first_name: getDefaultValue(first_name, user.first_name),
      last_name: getDefaultValue(last_name, user.last_name),
      user_image: getDefaultValue(user_image, user.user_image),
    });

    if (updateResponse.status) {
      return buildResponse(200, {
        message: "User profile successfully updated",
      });
    }
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: `Error: ${error}`,
    });
  }
}
