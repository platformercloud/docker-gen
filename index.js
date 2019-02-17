#!/usr/bin/env node

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');

const build       = require('./lib/build');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('DockGen', { horizontalLayout: 'full' })
  )
);
console.log(chalk.green('Run DockGen on your app folder and generate the dockerfile !!\n'));

const run = async () => {

    try {      
        await build.createDockerFile();  
        await build.createDockerignore();
    } catch(err) {
        if (err) {
          console.log(err);
        }
    }
}

run();
