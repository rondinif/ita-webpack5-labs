# 
vedere anche: src/lab-pug-04/README-HtmlWebpackPlugin.md


# 
citando [test-webpack-5-compatibility](https://webpack.js.org/migrate/5/#test-webpack-5-compatibility):
``` js
module.exports = {
  // ...
  node: {
    Buffer: false,
    process: false
  }
};
```
in `webpack 5` non avremo più `process` a disposizione in quanto si perde la dipendenza da [node-libs-browser](https://www.npmjs.com/package/node-libs-browser) che ad oggi è deprecata. 


## utilizzo di `node-libs-browser` e `process` da parte di `webpack 4.x`
[ita-webpack4-labs:package-lock.json](https://raw.githubusercontent.com/rondinif/ita-webpack4-labs/master/package-lock.json)
```
...
"webpack": {
      "version": "4.2.1"
      "requires": {
...
        "node-libs-browser": "^2.2.1",      
...
    "node-libs-browser": {
...
      "requires": {
...
        "process": "^0.11.10",

```

## impatti di questo cambiamento dal lato pratico
se in `src/lab-pug-03/src/index.js` lasciasssimo:
``` js
console.log(`process.env:\n${JSON.stringify(process.env)}`);
```
otterremmo questo errore: `ReferenceError: Can't find variable: process`
visibile solo nella console del browser,
inoltre l'esecuzione dello script nel browser si iterromperebbe 
e perderemmo l'effetto prodotta sulla pagina
dalla esecuzione delle istruzioni successive











