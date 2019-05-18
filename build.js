const replace = require('replace-in-file');
const moment = require('moment');

const buildVersion = moment().format("DD.MM.YYYY hh:mm:ss");
const options = {
  files: 'dist/angelastats/main*',
  from: /%version%/g,
  to: buildVersion,
  allowEmptyPaths: false,
};

try {
  replace.sync(options);
  console.log('Build version set: ' + buildVersion);
} catch (error) {
  console.error('Error occurred:', error);
}
