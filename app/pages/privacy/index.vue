<!-- pages/privacy.vue -->

<script setup lang="ts">
const sections = [
    {
        icon: 'mdi:information',
        title: '1. Дисклеймер',
        description: 'Ai-Ipoteka.kz является информационным сервисом, предоставляющим справочные данные об ипотечных программах банков Республики Казахстан.',
        items: [
            'Сайт не является банком и не выдает кредиты.',
            'Все представленные расчеты носят ознакомительный характер.',
            'Окончательные условия, процентные ставки, суммы и сроки утверждаются исключительно банком при личном обращении. Рекомендуем уточнять актуальные данные на официальных сайтах финансовых организаций.',
        ]
    },
    {
        icon: 'mdi:database',
        title: '2. Сбор персональных данных',
        description: 'Мы ценим вашу конфиденциальность и собираем только тот минимум данных, который необходим для работы сервиса:',
        items: [
            'Технические данные: IP-адрес, тип браузера, данные cookie (для работы калькулятора и оптимизации отображения).',
            'Данные, введенные пользователем: Параметры ипотеки (сумма, срок, доход), которые вы вносите в калькулятор. Эти данные не передаются третьим лицам и используются только для отображения результатов расчета на вашем устройстве.',
        ]
    },
    {
        icon: 'mdi:cog',
        title: '3. Использование данных',
        description: 'Мы используем собранные данные для:',
        items: [
            'Обеспечения работоспособности сервиса.',
            'Улучшения пользовательского опыта.',
            'Аналитики посещаемости (с помощью Google Analytics или Яндекс.Метрики).',
        ]
    },
    {
        icon: 'mdi:account-group',
        title: '4. Передача данных третьим лицам',
        description: 'Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам. Исключение составляют:',
        items: [
            'Случаи, предусмотренные законодательством РК.',
            'Использование инструментов аналитики (агрегированные данные).',
        ]
    },
    {
        icon: 'mdi:shield-lock',
        title: '5. Безопасность',
        description: 'Мы принимаем все необходимые технические меры для защиты данных от несанкционированного доступа, изменения или раскрытия.',
        items: undefined
    },
    {
        icon: 'mdi:file-edit',
        title: '6. Изменения в Политике',
        description: 'Мы оставляем за собой право обновлять Политику конфиденциальности. Все изменения публикуются на этой странице.',
        items: undefined
    },
    {
        icon: 'mdi:gavel',
        title: '7. Лицензия и правовая информация',
        description: undefined,
        items: [
            'Лицензия: Информационный ресурс. Регистрация не требуется.',
            'Контакты: Если у вас возникли вопросы по поводу данных, напишите нам на info@ai-ipoteka.kz.',
        ]
    },
]

useSeoMeta({
    title: 'Политика конфиденциальности — Ai-Ipoteka.kz',
    description: 'Политика конфиденциальности и условия использования сервиса Ai-Ipoteka.kz'
})
</script>

<template>
    <div class="bg-gray-100 min-h-screen">

        <!-- Hero -->
        <section class="bg-gray-950 py-16 px-4">
            <div class="max-w-[1280px] mx-auto">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                        <Icon name="mdi:shield-check" size="22" class="text-emerald-400" />
                    </div>
                    <span class="text-emerald-400 text-sm font-medium">Правовая информация</span>
                </div>
                <h1 class="text-4xl font-bold text-white mb-3">Политика конфиденциальности</h1>
                <p class="text-white/40 text-sm">Дата последнего обновления: 25 марта 2026 г.</p>
            </div>
        </section>
        <div class="max-w-[1280px] mx-auto">
            <!-- Контент -->
            <section class="py-12 px-4">
                <div class="flex flex-col gap-4">

                    <div v-for="section in sections" :key="section.title"
                        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <span
                                class="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon :name="section.icon" size="18" class="text-emerald-500" />
                            </span>
                            {{ section.title }}
                        </h2>

                        <p v-if="section.description" class="text-slate-600 text-sm leading-relaxed mb-4">
                            {{ section.description }}
                        </p>

                        <ul v-if="section.items" class="flex flex-col gap-2">
                            <li v-for="item in section.items" :key="item"
                                class="flex items-start gap-2 text-sm text-slate-600">
                                <span class="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Контакты -->
                    <div class="bg-gray-950 rounded-2xl p-6">
                        <h2 class="text-lg font-bold text-white mb-2">Есть вопросы?</h2>
                        <p class="text-white/50 text-sm mb-4">Если у вас возникли вопросы по поводу данных — напишите
                            нам
                        </p>
                        <a href="mailto:info@ai-ipoteka.kz"
                            class="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
                            <Icon name="mdi:email" size="18" />
                            info@ai-ipoteka.kz
                        </a>
                    </div>

                </div>
            </section>
        </div>
    </div>
</template>
