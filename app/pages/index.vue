<script setup lang="ts">
import Banner from '../components/home/Banner.vue';
import MainGrid from '../components/home/MainGrid.vue';

watchEffect(() => {
    // pages/index.vue
    useSeoMeta({
        title: 'Ai-Ipoteka — Умный подбор ипотеки в Казахстане',
        description: 'Подберите лучшую ипотеку за 1 минуту. 15+ банков, 50+ программ, ИИ-консультант.',
        ogTitle: 'Ai-Ipoteka — Умный подбор ипотеки',
        ogImage: 'https://ai-help.asia/images/og-logo.png',
        ogDescription: 'Подберите лучшую ипотеку за 1 минуту. 15+ банков, 50+ программ.',
    })
})
</script>

<template>
    <Banner />
    <MainGrid />
</template>
