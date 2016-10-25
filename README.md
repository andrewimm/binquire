# binquire - convert binary files to require-able JS files

`binquire` is a command-line utility (and underlying library) that takes binary files and encodes them as CommonJS modules. It can encode binary data as base64 strings (the most compact option), hex strings, or an array of numeric bytes. It produces a file with the format:

```js
module.exports=BINARY;
```

where `BINARY` is the selected binary representation of your data.

For example, exporting a file in base64 format might result in the following output:

```js
module.exports="aGVsbG8sIHdvcmxkCg==";
```

## Installation

To use `binquire` as a command line tool, install it via `npm install -g binquire`

To use `binquire` locally as part of your project, install it as a dependency via `npm install --save binquire`

## Command-line Usage

After installing `binquire`, you will have a binary of the same name available on your machine. The `binquire` binary is used in the following way:

```
binquire infile [outfile] [options]
```
where `infile` is the name of the binary file you wish to convert, `outfile` is the optional name of the output JavaScript file, and `options` are any of the available configuration options. If no `outfile` is specified, it will be sent to stdout. The default output format is a base64 string.

Supported options are:
* `--hex` - Output as a hex string.
* `--array` - Output as an array of numeric bytes.

So to output `image.png` to `image-hex.js`, in hex-string format, you would use the following command:

```
binquire image.png image-hex.js --hex
```

## API Usage
`require('binquire')` also exports the core functionality as a programmable API. It exports a single function:

### `binquire(data, options)`
`data` is a Node.js `Buffer` object containing the binary data you want to export.

`options` is an optional configuration object supporting the following keys:

* `type` - The type of export format, supporting the following values:
  * `base64` (default) - Encodes the data as a base64 string
  * `hex` - Encodes the data as a hex string
  * `array` - Encodes the data as a numeric array of bytes
