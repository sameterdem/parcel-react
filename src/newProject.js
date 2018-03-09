const fs = require('fs-extra');
const process = require('process');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const { Spinner } = require('cli-spinner');

const spn = new Spinner('Installing dependencies, please wait. %s');


// Run Exec
const run = (cmd, projectName) => {
  spn.start();
  exec(cmd, (error, stdout, stderr) => {
    if (stderr !== null) {
      console.log(`${stderr}`);
      spn.stop();
    }
    if (stdout !== null) {
      console.log(`${stdout} \n Start your project: \n\n ${chalk.cyan('cd')} ${projectName} \n\n ${chalk.cyan('npm start')}\n\n`);
      spn.stop();
    }
    if (error !== null) {
      console.log(`${error}`);
      spn.stop();
    }
  });
};

const newProject = (projectName) => {
  const projectPath = String(process.cwd());
  const projectSource = path.join(__dirname, './bundler');
  const projectDestination = path.resolve(projectPath, projectName);

  // Copy project files
  fs.copy(projectSource, projectDestination, (err) => {
    if (err) {
      console.log(chalk.red('An error occured while copying the folder.'));
      return console.error(err);
    }
    const packageFile = path.resolve(projectPath, projectName, 'package.json');
    // Read package file
    fs.readFile(packageFile, (err,data) => {
      if (err) return console.log(err);
      let packageContent = JSON.parse(data);
      packageContent.name = projectName;
      packageContent = JSON.stringify(packageContent, null, 2);
      // Read new package file
      fs.writeFile(packageFile, packageContent, (err) => {
        if (err) return console.log(err);
      });
    });
    console.log(chalk.blue(`\nSuccessfully created a new project at ${projectName}\n`));
    // Install dependencies && devDependencies
    run(`cd ${projectName} && npm install`, projectName);
  });
};

module.exports = newProject;
