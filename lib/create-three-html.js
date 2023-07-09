const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = async function () {
  inquirer.prompt([
    {
      type: 'input', //type： input, number, confirm, list, checkbox ... 
      name: 'name', // key 名
      message: chalk.cyan('name'), // 提示信息
      default: 'three-html' // 默认值
    }
  ]).then(answers => {
    // 模版文件目录
    const destUrl = path.join(__dirname, '../templates/three'); 
    // 生成文件目录
    // process.cwd() 对应控制台所在目录
    const cwdUrl = process.cwd();
    // 从模版目录中读取文件
    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 使用 ejs 渲染对应的模版文件
        // renderFile（模版文件地址，传入渲染数据）
        if (file === 'threejs') {
          fs.mkdir('threejs', (err) => {
            if(err) throw err; // 如果出现错误就抛出错误信息
            const threeDestUrl = path.join(__dirname, '../templates/three/threejs')
            fs.readdir(threeDestUrl, (err, threeFiles) => {
              if (err) throw err;
              threeFiles.forEach((threeFile) => {
                ejs.renderFile(path.join(threeDestUrl, threeFile), answers).then(data => {
                  // 生成 ejs 处理后的模版文件
                  fs.writeFileSync(path.join(cwdUrl + '/threejs', threeFile) , data)
                })
              })
            })
        })
        } else {
          ejs.renderFile(path.join(destUrl, file), answers).then(data => {
            // 生成 ejs 处理后的模版文件
            fs.writeFileSync(path.join(cwdUrl, file) , data)
          })
        }
        
      })
    })
  })
}
