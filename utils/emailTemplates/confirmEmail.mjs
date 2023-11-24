import dotenv from 'dotenv';
dotenv.config();

export async function confirmEmail(email, token, web_domain) {
  const confirmEmailLink = `${web_domain}/register/confirm-email?email=${email}&token=${token}`;
  return `<a href="${confirmEmailLink}">Verify Email</a> \n
          <p>or copy the URL below into your web browser and press enter.</p> \n
          \n<p>${confirmEmailLink}</p>`;
}
