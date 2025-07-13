import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const api = {
  get: async (url, headers) => {
    return apiCalls("GET", url, undefined, headers);
  },
  post: async (url, data, headers) => {
    return apiCalls("POST", url, data, headers);
  },
  put: async (url, data, headers) => {
    return apiCalls("PUT", url, data, headers);
  },
  delete: async (url, headers) => {
    return apiCalls("DELETE", url, undefined, headers);
  },
};

async function apiCalls(method, url, data, headers = {}) {
  try {
    const res = await axios({
      headers: {
        Authorization: localStorage.token && `Bearer ${localStorage.token}`,
        ...headers,
      },
      method,
      url,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
}

export default api;
