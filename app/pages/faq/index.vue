<!-- pages/guide.vue -->

<script setup lang="ts">
import { categories, terms } from '~/utils/guide-terms'
const { t } = useI18n()

const activeCategory = ref('all')

const filteredItems = computed(() =>
    activeCategory.value === 'all'
        ? terms
        : terms.filter(i => i.category === activeCategory.value)
)


watchEffect(() => {
    useSeoMeta({
        title: 'Ипотечный словарь — Ai-Ipoteka.kz',
        description: 'Всё что нужно знать перед ипотекой: ГЭСВ, аннуитет, первичный рынок, страхование и другие термины простым языком'
    })
})
</script>

<template>
    <div class="bg-gray-100 min-h-screen overflow-x-hidden">

        <!-- Hero -->
        <section class="bg-gray-950 py-16 px-4 overflow-hidden">
            <div class="max-w-[1280px] mx-auto">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                        <Icon name="mdi:book-open" size="22" class="text-emerald-400" />
                    </div>
                    <span class="text-emerald-400 text-sm font-medium">{{ t('faq.chapter') }}</span>
                </div>
                <h1 class="text-4xl font-bold text-white mb-4">{{ t('faq.title') }}</h1>
                <p class="text-white/60 text-lg max-w-2xl">
                    {{ t('faq.description') }}
                </p>
            </div>
        </section>

        <!-- Навигация по категориям -->
        <section class="bg-white border-b border-gray-200 sticky top-0 z-10 overflow-hidden">
            <div
                class="max-w-[1280px] mx-auto flex gap-2 overflow-x-auto py-3 px-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
                <button v-for="cat in categories" :key="cat.key" @click="activeCategory = cat.key"
                    :class="activeCategory === cat.key ? 'bg-emerald-400 text-slate-900' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'"
                    class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0">
                    {{ t(`faq.tabs_items.${cat.label}`) }}
                </button>
            </div>
        </section>

        <!-- Контент -->
        <section class="py-12 px-4">
            <div class="max-w-[1280px] mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="item in filteredItems" :key="item.key"
                        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">

                        <div class="flex items-start gap-4 mb-4">
                            <div
                                class="w-10 h-10 bg-emerald-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Icon :name="item.icon" size="22" class="text-emerald-400" />
                            </div>
                            <div>
                                <span
                                    class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    {{t(`faq.tabs_items.${categories.find(c => c.key === item.category)?.label}`)}}
                                </span>
                                <h3 class="text-lg font-bold text-slate-900 mt-1">{{ t(`faq.items.${item.key}.title`) }}
                                </h3>
                            </div>
                        </div>

                        <p class="text-slate-600 text-sm leading-relaxed mb-4">{{ t(`faq.items.${item.key}.description`)
                        }}</p>

                        <!-- Пример если есть -->
                        <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p class="text-xs font-semibold text-slate-500 mb-1">📊 {{ t('faq.example') }}</p>
                            <p class="text-sm text-slate-700">{{ t(`faq.items.${item.key}.example`) }}</p>
                        </div>

                        <!-- Совет если есть -->
                        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mt-3">
                            <p class="text-xs font-semibold text-emerald-600 mb-1">💡 {{ t('faq.tip') }}</p>
                            <p class="text-sm text-emerald-800">{{ t(`faq.items.${item.key}.tip`) }}</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16 px-4 bg-gray-950">
            <div class="max-w-[1280px] mx-auto text-center">
                <h2 class="text-3xl font-bold text-white mb-4">{{ t('faq.ready_to_start') }}</h2>
                <p class="text-white/60 mb-8">{{ t('faq.you_know') }}</p>
                <NuxtLink to="/"
                    class="inline-block px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-xl transition-colors">
                    {{ t('faq.start_now') }} →
                </NuxtLink>
            </div>
        </section>

    </div>
</template>
