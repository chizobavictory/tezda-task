import axios from "axios";
import { settings } from "../config.mjs";


const BASE_URL = "https://api.paystack.co";

export async function initializePayment(amount, email) {
  const url = `${BASE_URL}/transaction/initialize`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${settings.PAYSTACK_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      url,
      {
        email,
        amount: amount * 100,
      },
      { headers }
    );

    return {
      status: true,
      message: "successful transaction",
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: "There was an error processing the payment. Error-" + error,
      data: false,
    };
  }
}

export async function verifyPayment(reference) {
  const url = `${BASE_URL}/transaction/verify/${reference}`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${settings.PAYSTACK_KEY}`,
  };

  try {
    const response = await axios.get(url, { headers });

    return {
      status: true,
      message: "transaction verified",
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: "failed to verify transaction",
      data: false,
    };
  }
}

export async function listTransactions() {
  const url = `${BASE_URL}/transaction`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${settings.PAYSTACK_KEY}`,
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data.data[0].customer);
    return response.data;
  } catch (error) {
    throw error;
  }
}
