<template>
  <div class="col">
    <div v-for="day in dates">
      <div class="contribution">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const countributionStore = useContributionStore();
const startDate = new Date('2022-10-25');
const endDate = new Date('2023-10-25');
const dates: Record<string, number> = {};
const date = new Date(startDate.getTime());

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

date.setDate(date.getDate() + 1);
while (date < endDate) {
  dates[formatDate(date)] = 0;
  date.setDate(date.getDate() + 1);
}

for (let key in countributionStore.conData) {
  if (countributionStore.conData.hasOwnProperty(key) && dates.hasOwnProperty(key)) {
    dates[key] = countributionStore.conData[key];
  }
}


onMounted(() => {
  countributionStore.getData();
});

</script>

<style scoped>
.col {
  height: 140px;
  width: 952px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 2px;
}

.contribution {
  width: 15px;
  height: 15px;
  background-color: #EDEDED;
  border: 1px solid #EDEDED;
}

.contribution:hover {
  border: 1px solid #000;
}
</style>