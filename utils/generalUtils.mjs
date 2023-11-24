import { v4 as uuidv4 } from 'uuid';

export function buildResponse(statusCode, body) {
  console.log(statusCode, body);
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, DELETE, PUT, GET, HEAD',
      'Access-Control-Max-Age': 2592000,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(body),
  };
}

export function _sortByDate(jsonArray, dateKey) {
  return jsonArray.sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return dateA - dateB;
  });
}

export function _generatePassword(hospital_name) {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = hospital_name[2].toUpperCase();

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password.toUpperCase();
}

export function _generateUserId() {
  const randomNumber = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );
  const user = `PUBLIC-USER-${randomNumber}`;
  return user;
}

export function _buildSearchTerm(
  first_name,
  last_name,
  email,
  facility_name,
  facility_id
) {
  const search_term = `${first_name}-${last_name}-${email}-${facility_name}-${facility_id}`;
  return search_term;
}

export function _getDateTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
}

export function _getShortDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

export function _generateFacilityId(location) {
  const randomNumber = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );
  const facility_id = `HOSPITAL-${randomNumber}-${location}`;
  return facility_id.toUpperCase();
}

export function _generateUid() {
  const unique_id = uuidv4();
  return unique_id;
}

export function _calcBalance(old_donations, new_donation, total_donation) {
  const old_don = Number(old_donations);
  const new_don = Number(new_donation);
  const total = Number(total_donation);
  let donation_status = 'INPROGRESS';
  let donation_completed = false;

  console.log(old_donations, new_donation, total_donation);

  const donation_sum = old_don + new_don;

  const remainder = total - donation_sum;

  if (donation_sum >= total) {
    donation_completed = true;
    donation_status = 'COMPLETED';
  }

  const obj = { donation_sum, remainder, donation_completed, donation_status };

  console.log(obj);
  return obj;
}
