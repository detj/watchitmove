#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cli = require('commander');
var pkg = require('./package');
var interval = 5007;

cli
  .version(pkg.version)
  .usage('[options]')
  .option('-w, --watch <file>', 'file to watch')
  .option('-o, --out [path]', 'path to move, default is cwd')
  .option('-i, --interval <msec>', 'watch interval, default is 5007 msec')
  //.option('-p, --prefix', 'prefix for filename')
  //.option('-s, --suffix', 'suffix for filename')
  .parse(process.argv);

if (!cli.watch) exit('Need file to watch');

// out is current working directory by default
if (!cli.out) cli.out = process.cwd();

// set custom interval
if (parseInt(cli.interval, 10)) interval = cli.interval;

watchit(cli.watch, interval);

/**
 * Log error & quit the process
 */
function exit(msg) {
  msg = msg || 'Error';
  console.error(msg);
  process.exit(1);
}

/**
 * Callback for watch event
 */
function onwatch(ev, filename) {
  log("%s changed", cli.watch);
  move(cli.watch, path.resolve(cli.out, Date.now() + '-' + path.basename(cli.watch)));
}

/**
 * Helper to start watching a file
 */
function watchit(file, interval) {
  log("watching %s", file);
  fs.unwatchFile(file);
  fs.watchFile(file, { persistent: true, interval: interval }, onwatch);
}

/**
 * Helper to move the file
 */
function move(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

/**
 * Helper to log
 */
function log(str) {
  var args = [].slice.call(arguments, 0);
  args.unshift("%s - " + args.shift(), new Date().toGMTString());
  console.log.apply(console, args)
}
