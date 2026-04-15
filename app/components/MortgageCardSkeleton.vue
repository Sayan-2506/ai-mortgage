<!-- components/MortgageCardSkeleton.vue -->
<template>
    <div
        class="w-full p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-4">

        <!-- Header -->
        <div class="flex items-center justify-between gap-3">
            <Skeleton class="h-6 w-2/3 rounded-lg bg-white/10" />
            <Skeleton class="w-12 h-12 rounded-xl bg-white/10 flex-shrink-0" />
        </div>

        <!-- Content -->
        <div class="flex gap-4 items-center">
            <!-- Rate -->
            <div class="flex flex-col gap-2 flex-shrink-0">
                <Skeleton class="h-4 w-14 rounded bg-white/10" />
                <Skeleton class="h-9 w-20 rounded bg-white/10" />
                <Skeleton class="h-3 w-6 rounded bg-white/10" />
                <Skeleton class="h-8 w-16 rounded bg-white/10" />
            </div>

            <!-- Divider -->
            <div class="w-px self-stretch bg-white/10" />

            <!-- Details -->
            <div class="flex flex-col gap-3 flex-1">
                <div class="flex flex-col gap-1.5">
                    <Skeleton class="h-3 w-24 rounded bg-white/10" />
                    <Skeleton class="h-5 w-36 rounded bg-white/10" />
                </div>
                <div class="flex flex-col gap-1.5">
                    <Skeleton class="h-3 w-20 rounded bg-white/10" />
                    <Skeleton class="h-5 w-28 rounded bg-white/10" />
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-2 mt-auto">
            <Skeleton class="flex-1 h-9 rounded-full bg-white/10" />
            <Skeleton class="flex-1 h-9 rounded-full bg-white/10" />
        </div>

    </div>
</template>