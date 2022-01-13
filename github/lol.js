var exec = require('child_process').exec;
var cmd = 'echo hello world';
exec(cmd, function(err, stdout, stderr) {
if (err) {
console.error(err);
return;
}
console.log(stdout); 
});