import { DeleteTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { settings } from "./config.mjs";

const client = new DynamoDBClient({ region: settings.REGION});
console.log(settings.REGION)

async function DELETETABLE(TABLE) {
  const command = new DeleteTableCommand({
    TableName: TABLE,
  });

  const response = await client.send(command);
  console.log(response);
}


DELETETABLE("BIKO-HOSPITALS-DB-STAGING")