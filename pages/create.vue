<script setup>
import { ref } from "vue";
import { createUser } from "~/utils/api";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const submitForm = async () => {
  try {
    await createUser({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    alert("Пользователь успешно создан!");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Создать пользователя</h1>
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
      <div>
        <label for="password" class="block font-medium">Пароль:</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Создать
      </button>
    </form>
  </div>
</template>
