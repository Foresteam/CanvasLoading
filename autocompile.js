const chokidar = require('chokidar');
const { spawn } = require('child_process');
const fs = require('fs');

console.log(fs.readdirSync('src').map(path => `src/${path}`));
const srcWatcher = chokidar.watch('src', { awaitWriteFinish: true });
srcWatcher.on('change', () => {
	spawn('pnpm', ['build']);
	console.log('\u001b[32mRecompiled\u001b[0m');
});
process.on('exit', () => srcWatcher.close());
process.on('SIGINT', process.exit);