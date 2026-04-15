<!-- components/AppFooter.vue -->
<script setup lang="ts">
import { toast } from 'vue-sonner'

const { t } = useI18n()

const socials = [
    { icon: 'mdi:telegram', href: 'https://t.me', label: 'Telegram' },
]

const banks = [
    { name: 'Halyk Bank', logo: '/banks-img/halyk-bank.svg', url: 'https://halykbank.kz' },
    { name: 'Center Credit', logo: '/banks-img/centrkredit.svg', url: 'https://centrkredit.kz' },
    { name: 'Otbasy Bank', logo: '/banks-img/otbasy-bank.svg', url: 'https://otbasybank.kz' },
    { name: 'Freedom Finance', logo: '/banks-img/freedom-bank.svg', url: 'https://bankffin.kz' },
]

const year = new Date().getFullYear()

const email = ref('')
const loading = ref(false)

async function subscribe() {
    if (!email.value) {
        toast.warning('Введите email', { description: 'Поле не может быть пустым' })
        return
    }

    loading.value = true

    try {
        await $fetch('/api/subscribe', {
            method: 'POST',
            body: { email: email.value }
        })

        toast.success('Успешная подписка!', {
            description: `Мы будем присылать новые программы на ${email.value}`
        })

        email.value = ''
    } catch (e) {
        const errorMessage = (e as any).data?.message || 'Произошла непредвиденная ошибка'

        toast.error('Ошибка подписки', {
            description: errorMessage,
            duration: 4000,
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <footer class="bg-slate-900/95 border-t border-white/5 text-white">
        <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14">

            <!-- Main grid -->
            <div class="flex flex-col sm:flex-row justify-between gap-8 mb-10">

                <!-- Brand -->
                <div class="max-w-sm">
                    <div>
                        <span class="text-emerald-400 text-2xl">🤖</span>
                        <span class="font-bold text-lg tracking-tight">AI-Mortgage.kz</span>
                    </div>
                    <p class="text-white/50 text-sm leading-relaxed mb-6">
                        {{ t('footer.ai_info') }}
                    </p>
                    <p class="text-white/30 text-xs">© {{ year }} AI-Mortgage.kz.<br>{{ t('footer.copyright') }}</p>
                </div>

                <!-- Подписка -->
                <div class="max-w-sm">
                    <div>
                        <h4 class="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
                            {{ t('footer.subscribe') }}
                        </h4>

                        <!-- Форма -->
                        <div class="flex gap-2 mb-5">
                            <input v-model="email" type="email" placeholder="Ваш email" @keyup.enter="subscribe"
                                class="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors" />
                            <button @click="subscribe" :disabled="loading"
                                class="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 text-sm font-semibold rounded-lg transition-colors">
                                <Icon v-if="loading" name="mdi:loading" size="18" class="animate-spin" />
                                <span v-else>→</span>
                            </button>
                        </div>

                        <div v-for="value in socials" :key="value.label"
                            class="flex items-center gap-2 text-sm text-white/40 mb-1">
                            <Icon :name="value.icon" size="18" class="text-[#229ED9]" />
                            <a :href="value.href" target="_blank" rel="noopener"
                                class="hover:text-white/50 transition-colors text-white/70 text-sm font-medium">
                                {{ value.label }}
                            </a>

                        </div>
                    </div>
                </div>

            </div>

            <!-- Divider -->
            <div class="border-t border-white/5 pt-6">
                <!-- Banks -->
                <div class="flex flex-wrap gap-3 mb-6">
                    <div v-for="bank in banks" :key="bank.name"
                        class="h-10 px-4 bg-white/5 border border-white/10 rounded-lg flex items-center">
                        <a :href="bank.url" target="_blank" rel="noopener">
                            <img :src="bank.logo" :alt="bank.name"
                                class="h-5 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                        </a>

                    </div>
                </div>

                <!-- Bottom bar -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p class="text-white/25 text-xs leading-relaxed max-w-lg">
                        <em>{{ t('footer.disclaimer') }}</em>
                        <NuxtLink to="/privacy" class="underline hover:text-white/50 ml-1 transition-colors">{{
                            t('footer.privacy') }}</NuxtLink>.
                    </p>
                    <div class="flex items-center gap-2 text-xs text-white/30 whitespace-nowrap">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Данные обновлены 10 минут назад
                    </div>
                </div>
            </div>

        </div>
    </footer>
</template>