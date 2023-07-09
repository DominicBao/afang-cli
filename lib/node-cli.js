const ora = require('ora')
const chalk = require('chalk')
const spawn = require('cross-spawn');

module.exports = async function () {
  // 定义需要按照的依赖
  const dependencies = ['chalk@4.0.0', 'commander@11.0.0', 'ejs@3.1.9', 'inquirer@8.0.0', 'ora@5.0.0', 'cross-spawn@7.0.3'];
  // 执行安装
  const child = spawn('npm', ['install', '--save'].concat(dependencies), { 
    stdio: 'inherit' 
  });

  const spinner = ora(chalk.green('开始安装'));
  spinner.start();

  // 监听执行结果
  child.on('close', function(code) {
    spinner.stop()
    // 执行失败
    if(code !== 0) {
      spinner.fail('Error occurred while installing dependencies!')
      process.exit(1);
    }
    // 执行成功
    else {
      spinner.succeed(chalk.cyan('Install finished'));
    }
  })
}