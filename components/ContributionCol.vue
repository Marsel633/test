<template>
  <div class="col">
    <ul class="months">
      <li v-for="month in contributionStore.monthsArray" :key="month">
        {{ month }}
      </li>
    </ul>
    <ul class="weeks">
      <li v-for="item in contributionStore.weeksArray" :key="item">
        {{ item }}
      </li>
    </ul>
    <div v-for="(value, key) in contributionStore.dates" :key="key">
      <div @click="toggleModal(key)" class="contribution" :class="contributionStore.getColor(value)">
        <div v-if="modalActive === key" class="modal"><span class="triangle"></span>{{ value }} contributions<span>{{ contributionStore.formatDateLong(key) }}</span></div>
      </div>
      <div @click="clickModalOutside" v-if="modalActive" class="overlay"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const contributionStore = useContributionStore();
const modalActive = ref<string | null | number>(null);

const toggleModal = (key: string | number) => {
  if (modalActive.value === key) {
    modalActive.value = null;
  } else {
    modalActive.value = key;
  }
};

const clickModalOutside = () => {
  modalActive.value = null
}

onMounted(() => {
  contributionStore.getData();
});

watchEffect(() => {
  for (let key in contributionStore.dates) {
    if (contributionStore.conData.hasOwnProperty(key) && contributionStore.dates.hasOwnProperty(key)) {
      contributionStore.dates[key] = contributionStore.conData[key];
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
  width: 150px;
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
.triangle {
  width: 10px;
  height: 10px;
  background-color: #000;
  clip-path: polygon(100% 0, 0 0, 50% 100%);
  position: absolute;
  bottom: -8px;
}
span {
  color: #7C7C7C;
  font-size: 10px;
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
