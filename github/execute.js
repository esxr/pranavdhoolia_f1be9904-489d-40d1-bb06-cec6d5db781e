const childProcess = require('child_process');

module.exports = command => new Promise((resolve, reject) => {
  childProcess.exec(command, (err, out) => {
    if (err) {
      return reject(err);
    }

    return resolve(out);
  });
});
