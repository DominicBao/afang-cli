// 通过 axios 处理请求
const axios = require('axios')

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList() {
  return axios.get('https://api.github.com/repos/DominicBao/simple-home-page/tags')
}

module.exports = {
  getTagList
}

