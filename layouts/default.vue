<template>
  <div class="container">
    <div class="frameWrapper">
      <div class="frame">
          <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.months {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #EDEDED;
}

.frameWrapper {
  width: 1220px;
  height: 280px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.frame {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>