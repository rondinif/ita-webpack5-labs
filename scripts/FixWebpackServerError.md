# webpack-dev-server per webpack-dev-server 
## problema 
``
[ita-webpack5-labs]$ npx webpack-dev-server --open --config src/lab-10/webpack.config.js --mode=development
Cannot find module 'webpack-cli/bin/config-yargs'
Require stack:
- /Users/ronda/projects/rondinif/ita-webpack5-labs/node_modules/webpack-dev-server/bin/webpack-dev-server.js
``

## Soluzione temporanea ( workaround )
``` sh
export ITA_WEBPACK4_LABS_MOD=~/projects/rondinif/ita-webpack4-labs/node_modules
export ITA_WEBPACK5_LABS_MOD=~/projects/rondinif/ita-webpack5-labs/node_modules
mkdir $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/config
mkdir $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/utils 
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/config/config-yargs.js $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/config 
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/config/optionsSchema.json $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/config 
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/config/webpackConfigurationSchema.json $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/config
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/utils/constants.js $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/utils  
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/utils/convert-argv.js $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/utils  
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/utils/prepareOptions.js $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/utils  
cp $ITA_WEBPACK4_LABS_MOD/webpack-cli/bin/utils/validate-options.js $ITA_WEBPACK5_LABS_MOD/webpack-cli/bin/utils  
npm i --save-dev findup-sync
# npx webpack-dev-server --open --config src/lab-10/webpack.config.js --mode=development
```

# Puntti di attenzione
`findup-sync` è stato installato solo a questo scopo, quindi va eliminato dalle dipendenze in package.json una volta che è stato risolto il problema  

# Altre cose interessanti provare che non hanno funzionato

- https://github.com/bigbizze/FixWebPackError-Cannot-find-module-webpack-cli-bin-config-yargs
``` py
import os
webpack_dev_server_path = "node_modules/webpack-dev-server/bin/webpack-dev-server.js"
if os.path.exists(webpack_dev_server_path):
    with open(webpack_dev_server_path, "r") as fp:
        data = fp.read()

    data = data.replace("require('webpack-cli/bin/config-yargs')(yargs);", "require('webpack-cli/bin/config/config-yargs')(yargs);")
    data = data.replace("const config = require('webpack-cli/bin/convert-argv')(yargs, argv, {", "const config = require('webpack-cli/bin/utils/convert-argv')(yargs, argv, {")

    with open(webpack_dev_server_path, "w") as fp:
        fp.write(data)
```        