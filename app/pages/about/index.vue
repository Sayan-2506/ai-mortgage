<!-- pages/about.vue -->

<script setup lang="ts">

const { t } = useI18n()

const steps = [
    {
        title: t('about.how_it_works.steps.step1.title'),
        description: t('about.how_it_works.steps.step1.description')
    },
    {
        title: t('about.how_it_works.steps.step2.title'),
        description: t('about.how_it_works.steps.step2.description')
    },
    {
        title: t('about.how_it_works.steps.step3.title'),
        description: t('about.how_it_works.steps.step3.description')
    },
    {
        title: t('about.how_it_works.steps.step4.title'),
        description: t('about.how_it_works.steps.step4.description')
    }
]

const advantages = [
    {
        icon: 'mdi:shield-check',
        title: t('about.why_us.items.item1.title'),
        description: t('about.why_us.items.item1.description')
    },
    {
        icon: 'mdi:clock-fast',
        title: t('about.why_us.items.item3.title'),
        description: t('about.why_us.items.item3.description')
    },
    {
        icon: 'mdi:update',
        title: t('about.why_us.items.item2.title'),
        description: t('about.why_us.items.item2.description')
    },
    {
        icon: 'mdi:currency-usd-off',
        title: t('about.why_us.items.item4.title'),
        description: t('about.why_us.items.item4.description')
    }
]


watchEffect(() => {
    useSeoMeta({
        title: 'О сервисе — Ai-Ipoteka.kz',
        description: 'Первый в Казахстане сервис подбора ипотеки с искусственным интеллектом'
    })
})
</script>

<template>
    <div class="bg-gray-100 min-h-screen">

        <!-- Hero -->
        <section class="bg-gray-950 py-20 px-4">
            <div class="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12">
                <div class="flex-1">
                    <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                        {{ t('about.title') }} <span class="text-emerald-400">{{ t('about.subtitle') }}</span>
                    </h1>
                    <p class="text-white/60 text-lg leading-relaxed">
                        {{ t('about.desciption') }}
                    </p>
                </div>

                <!-- Миссия -->
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex-shrink-0 max-w-sm">
                    <div class="text-emerald-400 text-4xl mb-3">"</div>
                    <p class="text-white text-lg font-medium leading-relaxed mb-4">
                        {{ t('about.quote') }}
                    </p>
                    <div class="border-t border-white/20 pt-4 flex items-center gap-3">
                        <div class="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                            <Icon name="mdi:robot" size="20" class="text-emerald-400" />
                        </div>
                        <div>
                            <p class="text-white text-sm font-semibold">Ai-Ipoteka.kz</p>
                            <p class="text-white/40 text-xs">{{ t('about.this_is') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Что мы делаем -->
        <section class="py-16 px-4">
            <div class="max-w-[1280px] mx-auto">
                <h2 class="text-2xl font-bold text-slate-900 mb-8">{{ t('about.what_we_do.title') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
                            <Icon name="mdi:robot" size="28" class="text-emerald-400" />
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">{{ t('about.what_we_do.items.item1.title') }}
                        </h3>
                        <p class="text-slate-500 text-sm leading-relaxed">
                            {{ t('about.what_we_do.items.item1.description') }}
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
                            <Icon name="mdi:bank" size="28" class="text-emerald-400" />
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">{{ t('about.what_we_do.items.item2.title') }}
                        </h3>
                        <p class="text-slate-500 text-sm leading-relaxed">
                            {{ t('about.what_we_do.items.item2.description') }}
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
                            <Icon name="mdi:calculator" size="28" class="text-emerald-400" />
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">{{ t('about.what_we_do.items.item3.title') }}
                        </h3>
                        <p class="text-slate-500 text-sm leading-relaxed">
                            {{ t('about.what_we_do.items.item3.description') }}
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- Как это работает -->
        <section class="py-16 px-4 bg-gray-950">
            <div class="max-w-[1280px] mx-auto">
                <h2 class="text-2xl font-bold text-white mb-10">{{ t('about.how_it_works.title') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div v-for="(step, i) in steps" :key="i" class="flex flex-col gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold text-slate-900 text-lg flex-shrink-0">
                            {{ i + 1 }}
                        </div>
                        <h3 class="text-white font-semibold">{{ step.title }}</h3>
                        <p class="text-white/50 text-sm leading-relaxed">{{ step.description }}</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- Почему мы -->
        <section class="py-16 px-4">
            <div class="max-w-[1280px] mx-auto">
                <h2 class="text-2xl font-bold text-slate-900 mb-8">{{ t('about.why_us.title') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div v-for="(item, i) in advantages" :key="i"
                        class="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                        <div
                            class="w-10 h-10 bg-emerald-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon :name="item.icon" size="22" class="text-emerald-400" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-slate-900 mb-1">{{ item.title }}</h3>
                            <p class="text-slate-500 text-sm leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16 px-4 bg-gray-950">
            <div class="max-w-[1280px] mx-auto text-center">
                <h2 class="text-3xl font-bold text-white mb-4">{{ t('about.ready_to_start') }}</h2>
                <p class="text-white/60 mb-8">{{ t('about.ai_found') }}</p>
                <NuxtLink to="/"
                    class="inline-block px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-xl transition-colors">
                    {{ t('about.start_now') }} →
                </NuxtLink>
            </div>
        </section>

    </div>
</template>
