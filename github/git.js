const moment = require('moment')
const throwError = require('./errors/throwError');
const gitLogConverter = require('./gitLogConverter');
const execute = require('./execute');

moment.suppressDeprecationWarnings = true;

const getCommits = async (path, count=null, hash=null) => {
  let commitLog;

  if (hash) {
    commitLog = await execute(`cd ${path} && git log -1 -U ${hash} --pretty`);
  } else {
    commitLog = (count) ? await execute(`cd ${path} && git log -n${count} --pretty`)
      : await execute(`cd ${path} && git log --pretty`);

  }
  return gitLogConverter(commitLog);
};

const formatGitDate = (date) => {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    throwError(new Error("DATE_INVALID"));
  }
  return momentDate.format('ddd MMM DD HH:mm:ss YYYY ZZ');
};

const changeDate = async (path, hash, authorDate, committerDate) => {
  try {
    const authorDateFormatted = formatGitDate(authorDate);
    const committerDateFormatted = formatGitDate(committerDate);

    return await execute(`cd ${path} && git filter-branch -f --env-filter \
    'if [[ $GIT_COMMIT = ${hash} ]]
     then
         export GIT_AUTHOR_DATE="${authorDateFormatted}"
         export GIT_COMMITTER_DATE="${committerDateFormatted}"
     fi; /bin/true'`);
  } catch (err) {
    return throwError(err);
  }
};

module.exports = { getCommits, formatGitDate, changeDate };