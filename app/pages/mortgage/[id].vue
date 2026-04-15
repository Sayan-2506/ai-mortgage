<script setup lang="ts">
import type { Mortgage } from '~/types/programs'
import type { MortgageFilters } from '~/types/filters'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'vue-sonner'

const { t, locale } = useI18n()

const config = useRuntimeConfig();

const route = useRoute()
const router = useRouter()

type RateKey = 'rate_min' | 'rate_max' | 'gesv_min' | 'gesv_max';

const selectedRateKey = ref<RateKey>('rate_min');

const currentRate = computed(() => mortgage.value?.[selectedRateKey.value] ?? 0);

function setRate(key: RateKey) {
    selectedRateKey.value = key;
}

const { data: mortgage, pending: pendingMortgage, error } = await useFetch<Mortgage>(`/api/programs/${route.params.id}`)

const filters = reactive<MortgageFilters>({
    amount: [1000000],
    period: [mortgage.value?.max_term_months ?? 120],
    downPayment: [30],
    maxRate: [25],
    firstHousing: false,
    secondaryHousing: false,
})

const translatedData = computed(() => {
    return mortgage.value?.translations.find(t =>
        t.languages_id.code === locale.value
    )
})

const features = computed(() => [
    { icon: 'mdi:home', label: $t('mortgage_details.market'), value: mortgage.value?.primary_secondary === $t('mortgage_details.both') ? $t('mortgage_details.primary_secondary_both') : mortgage.value?.primary_secondary === $t('mortgage_details.primary_secondary_primary') ? $t('mortgage_details.primary_secondary_primary') : $t('mortgage_details.primary_secondary_secondary') },
    { icon: 'mdi:shield', label: $t('mortgage_details.insurance'), value: mortgage.value?.no_insurance ? $t('mortgage_details.no_insurance') : $t('mortgage_details.required_insurance') },
    { icon: 'mdi:clipboard-list', label: $t('mortgage_details.income'), value: mortgage.value?.income_proof ? $t('mortgage_details.income_required') : $t('mortgage_details.income_not_required') },
    { icon: 'mdi:rocket', label: $t('mortgage_details.processing_time'), value: mortgage.value?.processing_time ? `${t('mortgage_details.to')} ${mortgage.value.processing_time} ${t('mortgage_details.days')}` : $t('mortgage_details.processing_time_unknown') },
    { icon: 'mdi:check-circle', label: $t('mortgage_details.repayment'), value: mortgage.value?.mortgage_programs[0] && mortgage.value?.mortgage_programs[1] ? $t('mortgage_details.partial_prepayment') : t('mortgage_details.no_partial_prepayment') },
    { icon: 'mdi:money', label: $t('mortgage_details.down_payment'), value: mortgage.value?.min_downpayment ? `${t('mortgage_details.from')} ${mortgage.value.min_downpayment}%` : $t('mortgage_details.no_down_payment') },
])

const tabs = computed(() => [
    {
        key: 'description',
        label: $t('mortgage_details.full_description'),
        content: translatedData.value?.description_main ?? t('mortgage_details.description_not_available')
    },
    {
        key: 'requirements',
        label: $t('mortgage_details.requirements'),
        content: translatedData.value?.attention_notes ?? t('mortgage_details.requirements_not_available')
    },
    {
        key: 'documents',
        label: $t('mortgage_details.documents'),
        items: mortgage.value?.documents?.length
            ? mortgage.value.documents
            : [{ documents_id: { id: 0, name: t('mortgage_details.requirements_not_available'), is_required: false } }]
    }
])


useSeoMeta({
    title: () => mortgage.value
        ? `${mortgage.value.program_name} от ${mortgage.value.bank?.name} — Ai-Ipoteka.kz`
        : 'Загрузка ипотечной программы...',
    description: () => mortgage.value
        ? `Ипотечная программа ${mortgage.value.program_name}. Ставка от ${mortgage.value.rate_min}%.`
        : '',
    ogImage: () => mortgage.value?.bank?.logo || '/default-share.png'
})

if (import.meta.client) {
    watch(mortgage, (newVal) => {
        if (!newVal && !pendingMortgage.value) {
            toast.warning(t('error.server.mortgage_not_found'))
        }
    }, { immediate: true })
}
</script>

<template>
    <AppLoader v-if="pendingMortgage" />
    <div v-else>
        <div class="bg-[#0f1117] text-white">
            <div class="max-w-[900px] mx-auto px-4 md:px-6 py-6 md:py-10">

                <!-- Back -->
                <button @click="router.back()"
                    class="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6 group">
                    <span class="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                    {{ t('mortgage_details.back_to_list') }}
                </button>

                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold leading-tight mb-4">
                            {{ mortgage?.program_name }} от {{ mortgage?.bank?.name }}
                        </h1>
                        <div class="flex flex-wrap gap-2 mb-4 max-w-80">
                            <span @click="setRate('rate_min')"
                                :class="selectedRateKey === 'rate_min' ? 'bg-emerald-400 text-slate-900' : 'bg-white/10 text-white'"
                                class="px-4 py-1.5 text-sm font-bold rounded-lg cursor-pointer transition-colors">
                                {{ $t('mortgage_details.rate_from') }}: {{ formatRatePercent(mortgage?.rate_min ?? 0)
                                }}%
                            </span>

                            <span v-if="mortgage?.rate_max && mortgage.rate_max !== mortgage.rate_min"
                                @click="setRate('rate_max')"
                                :class="selectedRateKey === 'rate_max' ? 'bg-emerald-400 text-slate-900' : 'bg-white/10 text-white'"
                                class="px-4 py-1.5 text-sm font-bold rounded-lg cursor-pointer transition-colors">
                                {{ $t('mortgage_details.rate_to') }}: {{ formatRatePercent(mortgage?.rate_max ?? 0) }}%
                            </span>

                            <span v-if="mortgage?.gesv_min" @click="setRate('gesv_min')"
                                :class="selectedRateKey === 'gesv_min' ? 'bg-emerald-400 text-slate-900' : 'bg-white/10 text-white'"
                                class="px-4 py-1.5 text-sm font-bold rounded-lg cursor-pointer transition-colors">
                                {{ $t('mortgage_details.gesv_from') }}: {{ formatRatePercent(mortgage?.gesv_min ?? 0)
                                }}%
                            </span>

                            <span v-if="mortgage?.gesv_max" @click="setRate('gesv_max')"
                                :class="selectedRateKey === 'gesv_max' ? 'bg-emerald-400 text-slate-900' : 'bg-white/10 text-white'"
                                class="px-4 py-1.5 text-sm font-bold rounded-lg cursor-pointer transition-colors">
                                {{ $t('mortgage_details.gesv_to') }}: {{ formatRatePercent(mortgage?.gesv_max ?? 0) }}%
                            </span>
                        </div>
                    </div>

                    <div :style="{ backgroundColor: mortgage?.bank?.logo_bg ?? '#ffff' }"
                        class="rounded-xl p-3 flex-shrink-0 self-start">
                        <img :src="`${config.public.directusUrl}/assets/${mortgage?.bank?.logo}`"
                            :alt="mortgage?.bank.name" class="h-10 w-28 object-contain" />
                    </div>
                </div>

            </div>
        </div>


        <!-- Calculator -->
        <div class="bg-gray-200 text-black">
            <div class="max-w-[900px] mx-auto px-4 md:px-6 py-6 md:py-10">

                <div class="bg-white border border-white/8 rounded-2xl p-5 md:p-6 mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <!-- Sliders -->
                        <div class="md:col-span-2 space-y-7">

                            <!-- Сумма -->
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-black text-lg">{{ $t('mortgage_details.loan_amount') }}</span>
                                    <span class="text-emerald-400 font-semibold text-sm">
                                        {{ amountFmt(filters.amount[0] ?? 0) }} ₸
                                    </span>
                                </div>
                                <Slider class="bg-gray-300" v-model="filters.amount" :min="1000000"
                                    :max="mortgage?.max_loan_amount ?? 100000000" :step="500000" />
                                <div class="flex justify-between text-base text-black mt-2">
                                    <span>1М</span>
                                    <span>{{ amountFmt(mortgage?.max_loan_amount ?? 100000000) }} ₸</span>
                                </div>
                            </div>

                            <!-- Срок -->
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-black text-lg">{{ $t('mortgage_details.loan_term') }}</span>
                                    <span class="text-emerald-400 font-semibold text-base">
                                        {{ periodFmt(filters.period[0] ?? 0) }}
                                    </span>
                                </div>
                                <Slider class="bg-gray-300" v-model="filters.period" :min="3"
                                    :max="mortgage?.max_term_months ?? 300" :step="1" />
                                <div class="flex justify-between text-base text-black mt-2">
                                    <span>3 {{ $t('mortgage_details.month') }}</span>
                                    <span>{{ mortgage?.max_term_months ?? 300 }} {{ $t('mortgage_details.month')
                                    }}</span>
                                </div>
                            </div>

                        </div>

                        <!-- Result -->
                        <div class="bg-blue-100 rounded-xl p-5 flex flex-col justify-center">
                            <div>
                                <p class="text-sm text-slate-500 mb-1">{{ $t('mortgage_details.choiced_rate') }}</p>
                                <p class="text-lg font-bold text-slate-900">{{ formatRatePercent(currentRate) }}%</p>
                            </div>

                            <div class="border-t border-slate-200 pt-2">
                                <p class="text-sm text-slate-500 mb-1">{{ $t('mortgage_details.every_month_payment') }}
                                </p>
                                <p class="text-xl font-bold text-slate-900">
                                    ~{{ getMonthlyPayment(filters.amount[0], filters.period[0], currentRate / 100) }} ₸
                                </p>
                            </div>

                            <div class="border-t border-slate-200 pt-2">
                                <p class="text-sm text-slate-500 mb-1">{{ $t('mortgage_details.total_interest') }}</p>
                                <p class="text-lg font-bold text-red-500">
                                    ~{{ getTotalInterest(filters.amount[0], filters.period[0], currentRate / 100) }} ₸
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="f in features" :key="f.label" class="flex items-center gap-3">
                        <Icon :name="f.icon" class="bg-blue-800" size="25" />
                        <div>
                            <p class="text-base text-slate-400">{{ f.label }}</p>
                            <p class="text-sm font-medium text-slate-800">{{ f.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-200 text-black">
            <div class="max-w-[900px] mx-auto px-4 md:px-6 py-6 md:py-10">
                <div class="bg-white rounded-2xl overflow-hidden">
                    <Tabs default-value="description">
                        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
                            <TabsTrigger v-for="tab in tabs" :key="tab.key" :value="tab.key"
                                class="rounded-none border-b-2 border-transparent px-4 py-3 text-sm text-slate-400 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none">
                                {{ tab.label }}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" class="p-5 text-slate-900 leading-relaxed">
                            <div class="prose prose-slate max-w-none"
                                v-html="translatedData?.description_main ?? 'Описание отсутствует.'" />
                        </TabsContent>

                        <TabsContent value="requirements" class="p-5">
                            <div class="prose prose-slate max-w-none"
                                v-html="translatedData?.attention_notes ?? 'Описание отсутствует.'" />
                        </TabsContent>

                        <TabsContent value="documents" class="p-5">
                            <ul class="space-y-2 text-slate-900">
                                <li v-for="item in tabs[2]?.items" :key="item.documents_id.id"
                                    class="flex items-start gap-2">
                                    <span class="text-blue-600 mt-0.5">•</span>
                                    {{ item.documents_id.name }}
                                </li>
                            </ul>
                        </TabsContent>
                    </Tabs>
                </div>

                <!-- Actions -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <a :href="mortgage?.website_link ?? ''" target="_blank" rel="noopener noreferrer" class="py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl text-center
                    transition-colors">
                        Подать заявку на сайте банка
                    </a>
                    <a :href="`${config.public.directusUrl}/assets/${mortgage?.pdf_file}`" target="_blank"
                        rel="noopener noreferrer" download
                        class="py-3.5 bg-slate-500 hover:bg-slate-400 text-white font-semibold text-sm rounded-xl transition-colors text-center">
                        Скачать условия (PDF)
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>