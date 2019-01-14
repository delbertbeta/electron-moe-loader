import request from './pixivRequest'
import urls from './urls'

// const nextPage = function () {

// }

const getListById = async function () {
  const instance = request.getInstance()
  instance.get(urls.illustByUserId(''))
}

// const expose = function () {

// }
