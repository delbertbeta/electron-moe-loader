import urls from './urls'
// import request from 'request-promise-native'
import axios from 'axios'
import cheerio from 'cheerio'
import tough from 'tough-cookie'

/**
 * To login Pixiv with specified username and password.
 *
 * @param {string} username The username of Pixiv.
 * @param {string} password The password of Pixiv.
 * @returns {cookieObj} the obj contains set-cookie info.
 */
const login = async function (username, password) {
  // const myRequest = request.defaults({
  //   proxy: proxy,
  //   resolveWithFullResponse: true
  // })
  const loginStartPage = await axios.get(urls.loginStart)
  let $ = cheerio.load(loginStartPage.data)
  const initConfig = JSON.parse($('#init-config').val())
  const postKey = initConfig['pixivAccount.postKey']
  const cookies = loginStartPage.headers['set-cookie'].map(tough.Cookie.parse)
  let obj = {}
  let cookieStr = ''
  cookies.forEach((c) => {
    cookieStr += `${c.key}=${c.value}; `
    obj[c.key] = c.value
  })
  const loginResult = await axios.post(urls.loginApi, {
    'pixiv_id': username,
    'captcha': '',
    'g_recaptcha_response': '',
    'password': password,
    'post_key': postKey,
    'source': 'pc',
    'ref': 'wwwtop_accounts_index',
    'return_to': 'https://www.pixiv.net/'
  }, {
      headers: {
        'Accept': 'application/json',
        'Origin': 'https://accounts.pixiv.net',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://accounts.pixiv.net/login?lang=zh&source=pc&view_type=page&ref=wwwtop_accounts_index',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
        'Connection': 'keep-alive',
        'Cookie': cookieStr
      }
    })
  loginResult.headers['set-cookie'].map(tough.Cookie.parse).forEach((c) => {
    obj[c.key] = c.value
  })
  return obj
}

export default {
  getLoginResult: login
}
