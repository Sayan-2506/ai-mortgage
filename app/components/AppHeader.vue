<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const menuOpen = ref(false)
const langOpen = ref(false)
const { locale, locales, setLocale, t } = useI18n()


const links = computed(() => [
    { to: '/banks', label: t('nav.banks') },
    { to: '/about', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
])

const currentLocale = computed(() =>
    locales.value.find(l => l.code === locale.value)
)

watch(menuOpen, (val) => {
    if (val) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
})

// Закрывать дропдаун при клике вне
const langRef = ref<HTMLElement | null>(null)
onClickOutside(langRef, () => langOpen.value = false)
</script>

<template>
    <header class="sticky top-0 z-50 bg-[#0f1117] border-b border-white/[0.06] font-onest">
        <div class="max-w-[1280px] mx-auto px-6 h-16 flex items-center">

            <!-- Логотип -->
            <NuxtLink to="/">
                <img src="/images/logo.svg" alt="AI-Mortgage.kz" />
            </NuxtLink>

            <!-- Nav — десктоп -->
            <nav class="hidden md:flex items-center gap-1 mx-auto">
                <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
                    class="px-3.5 py-1.5 text-base font-medium text-white/55 rounded-lg transition-colors hover:text-white hover:bg-white/[0.07]"
                    active-class="!text-white !bg-white/[0.07]">
                    {{ link.label }}
                </NuxtLink>
            </nav>

            <!-- Правая часть — десктоп -->
            <div class="hidden md:flex items-center gap-2">

                <!-- Выбор языка -->
                <div ref="langRef" class="relative">
                    <button @click="langOpen = !langOpen"
                        class="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white/40 rounded-lg transition-colors">
                        <span class="text-base">{{ currentLocale?.flag }}</span>
                        <span class="text-white/70 text-sm font-medium">{{ currentLocale?.code.toUpperCase() }}</span>
                        <Icon name="mdi:chevron-down" size="16" class="text-white/40 transition-transform"
                            :class="langOpen ? 'rotate-180' : ''" />
                    </button>

                    <!-- Дропдаун -->
                    <div v-if="langOpen"
                        class="absolute right-0 top-full mt-2 bg-[#1a1d27] border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[140px]">
                        <button v-for="loc in locales" :key="loc.code" @click="setLocale(loc.code); langOpen = false"
                            :class="locale === loc.code ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'"
                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors">
                            <span class="text-base">{{ loc.flag }}</span>
                            <span>{{ loc.name }}</span>
                            <Icon v-if="locale === loc.code" name="mdi:check" size="16"
                                class="text-emerald-400 ml-auto" />
                        </button>
                    </div>
                </div>

                <!-- Telegram -->
                <a href="https://t.me/ai_ipoteka_kz" target="_blank"
                    class="flex items-center gap-2 px-4 py-1.5 border border-white/20 hover:border-white/40 rounded-lg transition-colors">
                    <Icon name="mdi:telegram" size="18" class="text-[#229ED9]" />
                    <span class="text-white/70 text-sm font-medium">{{ t('nav.telegram') }}</span>
                </a>

            </div>

            <!-- Бургер — мобильный -->
            <button class="md:hidden ml-auto flex flex-col gap-[5px] p-1" @click="menuOpen = !menuOpen">
                <span class="block w-[22px] h-0.5 bg-white/70 rounded transition-transform duration-250"
                    :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''" />
                <span class="block w-[22px] h-0.5 bg-white/70 rounded transition-opacity duration-250"
                    :class="menuOpen ? 'opacity-0' : ''" />
                <span class="block w-[22px] h-0.5 bg-white/70 rounded transition-transform duration-250"
                    :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''" />
            </button>
        </div>

        <!-- Mobile menu -->
        <div v-show="menuOpen" class="md:hidden flex flex-col gap-1 px-6 pb-5 pt-3 border-t border-white/[0.06]">
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
                class="px-3.5 py-3 text-[15px] font-medium text-white/65 rounded-[10px] transition-colors hover:text-white hover:bg-white/[0.07]"
                active-class="!text-white !bg-white/[0.07]" @click="menuOpen = false">
                {{ link.label }}
            </NuxtLink>

            <!-- Языки в мобильном меню -->
            <div class="flex gap-2 px-3.5 py-3">
                <button v-for="loc in locales" :key="loc.code" @click="setLocale(loc.code)"
                    :class="locale === loc.code ? 'border-emerald-400 text-white' : 'border-white/20 text-white/50'"
                    class="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm transition-colors">
                    <span>{{ loc.flag }}</span>
                    <span>{{ loc.code.toUpperCase() }}</span>
                </button>
            </div>

            <a href="https://t.me/ai_ipoteka_kz" target="_blank"
                class="flex items-center gap-3 px-4 py-1.5 border border-white/20 hover:border-white/40 rounded-lg transition-colors">
                <Icon name="mdi:telegram" size="18" class="text-[#229ED9]" />
                <span class="text-white/70 text-sm font-medium">Telegram</span>
            </a>
        </div>
    </header>
</template>