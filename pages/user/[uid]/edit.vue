<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Редактировать пользователя</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="username" class="block font-medium">Логин:</label>
        <input
          v-model="username"
          id="username"
          type="text"
          required
          class="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div>
        <label for="email" class="block font-medium">Почта:</label>
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
        Сохранить изменения
      </button>
    </form>
  </div>
</template>

<script setup>
import { urlPage } from "~/composable/urlPage";

const url = await urlPage();

useSeoMeta({
  title: `Редактирование пользователя в тестовом приложении`,
  ogTitle: `Редактирование пользователя в тестовом приложении`,
  description: `Редактирование пользователя в тестовом приложении`,
  ogDescription: `Редактирование пользователя в тестовом приложении`,
  keywords: ` `,
  ogUrl: `${url}`,
});

import { ref, onMounted } from "vue";
import { getUserById, updateUser } from "~/utils/api";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const username = ref("");
const email = ref("");

onMounted(async () => {
  try {
    const response = await getUserById(route.params.uid);
    username.value = response.data.username;
    email.value = response.data.email;
  } catch (error) {
    console.error(error);
  }
});

const submitForm = async () => {
  try {
    await updateUser(route.params.uid, {
      username: username.value,
      email: email.value,
    });
    alert("Пользователь успешно обновлен!");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>
