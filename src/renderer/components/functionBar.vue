<template>
	<div class="function-bar-wrapper" :class="{'blur': blur}">
		<div class="button button-minimize" @click="minimize"></div>
		<div class="button button-maximize" @click="maximize"></div>
		<div class="button button-close" @click="close"></div>
	</div>
</template>

<script>

export default {
  name: 'function-bar',
  data () {
    return {
      currentWindow: this.$electron.remote.getCurrentWindow(),
      blur: false
    }
  },
  methods: {
    minimize () {
      this.currentWindow.minimize()
    },
    maximize () {
      if (this.currentWindow.isMaximized()) {
        this.currentWindow.unmaximize()
      } else {
        this.currentWindow.maximize()
      }
    },
    close () {
      this.currentWindow.close()
    }
  },
  mounted () {
    this.currentWindow.on('blur', () => {
      this.blur = true
    })
    this.currentWindow.on('focus', () => {
      this.blur = false
    })
  }
}
</script>

<style>
.function-bar-wrapper {
  -webkit-app-region: drag;
  height: 36px;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 100;
}

.function-bar-wrapper > .button {
  -webkit-app-region: no-drag;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}

.function-bar-wrapper > .button:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.button-minimize {
  background-color: #ffd518;
}

.button-maximize {
  background-color: #17b33e;
}

.button-close {
  background-color: #ee6060;
}

.function-bar-wrapper.blur > .button {
  background-color: lightgray !important;
}
</style>
