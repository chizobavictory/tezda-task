import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  DeleteCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { settings } from "../config.mjs";

const client = new DynamoDBClient({ region: settings.REGION });
const DYNAMODB = DynamoDBDocumentClient.from(client);

export async function saveToDynamo(data, tableName) {
  const params = {
    TableName: tableName,
    Item: data,
  };

  const command = new PutCommand(params);

  try {
    await DYNAMODB.send(command);
    return {
      status: true,
      message: "Record Saved Successfully",
    };
  } catch (error) {
    console.error("There was an error saving the record: ", error);
    return {
      status: false,
      message: `Error: Unable to save the record to DynamoDB - ${error}`,
    };
  }
}

export async function _checkUserList(user_id, dbName) {
  const params = {
    TableName: dbName,
    KeyConditionExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
      ":user_id": user_id,
    },
  };

  const checkUserOperation = await queryDynamoRecord(params);
  if (checkUserOperation.status === false) {
    return {
      status: false,
      message: checkUserOperation.message,
    };
  }

  if (checkUserOperation.status === true) {
    return {
      status: true,
      message: checkUserOperation.message,
      data: checkUserOperation.data,
    };
  }
}

export async function _checkFacility(facility_id, dbName) {
  const params = {
    TableName: dbName,
    KeyConditionExpression: "#facility_id = :facility_id",
    ExpressionAttributeNames: {
      "#facility_id": "facility_id",
    },
    ExpressionAttributeValues: {
      ":facility_id": facility_id,
    },
  };

  const checkUserOperation = await queryDynamoRecord(params);
  if (checkUserOperation.status === false) {
    return {
      status: false,
      message: checkUserOperation.message,
    };
  }

  if (checkUserOperation.status === true) {
    return {
      status: true,
      message: checkUserOperation.message,
      data: checkUserOperation.data,
    };
  }
}
export async function _getDonationCase(facility_id, case_id, dbName) {
  const params = {
    TableName: dbName,
    KeyConditionExpression:
      "#facility_id = :facility_id AND #case_id = :case_id",
    ExpressionAttributeNames: {
      "#facility_id": "facility_id",
      "#case_id": "case_id",
    },
    ExpressionAttributeValues: {
      ":facility_id": facility_id,
      ":case_id": case_id,
    },
  };

  const db_operation = await queryDynamoRecord(params);
  if (db_operation.status === false) {
    return {
      status: false,
      message: db_operation.message,
    };
  }

  if (db_operation.status === true) {
    return {
      status: true,
      message: db_operation.message,
      data: db_operation.data,
    };
  }
}

export async function _getDonationRecord(case_id, donation_id, dbName) {
  const params = {
    TableName: dbName,
    KeyConditionExpression:
      "#case_id = :case_id AND #donation_id = :donation_id",
    ExpressionAttributeNames: {
      "#case_id": "case_id",
      "#donation_id": "donation_id",
    },
    ExpressionAttributeValues: {
      ":case_id": case_id,
      ":donation_id": donation_id,
    },
  };

  const db_operation = await queryDynamoRecord(params);
  if (db_operation.status === false) {
    return {
      status: false,
      message: db_operation.message,
    };
  }

  if (db_operation.status === true) {
    return {
      status: true,
      message: db_operation.message,
      data: db_operation.data,
    };
  }
}

export async function queryDynamoRecord(queryParams) {
  const command = new QueryCommand(queryParams);

  const dynamoData = await DYNAMODB.send(command);
  if (dynamoData.Items.length <= 0) {
    return {
      status: false,
      message: "No records found for the query",
      data: false,
    };
  } else {
    return {
      status: true,
      message: "Records found",
      data: dynamoData.Items,
    };
  }
}

export async function updateDBRecord(
  tableName,
  pk,
  pk_value,
  sk,
  sk_value,
  patches
) {
  const updateExpressionParts = [];
  const expressionAttributeValues = {};

  // Construct the update expression and attribute values
  for (const key in patches) {
    if (patches.hasOwnProperty(key)) {
      const placeholder = `:${key}`;
      updateExpressionParts.push(`${key} = ${placeholder}`);
      expressionAttributeValues[placeholder] = patches[key];
    }
  }

  const updateExpression = `SET ${updateExpressionParts.join(", ")}`;

  const keySchema = {};

  keySchema[pk] = pk_value;

  if (sk !== "") {
    keySchema[sk] = sk_value;
  }

  // Define the update parameters
  const params = {
    TableName: tableName,
    Key: keySchema,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW", // Change as needed
  };

  try {
    const command = new UpdateCommand(params);
    const result = await DYNAMODB.send(command);
    return { status: true, message: result.Attributes };
  } catch (error) {
    return {
      status: false,
      message: `Error updating the attributes - ${error}`,
    };
  }
}

export async function deleteFromDB(pk, pk_value, sk, sk_value, table) {
  const keySchema = {};

  keySchema[pk] = pk_value;

  if (sk !== "") {
    keySchema[sk] = sk_value;
  }

  const params = {
    TableName: table,
    Key: keySchema,
  };

  try {
    const command = new DeleteCommand(params);
    const response = await DYNAMODB.send(command);

    if (response) {
      return { status: true, message: "delete operation successful" };
    } else {
      return { status: false, message: "delete operation failed" };
    }
  } catch (error) {
    return { status: false, message: error };
  }
}

export async function _getById(pk, pk_value, sk, sk_value, dbName) {
  const KeyConditionExpression = `#${pk} = :${pk}`;
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  ExpressionAttributeNames[`#${pk}`] = pk;
  ExpressionAttributeValues[`:${pk}`] = pk_value;
  if (sk && sk_value) {
    KeyConditionExpression = `#${pk} = :${pk} AND #${sk} = :${sk}`;
    ExpressionAttributeNames[`#${sk}`] = sk;
    ExpressionAttributeValues[`:${sk}`] = sk_value;
  }

  const params = {
    TableName: dbName,
    KeyConditionExpression: KeyConditionExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
  };

  const db_operation = await queryDynamoRecord(params);
  if (db_operation.status === false) {
    return {
      status: false,
      message: db_operation.message,
    };
  }

  if (db_operation.status === true) {
    return {
      status: true,
      message: db_operation.message,
      data: db_operation.data[0],
    };
  }
}

export async function searchDynamo(params) {
  try {
    const data = await new Promise((resolve) => {
      DYNAMODB.query(params, (err, data) => {
        if (err) {
          return {
            status: false,
            message: `There was an error fetching the data: ${err}`,
          };
        } else {
          resolve(data);
        }
      });
    });

    const items = data.Items || [];
    return { status: true, message: "DynamoDB Search complete", data: items };
  } catch (error) {
    // You can customize the error message as needed
    return {
      status: false,
      message: "Error fetching data from DynamoDB",
      error,
    };
  }
}
