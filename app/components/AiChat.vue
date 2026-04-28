<!-- components/AiChat.vue -->
<script setup lang="ts">
import { marked } from 'marked'

const renderMarkdown = (text: string) => {
    return marked(text ?? '')
}
const { messages, pending, send } = useAiChat()
const input = ref('')
const isOpen = ref(false)

async function submit() {
    if (!input.value.trim() || pending.value) return
    const msg = input.value
    input.value = ''
    await send(msg)
}
</script>

<template>
    <div class="fixed bottom-6 right-6 z-50">

        <!-- Кнопка открытия -->
        <button @click="isOpen = !isOpen"
            class="w-16 h-16 rounded-full flex bg-sky-300 items-center justify-center shadow-lg transition-colors">
            <img src="/images/robo-logo.svg" alt="ai-chat" class="w-10 h-10 relative" />
            <span class="absolute top-1 right-1 -mt-1 -mr-1 flex size-3"><span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span><span
                    class="relative inline-flex size-3 rounded-full bg-emerald-400"></span></span>
        </button>

        <!-- Чат -->
        <div v-if="isOpen"
            class="absolute bottom-16 right-0 w-80 sm:w-96 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            <!-- Header -->
            <div class="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                <span class="text-xl">🤖</span>
                <div>
                    <p class="text-white text-sm font-semibold">ИИ-консультант</p>
                    <p class="text-white/40 text-xs">Подберу ипотеку за 1 минуту</p>
                </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
                <div v-if="messages.length === 0" class="text-white/40 text-sm text-center py-8">
                    Напишите свой запрос.<br>Например: «Ищу ипотеку до 20 млн на 10 лет»
                </div>

                <div v-for="(msg, i) in messages" :key="`${msg.role}-${i}`" :class="msg.role === 'user'
                    ? 'ml-auto bg-emerald-400 text-slate-900'
                    : 'mr-auto bg-white/10 text-white'"
                    class="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed">
                    <div v-html="renderMarkdown(msg.text)" class="markdown-content" />
                </div>

                <div v-if="pending" class="flex gap-1.5 px-4 py-3 bg-white/10 rounded-2xl w-fit">
                    <span class="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span class="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span class="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
            </div>

            <!-- Input -->
            <div class="p-3 border-t border-white/10 flex gap-2">
                <input v-model="input" @keyup.enter="submit" placeholder="Ваш вопрос..."
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors" />
                <button @click="submit" :disabled="pending"
                    class="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
                    →
                </button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.markdown-content {
    line-height: 1.6;
}

.markdown-content p {
    margin: 4px 0;
}

.markdown-content strong {
    font-weight: 600;
}
</style>