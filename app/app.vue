<script setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <Toaster position="top-right" richColors />
      <AiChat />
    </NuxtLayout>
  </div>
</template>
