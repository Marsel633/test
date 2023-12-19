<template>
  <div class="contribution">
  </div>
</template>

<script lang="ts" setup>
const contributionStore = useContributionStore()
onMounted(() => {
  contributionStore.getData();
})
</script>

<style scoped>
.contribution {
  width: 15px;
  height: 15px;
  background-color: #EDEDED;
}
.contribution:hover {
  border: 1px solid #000;
}
</style>