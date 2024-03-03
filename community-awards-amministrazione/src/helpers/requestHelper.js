import { store } from "../redux/ConfigureStore";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const request = async (config) => {
  let defaultHeaders = {
    "Access-Control-Allow-Origin": "*",
  };

  const { auth, data, url } = config || {};
  const user = store.getState().user;
  const loginToken = user.userDetails?.access?.token
    ? user.userDetails.access.token
    : "";

  if (auth) {
    const token = (await localStorage.getItem("token"))
      ? localStorage.getItem("token")
      : loginToken;

    defaultHeaders = {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  return new Promise((resolve, reject) => {
    fetch(`${baseURL}${url}`, {
      ...config,
      headers: defaultHeaders,
      body: data,
    })
      .then((data) => {
        if (data.status === 401 && !url.includes("login")) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("surname");
          localStorage.removeItem("avatar");
          reject({
            code: data.status,
            message: data.statusText,
          });
        } else if (
          (data.status === 404 || data.status === 204) &&
          url.includes("logout")
        ) {
          resolve(data);
        } else if (config.method === "DELETE" && data.status === 200) {
          resolve(data.text());
        } else if (
          (url.includes("files/") ||
            url.includes("/image") ||
            url.includes("/fallbackimage") ||
            url.includes("/xls")) &&
          data.status === 200
        ) {
          resolve(data.blob());
        } else {
          resolve(data.json());
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default request;
