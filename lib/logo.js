const ora = require('ora')
const chalk = require('chalk')
const figlet = require('figlet')

module.exports = async function () {
  console.log('\r\n' + figlet.textSync('aFang', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));
}
