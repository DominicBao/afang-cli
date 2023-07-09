const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const util = require('util')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const { getTagList } = require('./common/server')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 讲downloadGitRepo promise化
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取所有tags
  async getTag() {
    const tags = await wrapLoading(getTagList, 'waiting fetch tag');
    if (!tags) return;
    
    // 过滤我们需要的 tag 名称
    const tagsList = tags?.data?.map(item => item.name);

    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project'
    })

    // 3）return 用户选择的 tag
    return tag
  }

  // 下载远程模板
  async download(tag){
    // 1）拼接下载地址
    const requestUrl = `DominicBao/simple-home-page${tag?'#'+tag:''}`;

    console.log(requestUrl, path.resolve(process.cwd(), this.targetDir), 'ssss');
    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download project', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  async create(){
    const tag = await this.getTag()
    console.log('用户选择了tag='+ tag)
    this.download(tag)
  }
}

module.exports = async function () {
  inquirer.prompt([
    {
      type: 'input', //type： input, number, confirm, list, checkbox ... 
      name: 'name', // key 名
      message: chalk.cyan('请输入要创建的文件夹名：'), // 提示信息
      default: 'afang-react-project' // 默认值
    }
  ]).then((data) => {
    const name = data?.name || 'afang-react-project'
    // 当前命令行选择的目录
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetAir = path.join(cwd, name)

    const generator = new Generator(name, targetAir);
    generator.create()
  })
  
  
}