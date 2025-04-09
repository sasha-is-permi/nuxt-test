import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Получить список пользователей
export const getUsers = () => api.get('/users');

// Получить пользователя по ID
export const getUserById = (id:number) => api.get(`/users/${id}`);

// Создать нового пользователя
export const createUser = (data:any) => api.post('/users', data);

// Обновить данные пользователя
export const updateUser = (id:number, data:any) => api.put(`/users/${id}`, data);

// Удалить пользователя
export const deleteUser = (id:number) => api.delete(`/users/${id}`);