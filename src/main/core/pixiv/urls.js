export default {
  loginStart: 'https://accounts.pixiv.net/login?lang=zh&source=pc&view_type=page&ref=wwwtop_accounts_index',
  loginApi: 'https://accounts.pixiv.net/api/login?lang=zh',
  illustByUserId (id) {
    return `https://www.pixiv.net/member_illust.php?id=${id}`
  }
}
