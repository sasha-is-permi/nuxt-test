<!-- Главная страница -->
<template>
    <div>
        Главная страница
    </div>
</template>
<script setup lang="ts">
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

</script>

