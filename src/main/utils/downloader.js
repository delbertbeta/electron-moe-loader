import { ipcMain } from 'electron'
import hat from 'hat'
import axios from 'axios'
import fs from 'fs'

const task = {}

const init = (mainWindow) => {
  ipcMain.on('downloaderAddTask', (event, arg) => {
    const id = hat()
    const source = axios.CancelToken.source()
    task[id] = {
      source: source,
      id: id
    }
    axios.get(arg.url, {
      cancelToken: source.token,
      responseType: 'stream'
    }).then((response) => {
      let progress = 0
      const writeStream = fs.createWriteStream(arg.filename)
      response.data.on('data', (chunck) => {
        progress += chunck.length
      })
      let timer = setInterval(() => {
        mainWindow.webContents.send('downloaderProgress', {
          id: id,
          loaded: progress
        })
      }, 1000)
      writeStream.on('finish', () => {
        mainWindow.webContents.send('downloaderFinished', {
          id: id
        })
        clearInterval(timer)
      })
      mainWindow.webContents.send('downloaderStart', {
        id: id,
        total: response.headers['content-length']
      })
      response.data.pipe(writeStream)
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('Request canceled: ' + id)
      } else {
        let message = ''
        if (e.response) {
          switch (e.response.status) {
            case 404:
              message = '请求的文件不存在'
              break
            default:
              message = '未知错误'
          }
        } else {
          message = '无法连接到服务器'
        }
        mainWindow.webContents.send('downloaderFailed', {
          id: id,
          message: message
        })
      }
    })
    event.sender.send('downloaderCreated', {
      id: id,
      filename: arg.filename
    })
  })

  ipcMain.on('downloaderCancel', (event, arg) => {
    task[arg].source.cancle()
    task[arg] = undefined
  })
}

export default {
  init: init
}
