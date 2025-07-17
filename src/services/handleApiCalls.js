import axios from 'axios';

// נשתמש בפרוקסי של Vite במקום URL בסיסי קבוע
// כך בקשות יעברו לשרת המתאים לפי התצורה בקובץ vite.config.js

const api = {
  get: async (url, headers) => {
    return apiCalls('GET', url, undefined, headers);
  },
  post: async (url, data, headers) => {
    return apiCalls('POST', url, data, headers);
  },
  put: async (url, data, headers) => {
    return apiCalls('PUT', url, data, headers);
  },
  delete: async (url, headers) => {
    return apiCalls('DELETE', url, undefined, headers);
  },
};

async function apiCalls(method, url, data, headers = {}) {
  try {
    const token = localStorage.getItem('token');

    const res = await axios({
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      method,
      url,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);

    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    throw new Error(error.response?.data?.error || String(error));
  }
}

export default api;
