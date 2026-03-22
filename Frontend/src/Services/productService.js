//product service
import { request } from "./api";

// GET /api/products/ - get all products
export const getAllProducts = () =>
  request("/products/");

// GET /api/products/:id - get single product
export const getProductById = (id) =>
  request(`/products/${id}`);

// POST /api/products/ - create a product
export const createProduct = (productData) =>
  request("/products/", {
    method: "POST",
    body: JSON.stringify(productData),
  });

// PUT /api/products/:id - update a product
export const updateProduct = (id, updates) =>
  request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

// DELETE /api/products/ - delete a product
export const deleteProduct = () =>
  request("/products/", {
    method: "DELETE",
  });

export const getAllCategories = () => request("/products/categories");

export const getProductsByCategory = (category) => request(`/products/category/${category}`);