<template>
  <div class="wrapper">
    <div v-if="imgs.length !== 0" class="empty">
      <i class="material-icons download-icon">hourglass_empty</i>
      <p>Nothing here...</p>
    </div>
    <div class="downloads">>
  </div>
</template>

<script>
export default {
  name: 'download-manager',
  data() {
    return {
      imgs: [{
        name: '东方测试图片2333',
        size: 23123,
        downloaded: 0
      }]
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  border-left: dashed 1px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
}
.download-icon {
  font-size: 48px;
  color: rgba(0, 0, 0, 0.2);
}
.empty {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.2);
  position: absolute;
}
</style>
