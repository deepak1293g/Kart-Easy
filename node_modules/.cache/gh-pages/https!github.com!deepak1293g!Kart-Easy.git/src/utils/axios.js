import axios from "axios";
import Summary, { baseUrl } from "@/common/summaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest.retry) {
      orginalRequest.retry = true;

      const refreshToken = localStorage.getItem("refresh Token");

      if (refreshToken) {
        const newAccesstoken = await refreshAccessToken(refreshToken);

        if (newAccesstoken) {
          orginalRequest.headers.Authorization = `Bearer ${newAccesstoken}`;
          return Axios(orginalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await Axios({
      ...Summary.refresh_Token,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accessToken = res.data.data.accessToken;
    localStorage.setItem("access Token", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
