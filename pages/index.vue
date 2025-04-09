<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else></div>
    <h1 class="text-2xl font-bold mb-4 text-center">Список пользователей</h1>
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

<script setup lang="ts">

onMounted(async () => {
   await fetchUsers();
});

import {useUserStore} from "~/store/useUserStore";
const {users} = storeToRefs(useUserStore());

import { urlPage } from "~/composable/urlPage";

import { useUser } from "~/composable/useUser";

const { deleteUser, fetchUsers } = useUser();

const url = await urlPage();

useSeoMeta({
  title: `Тестовое приложение по Nuxt`,
  ogTitle: `Тестовое приложение по Nuxt`,
  description: `Тестовое приложение по Nuxt.`,
  ogDescription: `Тестовое приложение по Nuxt`,
  keywords: ` `,
  ogUrl: `${url}`,
});


const isLoading = ref(false);

const removeUser = async (id: string) => {
  if (confirm("Вы действительно хотите удалить этого пользователя?")) {
    await deleteUser(id);
  }
};


</script>
