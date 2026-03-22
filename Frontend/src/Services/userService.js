import { request } from "./api";

export const createUser = async (userData) => {
  const body = {
    Username: userData.username,
    Email: userData.email,
    Password_Hash: userData.password,
  };

  const data = await request("/users/create/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const savedUser = data.user;
  if (savedUser?.Token) localStorage.setItem("token", savedUser.Token);
  if (savedUser?._id) localStorage.setItem("userId", savedUser._id.toString());
  if (userData.username) localStorage.setItem("username", userData.username);

  return data;
};

export const loginUser = async (credentials) => {
  const data = await request("/users/login/", {
    method: "PUT",
    body: JSON.stringify({
      Username: credentials.username,
      Password_Hash: credentials.password,
    }),
  });


  if (data.Token) localStorage.setItem("token", data.Token);
  if (data.userId) localStorage.setItem("userId", data.userId.toString());
  if (credentials.username) localStorage.setItem("username", credentials.username);

  return data;
};
export const logoutUser = async (id) => {

  const data = await request(`/users/logout/${id}`, {
    method: "PUT",
  });

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  return data;
};

export const updateUser = (id, updates) =>
  request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteUser = (id) =>
  request(`/users/delete/${id}`, {
    method: "DELETE",
  });

export const addCartItem = (itemData) =>
  request("/users/", {
    method: "PUT",
    body: JSON.stringify(itemData),
  });

export const removeCartItem = (itemData) =>
  request("/users/", {
    method: "DELETE",
    body: JSON.stringify(itemData),
  });

export const incrementCartItem = (itemData) =>
  request("/users/increm/", {
    method: "PUT",
    body: JSON.stringify(itemData),
  });

export const decrementCartItem = (itemData) =>
  request("/users/decrem/", {
    method: "PUT",
    body: JSON.stringify(itemData),
  });

export const clearCart = (id) =>
  request(`/users/${id}`, {
    method: "DELETE",
  });

export const isLoggedIn = () => !!localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("userId");
export const getUserById = (id) =>request(`/users/${id}`);