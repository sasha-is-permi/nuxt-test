import axios from "axios";

// (на данном тестовом сервере ничего  создать нельзя-  он только для чтения
//  Но post-запрос идет как положено.

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // https://test.luna.wigm.ru/api/
});

// Получить список пользователей
export const getUsersRequest = () => api.get("/users");

// Получить пользователя по ID
export const getUserByIdRequest = (id: string) => api.get(`/users/${id}`);

// Создать нового пользователя
export const createUserRequest = (data: {username:string, email:string, password: string})=> api.post("/users", data);

// Обновить данные пользователя
export const updateUserRequest = (id: string, data:  {username:string, email:string}) =>
  api.put(`/users/${id}`, data);

// Удалить пользователя
export const deleteUserRequest = (id: string) => api.delete(`/users/${id}`);
