<script lang="ts" setup>
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import type { MortgageFilters } from '~/types/filters'
import { useMortgageStore } from '~/store/useMortgageStore'

const store = useMortgageStore()
const { t } = useI18n()

const filters = reactive<MortgageFilters>({
    amount: [25000000],
    period: [3],
    downPayment: [30],
    maxRate: [25],
    firstHousing: false,
    secondaryHousing: false,
})


const handleSearch = () => {
    store.fetchMortgages(filters)
}

const handleReset = () => {
    filters.amount = [25000000]
    filters.period = [1]
    filters.downPayment = [30],
        filters.maxRate = [25],
        filters.secondaryHousing = false
    filters.firstHousing = false

    store.fetchMortgages()
}
</script>


<template>
    <div class="w-full max-w-[350px] md:max-w-none">
        <div class="px-6 py-4 bg-gray-950/80 rounded-lg">
            <h3 class="text-white text-lg font-bold">{{ t('filters.title') }}</h3>
            <div class="flex flex-col gap-y-4 w-full mt-3 bg-gray-600/30 p-4 rounded-lg">
                <div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <span class="text-white/50 text-sm">{{ t('filters.loan_amount') }}</span>
                            <span class="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">
                                {{ amountFmt(filters.amount[0] ?? 0) }} ₸
                            </span>
                        </div>

                        <Slider class="bg-gray-600" v-model="filters.amount" :min="1000000" :max="100000000"
                            :step="500000" />

                        <div class="flex justify-between text-white/30 text-xs">
                            <span>1М</span>
                            <span>100М ₸</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <span class="text-white/50 text-sm">{{ t('filters.loan_term') }}</span>
                            <span class="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">
                                {{ periodFmt(filters.period[0] ?? 0) }}
                            </span>
                        </div>

                        <Slider class="bg-gray-600" v-model="filters.period" :min="3" :max="300" :step="1" />

                        <div class="flex justify-between text-white/30 text-xs">
                            <span>3</span>
                            <span>300 {{ t('filters.months') }}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <span class="text-white/50 text-sm">{{ t('filters.down_payment') }}</span>
                            <span class="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">
                                {{ filters.downPayment[0] }}% ({{ fmtDownPayment(Math.round((filters.amount[0] ?? 0) *
                                    (filters.downPayment[0] ??
                                        0) / 100))
                                }} ₸)
                            </span>
                        </div>

                        <Slider class="bg-gray-600" v-model="filters.downPayment" :min="10" :max="90" :step="5" />

                        <div class="flex justify-between text-white/30 text-xs">
                            <span>10%</span>
                            <span>90%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <span class="text-white/50 text-sm">{{ t('filters.max_rate') }}</span>
                            <span class="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">
                                {{ formatPercent(filters.maxRate[0] ?? 0) }}
                            </span>
                        </div>

                        <Slider class="bg-gray-600" v-model="filters.maxRate" :min="1" :max="30" :step="0.1" />

                        <div class="flex justify-between text-white/30 text-xs">
                            <span>1</span>
                            <span>30%</span>
                        </div>
                    </div>
                </div>

                <div class="pt-5 border-t border-white/20">
                    <h4 class="text-white text-sm font-bold mb-2">{{ t('filters.hard_filters') }}</h4>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-white/50 text-sm">{{ t('filters.type_mortgage.primary') }}</span>
                        <Switch v-model="filters.firstHousing" />
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-white/50 text-sm">{{ t('filters.type_mortgage.secondary') }}</span>
                        <Switch v-model="filters.secondaryHousing" />
                    </div>
                </div>

            </div>

            <div class="mt-5 flex justify-between gap-x-3">
                <button
                    class="w-full px-2 py-2 bg-[#8dfd2a]/70 text-white text-sm rounded-lg hover:bg-[#8dfd2a]/50 transition-colors"
                    @click="handleSearch">
                    {{ t('filters.show_results') }}
                </button>
                <button
                    class="w-full px-2 py-2 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600 transition-colors"
                    @click="handleReset">
                    {{ t('filters.reset') }}
                </button>
            </div>

        </div>
    </div>
</template>
