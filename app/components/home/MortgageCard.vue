<script lang="ts" setup>
//MortgageCard.vue
import type { Mortgage } from '~/types/programs'

const { t } = useI18n()
const config = useRuntimeConfig();

const { mortgage } = defineProps<{
    mortgage: Mortgage
}>()


</script>


<template>
    <div
        class="w-full flex flex-col justify-between p-4 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white shadow-[0_0_40px_rgba(16,185,129,0.15)]">

        <!-- Header -->
        <div class="grid grid-cols-2 items-center gap-3 text-xl font-semibold mb-5">
            <div>
                {{ mortgage.program_name }}
            </div>
            <a class="flex items-center justify-center h-9 w-full" :href="mortgage?.website_link ?? ''">
                <img :src="config.public.directusUrl + '/assets/' + mortgage?.bank?.logo" :alt="mortgage?.bank?.name"
                    class="h-full w-auto object-contain" loading="lazy" />
            </a>

        </div>

        <!-- Content -->
        <div class="flex gap-8 items-center mb-8">

            <!-- Rate -->
            <div>
                <div class="text-sm text-white/70 leading-tight">
                    {{ t('mortgage_card.rate') }}
                </div>
                <div class="flex flex-col items-center">
                    <div class="text-3xl font-bold text-emerald-400">{{ formatPercent(mortgage.rate_min) }}</div>

                    <div v-if="mortgage.rate_max !== mortgage.rate_min" class="flex flex-col items-center">
                        <span>{{ t('mortgage_card.rate_to') }}</span><span
                            class="text-3xl font-bold text-emerald-400">{{
                                formatPercent(mortgage.rate_max) }}</span>
                    </div>
                </div>

            </div>

            <!-- Divider -->
            <div class="w-px h-24 bg-white/10"></div>

            <!-- Details -->
            <div class="space-y-4">
                <div>
                    <div class="text-sm text-white/60">{{ t('mortgage_card.loan_amount') }}</div>
                    <div class="text-lg font-medium">{{ t('mortgage_card.rate_to') }} {{
                        mortgage.max_loan_amount.toLocaleString() }} ₸</div>
                </div>
                <div>
                    <div class="text-sm text-white/60">{{ t('mortgage_card.loan_term') }}</div>
                    <div class="text-lg font-medium">{{ t('mortgage_card.rate_to') }} {{ mortgage.max_term_months }} {{
                        t('mortgage_card.months') }}
                    </div>
                </div>
            </div>

        </div>

        <!-- Actions -->
        <div class="flex gap-4">
            <NuxtLink :to="`/mortgage/${mortgage.id}`"
                class="flex-1 py-1.5 text-center rounded-full border border-emerald-400 text-white font-semibold hover:bg-emerald-400/10 transition">
                {{ t('mortgage_card.details') }}
            </NuxtLink>
            <a :href="mortgage?.website_link ?? ''" target="_blank" rel="noopener noreferrer"
                class="flex-1 py-1.5 text-center rounded-full bg-gradient-to-r from-emerald-400 to-[#8dfd2a]/70 text-slate-900 font-semibold hover:opacity-90 transition">
                {{ t('mortgage_card.apply') }} →
            </a>
        </div>

    </div>
</template>
