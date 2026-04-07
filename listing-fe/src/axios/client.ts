import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}:${process.env.NEXT_PUBLIC_BACKEND_API_PORT}`;
console.log(BASE_URL);

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const adminClient = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    "x-role": "admin",
  },
});
