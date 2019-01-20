<template>
  <div class="wrapper">
    <div v-if="downloadNum === 0" class="empty">
      <i class="material-icons download-icon">hourglass_empty</i>
      <p>Nothing here...</p>
    </div>
    <div class="downloads">
      <div class="download-item" v-for="(value, key) in downloadList" :key="key">
        <div class="item-filename">{{value.filename}}</div>
        <div v-if="value.size">
          <div class="filesize" v-if="value.size === 1">未知大小</div>
          <div class="filesize" v-else>{{filesize(value.size)}}</div>
          <div class="progress">
            <div v-if="value.finished" class="progress-text">已完成</div>
            <div v-else-if="value.error" class="progress-text">{{value.error}}</div>
            <div v-else-if="!value.started">等待开始</div>
            <div v-else class="progress-text">{{filesize(value.downloaded)}} / {{filesize(value.size)}}</div>
            <div class="progress-bar"
                :class="{error: value.error, finish: value.finished}"
                :style="{width: value.finished ? '100%' : value.downloaded / value.size * 100 + '%'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'
import electron from 'electron'

// let downloadingNum = 0

export default {
  name: 'download-manager',
  data () {
    return {
      downloadList: {},
      downloadNum: 0
    }
  },
  mounted () {
    electron.ipcRenderer.on('downloaderFinished', (event, arg) => {
      console.log('downloaderFinished' + arg)
    })
    electron.ipcRenderer.on('downloaderCreated', (event, arg) => {
      console.log('downloaderCreated:' + JSON.stringify(arg))
      this.downloadNum = this.downloadNum + 1
      arg.downloaded = 0
      arg.size = 1
      arg.started = false
      this.$set(this.downloadList, arg.id, arg)
    })
    electron.ipcRenderer.on('downloaderProgress', (event, arg) => {
      this.$set(this.downloadList[arg.id], 'downloaded', arg.loaded)
    })
    electron.ipcRenderer.on('downloaderStart', (event, arg) => {
      this.$set(this.downloadList[arg.id], 'size', arg.total)
      this.$set(this.downloadList[arg.id], 'started', true)
    })
    electron.ipcRenderer.on('downloaderFinished', (event, arg) => {
      this.$set(this.downloadList[arg.id], 'finished', true)
    })
    electron.ipcRenderer.on('downloaderFailed', (event, arg) => {
      this.$set(this.downloadList[arg.id], 'error', arg.message)
    })
  },
  methods: {
    filesize (size) {
      return filesize(size)
    },
    addTask (filename, url) {
      electron.ipcRenderer.send('downloaderAddTask', {
        filename,
        url
      })
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
  overflow-y: auto;
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

.downloads {
  text-align: left;
  padding-top: 32px;
  font-family: Microsoft Yahei
}

.download-item {
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.download-item:hover {
  background-color: #888888;
  color: white;
}

.download-item:hover .filesize {
  color: #eeeeee !important;
}

.item-filename {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.progress {
  margin-top: 6px;
  height: 20px;
  width: 100%;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  background-color: rgb(250, 250, 250);
  text-align: center;
  color: black;
  margin-bottom: 4px;
}

.progress-text {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 1;
  font-size: 14px;
  color: black;
}

.progress-bar {
  background-color: lightgrey;
  height: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  transition: all 0.5s ease;
  z-index: 0;
}

.progress-bar.error {
  background-color: rgb(255, 140, 140);
}

.progress-bar.finish {
  background-color: rgb(72, 187, 80);
}

.filesize {
  font-size: 14px;
  color: #888888;
}
</style>
