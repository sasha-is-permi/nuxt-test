<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Информация о пользователе</h1>
    <div v-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Логин:</strong> {{ user.username }}</p>
      <p><strong>Почта:</strong> {{ user.email }}</p>
    </div>
    <NuxtLink to="/" class="text-blue-500 underline">Назад к списку</NuxtLink>
  </div>
</template>

<script setup>
import { urlPage } from "~/composable/urlPage";

const url = await urlPage();

useSeoMeta({
  title: `Иноформация о пользователе в тестовом приложении`,
  ogTitle: `Иноформация о пользователе в тестовом приложении`,
  description: `Иноформация о пользователе в тестовом приложении`,
  ogDescription: `Иноформация о пользователе в тестовом приложении`,
  keywords: ` `,
  ogUrl: `${url}`,
});

import { ref, onMounted } from "vue";
import { getUserById } from "~/utils/api";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);

onMounted(async () => {
  try {
    const response = await getUserById(route.params.uid);
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>
