<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Редактировать пользователя</h1>
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
      <UiButton  @click.prevent="handleEditUser">
        Сохранить изменения 
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
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

import {useUser} from "~/composable/useUser";

const {
       getUserById, updateUser,
    } = useUser()



const route = useRoute();
const router = useRouter();

const username = ref("");
const email = ref("");

onMounted(async () => {
  const result = await getUserById(Number(route.params.uid))
  if (result) { 
   // console.log(result)
    username.value = result.username;
    email.value =  result.email;
  }
});

import {validateEmail, validateName} from '~/utils/validate';

const handleEditUser = async () => {

  const isValidName = validateName(unref(username).trim());
  const isValidMail = validateEmail(unref(email).trim());

  let err=""

  if (!isValidName) err+='username должен содержать не менее 1 символа. ';  
  if (!isValidMail) err+='Введите корректный Email. ';

  if (err.length > 0) {
     alert(err);
     return;
   }

  const result = await updateUser(Number(route.params.uid), {
      username: username.value,
      email: email.value,
    })
  if (result) { 
    alert("Пользователь успешно обновлен!");
    router.push("/");
  }

};
</script>
