const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


// Core fetch helper - handles all requests and errors in one place
export const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }),
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;

  } catch (error) {
    throw error;
  }
};