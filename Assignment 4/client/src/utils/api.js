const API_BASE = "/api";
const AUTH_BASE = "/auth";

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  return res;
};

export const fetchAuth = async (endpoint, options = {}) => {
  const url = `${AUTH_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  return res;
};
