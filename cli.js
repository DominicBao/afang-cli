#! /usr/bin/env node
const chalk = require('chalk')
const program = require('commander')

program
  .version(`v${require('./package.json').version}`)
  .command('create-react')
  .description(chalk.green('create a new react project'))
  .action(() => { 
    // 打印命令行输入的值
    require('./lib/create-react-project.js')()
  })

// 创建一个3s的loading
program
  .command('loading')
  .description(chalk.green('loading 3s'))
  .action(() => { 
    require('./lib/loading.js')()
  })

// node脚手架编写环境
program
  .command('node-cli')
  .description(chalk.green('node脚手架安装环境'))
  .action(() => { 
    require('./lib/node-cli.js')()
  })

// 创建一个three-html模版
program
  .command('create-three-html')
  .description(chalk.green('create a new three html'))
  .action(() => { 
    require('./lib/create-three-html.js')()
  })

// 看看logo
program
  .command('logo')
  .description(chalk.green('see see logo'))
  .action(() => { 
    require('./lib/logo.js')()
  })

program.parse()