<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Создать пользователя</h1>
    <form class="space-y-4">
      <div>
        <label for="username" class="block font-medium">Логин:</label>
        <input
          v-model.trim="username"
          id="username"
          type="text"
          required
          class="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div>
        <label for="email" class="block font-medium">Почта:</label>
        <input
          v-model.trim="email"
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
      <UiButton  @click.prevent="handleCreateUser">
        Создать 
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { urlPage } from "~/composable/urlPage";
import {validateEmail, validateName, validatePassword} from '~/utils/validate';

const url = await urlPage();

useSeoMeta({
  title: `Создание пользователя в тестовом приложении`,
  ogTitle: `Создание пользователя в тестовом приложении`,
  description: `Создание пользователя в тестовом приложении`,
  ogDescription: `Создание пользователя в тестовом приложении`,
  keywords: ` `,
  ogUrl: `${url}`,
});


import {useUser} from "~/composable/useUser";

const {
       createUser,
    } = useUser()


const username = ref("");
const email = ref("");
const password = ref("");

const handleCreateUser = async () => {

  const isValidName = validateName(unref(username).trim());
  const isValidMail = validateEmail(unref(email).trim());
  const isValidPassword = validatePassword(unref(password).trim());

  let err=""

  if (!isValidName) err+='username должен содержать не менее 1 символа. ';  
  if (!isValidMail) err+='Введите корректный Email. ';
  if (!isValidPassword) err+='Пароль должен содержать не менее 1 символа. ';

  if (err.length > 0) {
     alert(err);
     return;
   }

   const query = {username:username.value, email: email.value, password: password.value }
   const router = useRouter();
   
  const result = await createUser(query)
  if (result) {
    alert("Пользователь успешно создан!");
    router.push("/");
  }
};
</script>
