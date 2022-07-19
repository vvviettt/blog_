import axiosClient from "./axiosClient";

class UserApi {
  login = ({ username, password }) => {
    const url = "/auth/login";
    return axiosClient.post(url, { username, password });
  };

  register = ({ name, username, email, password }) => {
    const url = "/auth/register";
    return axiosClient.post(url, { name, username, email, password });
  };

  refresh_login = ({ token }) => {
    const url = "/auth/refresh_login";
    return axiosClient.post(url, { token });
  };
}

const userApi = new UserApi();
export default userApi;
