<script setup lang="ts">
const { t } = useI18n()


</script>

<template>
    <section class="bg-[#0f1117] px-4 md:px-6 py-8 md:py-12">
        <div class="max-w-[1280px] mx-auto">
            <div
                class="relative rounded-2xl overflow-hidden bg-[#131929] flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-10 md:py-14">

                <!-- Background SVG -->
                <img src="/images/banner-bg.svg" alt="" aria-hidden="true"
                    class="absolute right-0 top-0 h-full w-full md:w-1/2 pointer-events-none select-none opacity-50 md:opacity-100" />

                <!-- Left: Text -->
                <div>
                    <img src="/images/banner-bg.svg" alt="" aria-hidden="true"
                        class="absolute left-0 top-0 h-full w-full md:w-1/2 pointer-events-none select-none opacity-50 md:opacity-100" />

                    <h1
                        class="relative z-10 font-onest text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight text-center md:text-left">
                        {{ t('home.banner.title1') }}<br />
                        {{ t('home.banner.title2') }}
                    </h1>
                </div>


                <!-- Right: Form -->
                <div class="relative z-10 w-full md:w-[300px] flex-shrink-0">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">

                        <!-- Статистика -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex flex-col">
                                <span class="text-2xl font-bold text-emerald-400">15+</span>
                                <span class="text-white/60 text-xs mt-1">{{ t('home.stats.banks') }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-2xl font-bold text-emerald-400">50+</span>
                                <span class="text-white/60 text-xs mt-1">{{ t('home.stats.programs') }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-2xl font-bold text-emerald-400">2%</span>
                                <span class="text-white/60 text-xs mt-1">{{ t('home.stats.rate') }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-2xl font-bold text-emerald-400">1 мин</span>
                                <span class="text-white/60 text-xs mt-1">{{ t('home.stats.time') }}</span>
                            </div>
                        </div>

                        <!-- Разделитель -->
                        <div class="border-t border-white/10 mt-4 pt-4">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span class="text-white/60 text-xs">{{ t('home.consultant') }}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
