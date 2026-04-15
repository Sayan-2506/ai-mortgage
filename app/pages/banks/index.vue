<!-- pages/banks/index.vue -->
<script lang="ts" setup>
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { Bank } from "~/types/banks";
import { toast } from 'vue-sonner'

const { t } = useI18n()
const config = useRuntimeConfig();

const { data: banks, pending: pendingBanks } = await useFetch<Bank[]>('/api/banks')

useSeoMeta({
    title: 'Банки — Ai-Ipoteka.kz',
    description: 'Подробная информация о банках'
})

if (import.meta.client) {
    watch(banks, (newVal) => {
        if (!newVal && !pendingBanks.value) {
            toast.warning(t('error.server.banks_not_found'))
        }
    }, { immediate: true })
}
</script>

<template>
    <AppLoader v-if="pendingBanks" />
    <div v-else class="min-h-screen bg-gray-50 px-4 md:px-6 py-8 md:py-12">
        <div class="max-w-[1280px] mx-auto">

            <!-- Breadcrumb -->
            <p class="text-sm text-slate-400 mb-6">
                <NuxtLink to="/" class="hover:text-slate-600 transition-colors">{{ t('banks.main_page') }}</NuxtLink>
                <span class="mx-2">/</span>
                <span>{{ t('banks.banks_page') }}</span>
            </p>

            <!-- Header -->
            <h1 class="text-3xl font-bold text-slate-900 mb-1">{{ t('banks.title') }}</h1>
            <p class="text-slate-400 text-sm mb-8">{{ t('banks.description') }}</p>

            <!-- Table -->
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow class="bg-slate-50 ">
                            <TableHead class="w-10 text-slate-800 py-4 px-6 text-base font-bold">#</TableHead>
                            <TableHead class="text-slate-800 py-4 px-6 text-base font-bold">Банк</TableHead>
                            <TableHead class="text-right text-slate-800 py-4 px-6 text-base font-bold">
                                {{ t('banks.active') }}<br><span class="text-sm font-normal">млрд</span>
                            </TableHead>
                            <TableHead class="text-right text-slate-800 py-4 px-6 text-base font-bold">
                                NPL<br><span class="text-sm font-normal">%</span>
                            </TableHead>
                            <TableHead class="text-right text-slate-800 py-4 px-6 text-base font-bold">
                                {{ t('banks.deposits') }}<br><span class="text-sm font-normal">млрд</span>
                            </TableHead>
                            <TableHead class="text-right text-slate-800 py-4 px-6 text-base font-bold">
                                {{ t('banks.capital') }}<br><span class="text-sm font-normal">млрд</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <template v-for="(bank, i) in banks" :key="bank.id">

                            <!-- Main row -->
                            <TableRow class="border-b-0 /50">
                                <TableCell class="text-slate-400 font-medium py-5 px-6">{{ i + 1 }}</TableCell>
                                <TableCell class="py-5 px-6">
                                    <div class="flex items-center gap-3">
                                        <div :style="{ backgroundColor: bank?.logo_bg ?? '#ffff' }"
                                            class="rounded-xl p-3 flex-shrink-0 self-start">
                                            <img :src="`${config.public.directusUrl}/assets/${bank.logo}`"
                                                :alt="bank.name" class="h-10 w-28 object-contain flex-shrink-0" />
                                        </div>
                                        <span class="font-semibold text-slate-900 text-base">{{ bank.name }}</span>
                                    </div>
                                </TableCell>
                                <TableCell class="text-right py-5 px-6">
                                    <p class="font-semibold text-slate-900">{{ bank.assets.toLocaleString('ru-RU') }}
                                    </p>
                                    <p :class="Number(bank.assets_change ?? 0) >= 0 ? 'text-emerald-500' : 'text-red-500'"
                                        class="text-xs">
                                        {{ Number(bank.assets_change ?? 0) >= 0 ? '+' : '' }}{{ bank.assets_change }}%
                                    </p>
                                </TableCell>
                                <TableCell class="text-right font-medium text-slate-700 py-5 px-6">{{ bank.npl }}
                                </TableCell>
                                <TableCell class="text-right font-medium text-slate-700 py-5 px-6">{{
                                    bank.deposits.toLocaleString('ru-RU') }}</TableCell>
                                <TableCell class="text-right font-medium text-slate-700 py-5 px-6">{{
                                    bank.capital.toLocaleString('ru-RU') }}</TableCell>
                            </TableRow>

                            <!-- Detail row -->
                            <TableRow class="/50">
                                <TableCell class="px-6 pb-5" />
                                <TableCell class="px-6 pb-5" colspan="3">
                                    <div class="flex items-center gap-6 text-sm text-slate-400">
                                        <span>Лицензия: {{ bank.license }}</span>
                                        <span>{{ bank.branches }} {{ t('banks.branches') }}</span>
                                        <span>{{ bank.atms }} {{ t('banks.atms') }}</span>
                                    </div>
                                </TableCell>
                                <TableCell class="text-right px-6 pb-5" colspan="2">
                                    <NuxtLink :to="`/banks/${bank.id}`">
                                        <Button variant="outline"
                                            class="px-3 py-2 text-sm font-medium bg-neutral-800 rounded-lg text-white hover:bg-neutral-700 hover:text-white transition-all">
                                            {{ t('banks.details') }}
                                        </Button>
                                    </NuxtLink>
                                </TableCell>
                            </TableRow>

                        </template>
                    </TableBody>
                </Table>
            </div>

        </div>
    </div>
</template>
