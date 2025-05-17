export const baseUrl = "http://localhost:8080";

const Summary = {
  register: {
    url: "api/user/register",
    method: "POST",
  },
  login: {
    url: "api/user/login",
    method: "POST",
  },
  forgot_Password: {
    url: "api/user/forgot-password",
    method: "PUT",
  },
  verify_Forgot_Password_OTP: {
    url: "api/user/verify-forgot-password-otp",
    method: "PUT",
  },
  reset_Password: {
    url: "api/user/reset-password",
    method: "PUT",
  },
  user_Details: {
    url: "api/user/user-details",
    method: "GET",
  },
};

export default Summary;
