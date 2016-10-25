module.exports = function binquire(data, options) {
  if (!data instanceof Buffer) {
    throw new TypeError('data argument of binquire() must be a Buffer object');
  }
  if (!options) {
    options = {};
  }
  const type = options.type || 'base64';
  let bin;
  switch(type) {
    case 'base64':
      bin = '"' + data.toString('base64') + '"';
      break;
    case 'hex':
      bin = '"' + data.toString('hex') + '"';
      break;
    case 'array':
      const bytes = [];
      for (let b of data) {
        bytes.push(b);
      }
      bin = '[' + bytes.join(',') + ']';
      break;
  }
  return 'module.exports=' + bin + ';';
}