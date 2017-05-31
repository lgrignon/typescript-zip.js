# TypeScript 2 + ES 6 + zip.js example

Shows how to zip.js in TypeScript using ES6 modules and webpack. The same could be used without module / webpack by simply taking the code out of the `ZipExtractor.ts` file

NB: babel + babel-polyfill is used for async/await backward compatibility, you could just choose es2015 target and run in a modern browser

## Prerequisits
```
npm install -g webpack@2.6.1
```

## Build
```
npm install
webpack --progress --watch
```
Check that the `js/index.js` has correctly been generated.

## Test it
Open index.html in your browser and check unzip
If you run it without web server, you have to enable loading from a file url, for chrome:
chrome.exe --allow-file-access-from-files
