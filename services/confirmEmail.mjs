import { verifyToken } from "../utils/authUtils.mjs";
import { buildResponse } from "../utils/generalUtils.mjs";
import { updateDBRecord } from "../utils/databaseUtils.mjs";

export const confirmEmail = async (event, settings) => {
  try {
    // Parse the event body if it's a JSON string
    // let requestBody = event.body;
    let requestBody = event.body;
    if (typeof requestBody === "string") {
      requestBody = JSON.parse(requestBody);
    }
    
    const { user_id, token } = requestBody;

    if (!user_id || user_id.trim() === "" || !token || token.trim() === "") {
      return buildResponse(400, {
        message: "both user_id and token are required",
      });
    }

    const verification = verifyToken(user_id, token);

    if (!verification.verified) {
      return buildResponse(400, {
        message: verification.message,
      });
    }

    const updateResponse = await updateDBRecord(settings.USERS_DB, "user_id", user_id, "", null, { confirmed_email: true });

    if (updateResponse.status) {
      return buildResponse(200, {
        message: "Email confirmation successful",
      });
    }
  } catch (error) {
    return buildResponse(500, {
      status: false,
      message: error,
    });
  }
};
