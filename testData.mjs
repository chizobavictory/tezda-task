export const user_reg_data = {
  body: {
    first_name: "chizoba",
    last_name: "victory",
    email: "victory@mailinator.com",
    password: "abc12345",
    web_domain: "www.tezda.com",
  },
};

export const confirm_email = {
  body: {
    user_id: "victory@mailinator.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmljdG9yeUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTcwMDgzNTUxNywiZXhwIjoxNzAwOTIxOTE3fQ.JnuB-Sa7vxltXsuxhFlnZy4Ue1MAu3Xt4iA-OMj6r6Y",
  },
};

export const login_data = {
  body: {
    email: "victory@mailinator.com",
    password: "abc12345",
  },
};

export const forgot_password_data = {
  body: {
    email: "victory@mailinator.com",
    web_domain: "www.tezda.com",
  },
};

export const reset_password_data = {
  body: {
    user_id: "victory@mailinator.com",
    new_password: "abc12345",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmljdG9yeUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTcwMDgzNTUxNywiZXhwIjoxNzAwOTIxOTE3fQ.JnuB-Sa7vxltXsuxhFlnZy4Ue1MAu3Xt4iA-OMj6r6Y",
  },
};

export const update_user_profile_data = {
  body: {
    user_id: "silenikhena@schulltech.com",
    first_name: "Sampson",
    last_name: "ilenikhena",
    user_image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
  },
};

export const get_user_profile_data = {
  queryStringParameters: {
    user_id: "victory@mailinator.com",
  },
};

export const update_password_data = {
  body: {
    user_id: "silenikhena@schulltech.com",
    old_password: "qwerty@123",
    new_password: "qwerty@123",
  },
};

