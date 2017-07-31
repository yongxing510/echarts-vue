/**
 *
 * Created by yongxing.liu on 2017/6/31.
 */
var ora = require('ora')
var rm = require('rimraf')
var fs = require('fs');
var chalk = require('chalk')
// var render = require('json-templater/string');
// var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;
var webpack = require('webpack');
var webpackConfig = require('./webpack.dist.conf')
var config = require('../config')

var spinner = ora('building for production...')
spinner.start()

rm(config.build.bundleRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
    
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

// var config = require('../config');
// var Components = require('../components.json');
//
// var OUTPUT_PATH = config.build.assetsRoot;
//
//
// var ComponentNames = Object.keys(Components);
//
// var includeComponentTemplate = [];
// var installTemplate = [];
// var listTemplate = [];
//
// ComponentNames.forEach(name => {
//   var componentName = uppercamelcase(name);
//
//   includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
//     name: componentName,
//     package: name
//   }));
//
// });
//
// var template = render(MAIN_TEMPLATE, {
//   include: includeComponentTemplate.join(endOfLine),
//   install: installTemplate.join(',' + endOfLine),
//   version: process.env.VERSION || require('../../package.json').version,
//   list: listTemplate.join(',' + endOfLine)
// });
//
// fs.writeFileSync(OUTPUT_PATH, template);

// console.log('[dist entry] DONE:', OUTPUT_PATH);

