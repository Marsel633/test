<template>
  <div class="col">
    <ul class="months">
      <li>Апр.</li>
      <li>Май</li>
      <li>Июнь</li>
      <li>Июль</li>
      <li>Авг.</li>
      <li>Сент.</li>
      <li>Окт.</li>
      <li>Нояб.</li>
      <li>Дек.</li>
      <li>Янв.</li>
      <li>Февр.</li>
      <li>Март</li>
    </ul>
    <ul class="weeks">
      <li>
        Пн
      </li>
      <li>
        Ср
      </li>
      <li>
        Пт
      </li>
    </ul>
    <div v-for="(value, key) in dates" :key="key">
      <div @click="toggleModal(key)" class="contribution" :class="getColor(value)">
        <div v-if="modalActive === key" class="modal">{{ value }} contributions<span>{{ key }}</span></div>
      </div>
      <div @click="clickModalOutside" v-if="modalActive" class="overlay"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const countributionStore = useContributionStore();
const startDate: Date = new Date('2022-10-25');
const endDate: Date = new Date('2023-10-25');
const dates = ref<{ [key: string]: number }>({});
const date: Date = new Date(startDate.getTime());
const modalActive = ref<string | null>(null);

const toggleModal = (key: string | any) => {
  if (modalActive.value === key) {
    modalActive.value = null;
  } else {
    modalActive.value = key;
  }
};

const clickModalOutside = () => {
  modalActive.value = null
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

date.setDate(date.getDate() + 1);
while (date < endDate) {
  const formattedDate = formatDate(date);
  dates.value[formattedDate] = 0;
  date.setDate(date.getDate() + 1);
}

const getColor = (number: number): string => {
  if (number < 1) return 'defaultColor';
  if (number > 1 && number <= 9) return 'low';
  if (number > 9 && number <= 19) return 'medium';
  if (number > 20 && number <= 29) return 'high';
  if (number > 29) return 'highest';
  return 'defaultColor';
};

onMounted(() => {
  countributionStore.getData();
});

watchEffect(() => {
  for (let key in dates.value) {
    if (countributionStore.conData.hasOwnProperty(key) && dates.value.hasOwnProperty(key)) {
      dates.value[key] = countributionStore.conData[key];
    }
  }
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
  position: relative;
}

.months {
  width: 100%;
  position: absolute;
  top: -40px;
  display: flex;
  gap: 4%;
}

.weeks {
  position: absolute;
  left: -70px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

li {
  list-style-type: none;
  color: #959494;
}

.contribution {
  width: 15px;
  height: 15px;
  background-color: #EDEDED;
  border: 1px solid transparent;
  position: relative;
}

.modal {
  width: 145px;
  height: 42px;
  background-color: #000;
  position: absolute;
  top: -50px;
  right: -65px;
  border-radius: 5px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 5;
}

span {
  color: #7C7C7C;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
}

.contribution:hover {
  border: 1px solid #000;
}

.defaultColor {
  background-color: #EDEDED;
}

.low {
  background-color: #ACD5F2;
}

.medium {
  background-color: #7FA8C9;
}

.high {
  background-color: #527BA0;
}

.highest {
  background-color: #254E77;
}
</style>
