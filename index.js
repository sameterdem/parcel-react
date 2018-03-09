#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const newProject = require('./src/newProject');

const ARGV = process.argv[2];
const NAME_CONTROL = /^([A-Za-z\-_\d])+$/.test(ARGV) && ARGV !== undefined;
const CURR_DIR = process.cwd();
const NEW_PROJECT_PATH = path.resolve(CURR_DIR, ARGV);

// Project name control
if (NAME_CONTROL) {
  // Project Exists
  if (!fs.existsSync(NEW_PROJECT_PATH)) {
    newProject(ARGV);
  } else {
    console.log(chalk.red(`There is already a project called ${ARGV}`));
  }
} else {
  console.log(chalk.red('Project name may only include letters, numbers, underscores and hashes.'));
}

