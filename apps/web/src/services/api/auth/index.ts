import { BASE_URL } from "../../config";

export const register = async (body: { fullName: string, email: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resData = response.json();
    return resData;
  } catch (error) {
    return error;
  }
};

export const login = async (body: { email: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resData = response.json();
    return resData;
  } catch (error) {
    return error;
  }
};