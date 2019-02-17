const _           = require('lodash');
const fs          = require('fs');
const CLI         = require('clui')
const Spinner     = CLI.Spinner;
const touch       = require('touch');
const chalk       = require('chalk');

const inquirer    = require('./inquirer');

module.exports = {
    createDockerFile: async () => {
      fs.writeFileSync('Dockerfile', ""); //create a black dockerfile
      const lang = await inquirer.askLanguage(); //ask the base image
      console.log(chalk.yellow('\nYour base image will be ' + lang.languages + '\n'));
      const confirm = await inquirer.askBaseConfirmation();
      
      if(confirm.confirm==="Yes" || confirm.confirm==="yes" || confirm.confirm==="y")
      {
        fs.writeFileSync('Dockerfile',"FROM " + lang.languages.toLowerCase()); //language the app written will be the base image
      }
      else
      {
        fs.writeFileSync('Dockerfile',"FROM " + confirm.confirm.toLowerCase()); //image specified will be the base image
      }

      const version = await inquirer.askVersion(); //ask base image version
      if(version.version==="")
      {
        fs.appendFileSync('Dockerfile',":latest"+"\n"); //version will be latest if user does not input anything
      }
      else
      {
        fs.appendFileSync('Dockerfile',":"+version.version+"\n"); //version the user specifies
      }

      const runCom = await inquirer.askForRunCommands(); //RUN commands
      var runArr = [];
      runArr = runCom.run.split(',').map(str => str.trim());
      for (let i = 0; i < runArr.length; i++) {
        fs.appendFileSync('Dockerfile', "RUN " + runArr[i] + "\n");
      }

      const workdir = await inquirer.askWRKDIR(); //ask for the working directory of the container
      fs.appendFileSync('Dockerfile',"WORKDIR "+workdir.WRKDIR+"\n");

      const envConfirmation = await inquirer.askEnvVarConf(); //ask whether the user need env vars
      if(envConfirmation.envConf==="yes" || envConfirmation.envConf==="Yes" || envConfirmation.envConf==="y")
      {
        var array = [];
        const envVar = await inquirer.askEnvVar();
        array = envVar.env.split(',').map(str => str.trim());
        for (let i = 0; i < array.length; i++) {
          fs.appendFileSync('Dockerfile', "ENV " + array[i] + "\n");
        }
      }
      
      
      const packConf = await inquirer.askForPackageInstallation(); //ask whether the user need packages to be installed
      if(packConf.packconf==="yes" || packConf.packconf==="Yes" || packConf.packconf==="y")
      {
        fs.appendFileSync('Dockerfile', 'RUN apt-get update && apt-get install -y \\' + "\n");
        var packageList = [];
        const packages = await inquirer.askForPackages();
        packageList = packages.packages.split(',').map(str => str.trim());
        var ss = "";
        for (let i = 0; i < packageList.length; i++) {
          ss += "\t" + packageList[i] + ' \\' + "\n";

        }
        ss = ss.slice(0, -3);
        fs.appendFileSync('Dockerfile', ss + "\n");
      }


      // App Specific dockerfile details need to be added here
      if(lang.languages==="Node")
      {
        fs.appendFileSync('Dockerfile', "COPY package*.json " + workdir.WRKDIR + "\n");
        fs.appendFileSync('Dockerfile', "RUN npm install\n");
      }

      fs.appendFileSync('Dockerfile', "COPY . " + workdir.WRKDIR + "\n");

      const port = await inquirer.askPort();
      fs.appendFileSync('Dockerfile', "EXPOSE " + port.port + "\n");

      const command = await inquirer.askCommand();
      var comArray = [];
      comArray = command.cmd.split(" ");
      var s = "[";
      let i;
      for (i = 0; i < comArray.length; i++) {
        s += '"' + comArray[i] + '"' + ", ";
      }

      if(comArray[i-=1]==="")
      {
        s = s.slice(0, -6);
      }
      else
      {
        s = s.slice(0, -2);
      }

      fs.appendFileSync('Dockerfile', "CMD " + s + "]" + "\n");
      },


      createDockerignore: async () => {
        const filelist = _.without(fs.readdirSync('.'), 'Dockerfile', 'index.js', '.dockerignore');
    
        if (filelist.length) {
          const answers = await inquirer.askIgnoreFiles(filelist);
          if (answers.ignore.length) {
            fs.writeFileSync( '.dockerignore', answers.ignore.join( '\n' ) );
          } else {
            touch( '.dockerignore' );
          }
        } else {
            touch('.dockerignore');
        }
      },


};