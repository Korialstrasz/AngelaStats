const execa = require('execa');
const replace = require('replace-in-file');

(async () => {
  const {stdout} = await execa('git', ['log', '--pretty=%B %ad %n', '--date=format:%d.%m.%Y %H:%M:%S']);
  let messages = stdout.split('\n\n').filter(message => message.startsWith('[STATS]')).slice(0, 3).map(rawMessage =>{
    let messageParts = rawMessage.split('\n');
    return {date:messageParts[messageParts.length-1].trim(),messageText:messageParts.splice(1,messageParts.length-2)};
  });

  const options = {
    files: 'dist/angelastats/main*',
    from: /"%changelog%"/g,
    to: JSON.stringify(messages),
    allowEmptyPaths: false,
  };

  try {
    replace.sync(options);
    console.log('Build changelog set: ' + JSON.stringify(messages));
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
