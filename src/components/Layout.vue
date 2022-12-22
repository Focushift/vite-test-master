<template>
  <div class="layout">
    <div></div>
    <div class="layout_container">
      <slot />
    </div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    min-height: 100vh;
    min-width: 100vw;
    display: grid;
    grid-template-columns: auto 1280px auto;
  }
</style>