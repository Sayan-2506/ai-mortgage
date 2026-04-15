<!-- components/AppLoader.vue -->
<template>
    <div class="fixed inset-0 bg-[#0f1117] flex flex-col items-center justify-center z-50">

        <!-- Анимированный дом -->
        <div class="relative w-24 h-24 mb-8">
            <!-- Крыша -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0
        border-l-[48px] border-l-transparent
        border-r-[48px] border-r-transparent
        border-b-[40px] border-b-emerald-400
        animate-bounce" />
            <!-- Стены -->
            <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-white/10 border border-white/20 rounded-sm" />
            <!-- Дверь -->
            <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-emerald-400/30 border border-emerald-400/50 rounded-t-full" />
        </div>

        <!-- Пульсирующие точки -->
        <div class="flex gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0ms]" />
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:150ms]" />
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:300ms]" />
        </div>

        <p class="text-white/40 text-sm mt-4 tracking-widest">Загрузка...</p>
    </div>
</template>