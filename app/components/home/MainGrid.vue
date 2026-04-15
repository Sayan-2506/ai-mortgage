<script lang="ts" setup>
import LeftSidebar from './LeftSidebar.vue'
import MortgageCard from './MortgageCard.vue'
import { useMortgageStore } from '~/store/useMortgageStore'

const store = useMortgageStore()
const showFilters = ref(false)

onMounted(() => store.fetchMortgages())
</script>

<template>
    <div class="full bg-gray-100 px-4 md:px-6 py-8 md:py-12">
        <div class="max-w-[1280px] mx-auto">

            <!-- Кнопка фильтров на мобильном -->
            <button
                class="md:hidden w-full mb-4 py-2.5 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
                @click="showFilters = !showFilters">
                <span>⚙️</span>
                <span>{{ showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}</span>
            </button>

            <div class="flex flex-col md:grid md:grid-cols-3 gap-8 items-start">

                <!-- Сайдбар — на мобильном скрыт/показан по кнопке -->
                <div :class="['md:block', showFilters ? 'block' : 'hidden']">
                    <LeftSidebar />
                </div>

                <!-- Карточки -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 items-stretch">
                    <template v-if="store.pendingMortgage">
                        <MortgageCardSkeleton v-for="n in 4" :key="n" />
                    </template>
                    <template v-else>
                        <MortgageCard v-for="mortgage in store.mortgages" :key="mortgage.id" :mortgage="mortgage" />
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>