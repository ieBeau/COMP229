/**
 * Utility module that provides simple wrappers around the Fetch API for interacting with
 * the application's backend. It exposes two helpers that prepend base paths and ensure
 * credentials (cookies) are included with each request.
 *
 * The module centralizes the base URLs for API and authentication endpoints and returns
 * the raw Fetch Response so callers can inspect status, headers, and parse JSON or other
 * response bodies as needed.
 *
 * @module apiUtils
 *
 * @function fetchApi
 * @async
 * @param {string} endpoint - The endpoint path appended to the API base (e.g., "/users").
 * @param {RequestInit} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Response>} A promise that resolves to the Fetch API Response for the full "/api" URL.
 *
 * @function fetchAuth
 * @async
 * @param {string} endpoint - The endpoint path appended to the Auth base (e.g., "/login").
 * @param {RequestInit} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Response>} A promise that resolves to the Fetch API Response for the full "/auth" URL.
 *
 * @example
 * // GET request to /api/users with credentials included
 * const res = await fetchApi('/users');
 * if (res.ok) {
 *   const users = await res.json();
 * }
 *
 * @example
 * // POST to /auth/login with JSON body
 * const res = await fetchAuth('/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ username: 'me', password: 'pw' }),
 * });
 */

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
