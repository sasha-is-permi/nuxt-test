

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Список пользователей</h1>
    <div v-if="isLoading">Загрузка...</div>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2">ID</th>
          <th class="border border-gray-300 px-4 py-2">Имя</th>
          <th class="border border-gray-300 px-4 py-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.username }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <NuxtLink
              :to="`/user/${user.id}/info`"
              class="text-blue-500 underline mr-2"
              >Инфо</NuxtLink
            >
            <NuxtLink
              :to="`/user/${user.id}/edit`"
              class="text-green-500 underline mr-2"
              >Редактировать</NuxtLink
            >
            <button @click="removeUser(user.id)" class="text-red-500 underline">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <NuxtLink
      to="/create"
      class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >Добавить пользователя</NuxtLink
    >
  </div>
</template>


<script setup>

import { urlPage } from "~/composable/urlPage";

const url = await urlPage();

useSeoMeta({
  title: `Тестовое приложение по Nuxt`,
  ogTitle: `Тестовое приложение по Nuxt`,
  description: `Тестовое приложение по Nuxt.`,
  ogDescription: `Тестовое приложение по Nuxt`,
  keywords: ` `,
  ogUrl: `${url}`,
});

import { ref, onMounted } from "vue";
import { getUsers, deleteUser } from "~/utils/api";

const users = ref([]);
const isLoading = ref(false);

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const response = await getUsers();
    users.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const removeUser = async (id) => {
  if (confirm("Вы действительно хотите удалить этого пользователя?")) {
    try {
      await deleteUser(id);
      users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(fetchUsers);
</script>

