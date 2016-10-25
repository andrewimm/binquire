#! /usr/bin/env node
const binquire = require('../lib/binquire');
const fs = require('fs');

const args = process.argv.slice(2);
let instream = null;
let outstream = null;
let type = null;
for (let arg of args) {
  if (arg.startsWith('--')) {
    // Option
    if (arg === '--hex') {
      if (type === null) {
        type = 'hex';
      } else {
        console.error('Error: Can only specify one output type. --hex conflicts with --' + type);
        process.exit(1);
      }
    } else if (arg === '--array') {
      if (type === null) {
        type = 'array';
      } else {
        console.error('Error: Can only specify one output type. --array conflicts with --' + type);
        process.exit(1);
      }
    }
  } else if (instream === null) {
    instream = fs.createReadStream(arg, {flags: 'r'});
  } else if (outstream === null) {
    outstream = fs.createWriteStream(arg, {
      flags: 'w',
      encoding: 'utf8',
    });
  } else {
    // ignore
  }
}

if (!instream) {
  instream = process.stdin;
}
if (!outstream) {
  outstream = process.stdout;
}

const chunks = [];
let totalLength = 0;
instream.on('data', (chunk) => {
  chunks.push(chunk);
  totalLength += chunk.length;
});
instream.on('end', () => {
  const complete = Buffer.concat(chunks, totalLength);
  const outString = binquire(complete, {type});
  outstream.write(outString, 'utf8', () => {
    if (outstream !== process.stdout) {
      outstream.end();
    }
  });
});