import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { settings } from "./config.mjs";

const client = new DynamoDBClient({ region: settings.REGION });

async function CREATE_SINGLEKEY_TABLE(TABLENAME, PK) {
  const command = new CreateTableCommand({
    TableName: TABLENAME,

    AttributeDefinitions: [
      {
        AttributeName: PK,
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: PK,
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  const response = await client.send(command);
  console.log(response);
}

async function CREATE_DOUBLEKEY_TABLE(TABLENAME, PK, SK) {
  const params = {
    TableName: TABLENAME,
    KeySchema: [
      { AttributeName: PK, KeyType: "HASH" },
      { AttributeName: SK, KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: PK, AttributeType: "S" },
      { AttributeName: SK, AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    const command = new CreateTableCommand(params);
    const response = await client.send(command);
    console.log(response);
  } catch (e) {
    console.log("An error occurred while creating the table", e);
    throw new Error("Failed to create a table");
  }
}

CREATE_SINGLEKEY_TABLE("TEZDA-USERS-DB-PROD", "user_id");
// CREATE_DOUBLEKEY_TABLE("BIKO-DONATION-HISTORY-STAGING", "user_id", "donation_id");
