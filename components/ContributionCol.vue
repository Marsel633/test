<template>
  <div class="col">
    <div @click="" v-for="day in days" :key="day" class="day">
      <Contribution/>
    </div>
    <div>
      {{ startDate }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const countributionStore = useContributionStore();
const startDate = ref<string>(new Date('2022.10.26').toLocaleDateString());
const endDate = ref<string>(new Date('2023.10.25').toLocaleDateString());
const newDate = ref(new Date("2022-10-26").toLocaleDateString());
console.log(newDate);

const days = computed(() => {
  const daysInPeriod:number = 364;
  return Array.from({ length: daysInPeriod }, (_, index) => index + 1);
});


onMounted(() => {
  countributionStore.getData();
});

</script>

<style scoped>
.col {
  display: grid;
  grid-template-columns: repeat(52, 15px);
  grid-template-rows: repeat(7, 15px);
  justify-content: center;
  gap: 2px;
}
</style>