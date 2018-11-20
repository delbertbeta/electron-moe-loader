const getProxy = function (that, callback) {
  let ses = that.$electron.remote.getCurrentWindow().webContents.session
  ses.resolveProxy('https://pixiv.com', (proxy) => {
    if (proxy === 'DIRECT') {
      callback(null)
    } else {
      callback(proxy.substring(proxy.indexOf(' ') + 1))
    }
  })
}

export default {
  getProxy: getProxy
}
