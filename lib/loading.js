const ora = require('ora')
const chalk = require('chalk')

module.exports = async function () {
  const spinner = ora(chalk.green('start loading'));
  spinner.start();
  setTimeout(() => {
    spinner.color = 'red';
    spinner.text = chalk.red('start loading222');
    setTimeout(() => {
      spinner.stop()
      spinner.succeed('Loading succeed');
      // spinner.fail('Loading fail')
      // spinner.warn('Loading warn')
      // spinner.info('Loading info')

    }, 5000)
  }, 5000)
}
