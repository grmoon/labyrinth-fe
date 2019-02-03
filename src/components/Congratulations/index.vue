<template>
  <div class="congratulations">
    <div class="congratulations__message">
      Congratulations!
    </div>
  </div>
</template>

<style lang="scss" scoped>
.congratulations {
    align-items: center;
    background-color: rgba(0, 0, 0, .25);
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: 100%;
}

.congratulations__message {
    color: white;
    font-size: 2.5em;
    font-weight: bolder;
    position: absolute;
}
</style>