export const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  }, // "https://600cda2bf979dd001745c3aa.mockapi.io/api/v1",
};
