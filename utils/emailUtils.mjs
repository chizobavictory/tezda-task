import axios from 'axios';

const mailingAPI =
  'https://r150n7ncna.execute-api.us-east-1.amazonaws.com/prod/mailing';

export async function _generateEmailMessage(subject, to_email, email_template) {
  const mailingData = {
    config: {
      fromEmailAddress: `TEZDA@schull.io`,
      toEmailAddress: to_email,
    },
    body: {
      subject: subject,
      message: email_template,
    },
  };

  return mailingData;
}

export async function emailClient(mailingData) {
  try {
    const res = await axios.post(mailingAPI, mailingData);
    return { status: true, message: res.data };
  } catch (error) {
    return { status: false, message: error };
  }
}
