const inquirer = require('inquirer');

module.exports = {

    //ask the language the app is written for the base image
    askLanguage: () => {
        const languages = [
            {
                type: 'list',
                name: 'languages',
                message: 'Select the language your app is written : ',
                choices: ["Node", "PHP", "Ruby", "Java", "Python", "Go"]
            }
        ];
        return inquirer.prompt(languages);
    },

    //ask if the user want the app written base image or not
    askBaseConfirmation: () => {
        const confirm = [
            {
                type: 'input',
                name: 'confirm',
                message: 'Type Yes to confirm. Specify the Base Image you want if not :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter yes or the base image you want';
                    }
                }
            }
        ];
        return inquirer.prompt(confirm);
    },

    //ask base image version
    askVersion: () => {
        const version = [
            {
                type: 'input',
                name: 'version',
                message: 'Specify the version of the base image. Keep blank for latest version :',
            }
        ];
        return inquirer.prompt(version);
    },

    //ask the working directory
    askWRKDIR: () => {
        const WRKDIR = [
            {
                type: 'input',
                name: 'WRKDIR',
                message: 'Specify the Working Directory in the Container (eg: /app):',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the working directory';
                    }
                }
            }
        ];
        return inquirer.prompt(WRKDIR);
    },

    //ask whether the user needs env vars or not
    askEnvVarConf: () => {
        const envConf = [
            {
                type: 'input',
                name: 'envConf',
                message: 'Do you want any environmental variables to store? (y/n) :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please type yes or no';
                    }
                }
            }
        ];
        return inquirer.prompt(envConf);
    },

    //ask for env vars
    askEnvVar: () => {
        const env = [
            {
                type: 'input',
                name: 'env',
                message: 'Enter the Environmental variables separated by commas :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the environmental variables';
                    }
                }
            }
        ];
        return inquirer.prompt(env);
    },

    //ask the port the app container needs to be exposed
    askPort: () => {
        const port = [
            {
                type: 'input',
                name: 'port',
                message: 'Enter the port that need to be exposed :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the exposing port';
                    }
                }
            }
        ];
        return inquirer.prompt(port);
    },

    //ask for run commands
    askCommand: () => {
        const command = [
            {
                type: 'input',
                name: 'cmd',
                message: 'Enter the command you want to execute once the container is up :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the command';
                    }
                }
            }
        ];
        return inquirer.prompt(command);
    },

    //ask confirmation for packages to be installed
    askForPackageInstallation: () => {
        const paconf = [
            {
                type: 'input',
                name: 'packconf',
                message: 'Do you have any packages that need to be installed? (y/n):',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter yes or no';
                    }
                }
            }
        ];
        return inquirer.prompt(paconf);
    },

    //ask the packages
    askForPackages: () => {
        const packages = [
            {
                type: 'input',
                name: 'packages',
                message: 'Specify the packages you want to install separated by commas :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the packages';
                    }
                }
            }
        ];
        return inquirer.prompt(packages);
    },

    //ask for run commands
    askForRunCommands: () => {
        const run = [
            {
                type: 'input',
                name: 'run',
                message: 'Enter the commands other that app installations that need to be executed separated by commas. Keep black if not :',
            }
        ];
        return inquirer.prompt(run);
    },

    //ask dockerignore files
    askIgnoreFiles: (filelist) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders you wish to ignore:',
                choices: filelist,
                default: ['node_modules', 'bower_components', '.git', '.gitignore']
            }
        ];
        return inquirer.prompt(questions);
    },

};
