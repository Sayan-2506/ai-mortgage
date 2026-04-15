// stores/useMortgageStore.ts
import { defineStore } from "pinia";
import type { Mortgage } from "~/types/programs";
import type { MortgageFilters } from "~/types/filters";
import type { Bank } from "~/types/banks";

export const useMortgageStore = defineStore("mortgage", () => {
  const mortgages = ref<Mortgage[]>([]);
  const banks = ref<Bank[]>([]);
  const pendingMortgage = ref(false);
  const pendingBanks = ref(false);
  const { $directus, $readItems } = useNuxtApp();

  const fetchMortgages = async (filters?: MortgageFilters) => {
    pendingMortgage.value = true;

    try {
      // Без фильтров — все программы
      if (!filters) {
        mortgages.value = (await $directus.request(
          $readItems("mortgage_programs", {
            fields: ["*", { bank: ["*"] }],
          }),
        )) as Mortgage[];
        return;
      }

      const filterObject: any = {
        max_loan_amount: { _gte: filters.amount[0] },
        max_term_months: { _gte: filters.period[0] },
        min_downpayment: { _lte: filters.downPayment[0] },
        rate_max: { _lte: filters.maxRate[0] },
      };

      const housing =
        filters.firstHousing && filters.secondaryHousing
          ? "Обе"
          : filters.firstHousing
            ? "Первичный рынок"
            : filters.secondaryHousing
              ? "Вторичный рынок"
              : null;

      if (housing !== null) {
        filterObject.primary_secondary = { _eq: housing };
      }

      mortgages.value = (await $directus.request(
        $readItems("mortgage_programs", {
          filter: {
            ...filterObject,
          },
          fields: ["*", { bank: ["*"] }],
        }),
      )) as Mortgage[];
    } catch (e) {
      console.error(e);
    } finally {
      pendingMortgage.value = false;
    }
  };

  const getBanks = async () => {
    pendingBanks.value = true;

    try {
      banks.value = (await $directus.request($readItems("banks"))) as Bank[];
    } catch (e) {
      console.error(e);
    } finally {
      pendingBanks.value = false;
    }
  };

  return {
    mortgages,
    pendingMortgage,
    pendingBanks,
    fetchMortgages,
    banks,
    getBanks,
  };
});
