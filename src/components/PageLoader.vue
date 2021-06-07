<template>
  <div class="page-loader" v-if="visible">
    <div class="cube"><img class="img" src="../assets/Dev.png" alt="Dev" /></div>
    <div class="cube__t"><img class="img" src="../assets/T.png" alt="T" /></div>
    <div class="cube"><img class="img" src="../assets/eaM.png" alt="eaM" /></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false
  }),
  methods: {
    show (flag) {
      this.visible = flag
    }
  }
}
</script>

<style lang="scss" scoped>

.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 999;
}

.cube{
  width: 60px;
  height: 60px;
  &:cube__t{
    width: 28;
  }
  &:first-child {
    animation: left 1s infinite;
  }
  &:last-child {
    animation: right 1s infinite .5s;
  }
}

@keyframes left {
  40% {
    transform: translateX(-40px);
  }
  50% {
    transform: translateX(0);
  }
}
@keyframes right {
  40% {
    transform: translateX(40px);
  }
  50% {
    transform: translateX(0);
  }
}
</style>
