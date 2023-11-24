export async function resetPasswordEmail(email, token, web_domain) {
  const passwordResetLink = `${web_domain}/reset-password?email=${email}&token=${token}`;
  return `<a href="${passwordResetLink}">Reset Password</a> \n
          <p>or copy the URL below into your web browser and press enter.</p> \n
          \n<p>${passwordResetLink}</p>`;
}
