import { request } from "./api";

// GET /api/orders/:id - get/print an order by id
export const getOrderById = (id) =>
  request(`/orders/${id}`);

// POST /api/orders/:id - create order from cart
export const createOrderFromCart = (userId) =>
  request(`/orders/${userId}`, {
    method: "POST",
  });

// DELETE /api/orders/:id - delete an order
export const deleteOrder = (userId) =>
  request(`/orders/${userId}`, {
    method: "DELETE",
  });