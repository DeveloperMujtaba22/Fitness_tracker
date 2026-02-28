import api from './axios';

// user
export const syncUser = async (userData) => {
    const { data } = await api.post('/users/sync', userData);
    return data;
};

// ✅ always return an array regardless of API response shape
export const getAllProducts = async () => {
    const { data } = await api.get('/products');
    // handle { products: [...] }, { data: [...] }, or plain array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const getMyProducts = async () => {
    const { data } = await api.get('/products/my');
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    return [];
};

export const createProduct = async (productData) => {
    const { data } = await api.post('/products', productData);
    return data;
};

export const updateProduct = async ({ id, ...productData }) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};

// comments
export const createComment = async ({ productId, content }) => {
    const { data } = await api.post(`/comments/${productId}`, { content });
    return data;
};

export const deleteComment = async (id) => {
    const { data } = await api.delete(`/comments/${id}`);
    return data;
};