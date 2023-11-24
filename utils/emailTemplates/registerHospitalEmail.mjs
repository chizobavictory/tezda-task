export function registerHospitalEmail(adminDetails) {
  return `<p>Your hospital login details are:</p> \n
<p>Email: ${adminDetails.admin_email}</p> \n
<p>Password: ${adminDetails.super_admin_password}</p>`;
}
