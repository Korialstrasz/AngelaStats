const replace = require('replace-in-file');
const moment = require('moment');
const buildTime = new Date();
const buildVersion = 'Update: '+moment().format("DD.MM.YYYY kk:mm:ss")+'\'';
const options = {
  files: 'src/environments/environment.prod.ts',
  from: /Update:.*/g,
  to: buildVersion,
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(options);
  console.log('Build version set: ' + buildVersion);
}
catch (error) {
  console.error('Error occurred:', error);
}
