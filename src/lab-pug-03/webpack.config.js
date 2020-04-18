const webpack = require('webpack');
const path = require('path');
const DotenvFlow = require('dotenv-flow-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-pug-03';

const PATHS = {
	src: path.join(__dirname, 'src'),
	// dist: path.join(__dirname, 'dist')
};

console.log(PATHS.src);
// console.log(PATHS.dist);

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`),
  },
  module: {
      rules: [
        {
          test: /\.pug$/,
          use: [{
            loader: 'pug-loader',
            options: {  
            query: { doctype: 'pug', options: {
              data: {
                hello: 'Hello World',
                getUsername: function() {
                  return "ronda";
                }
              }              
            }} , /*
						query: { doctype: 'pug', plugins: [{
							codeGen () {
							    return 'function template() {\nreturn \'superronda\'\n}';
							},
						},
						{
							preCodeGen(ast) {
								return myPugLoaderPlugin(ast);
							}
						}					
						]},*/
					}}]
        } 
      ],
    },
  plugins: [
      new DotenvFlow({
        default_node_env: 'development',
        path: `./src/${exampleId}/config`,
        system_vars: true,
        silent: false
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PHYTOJS_API_SERVICE_URL': JSON.stringify(process.env.PHYTOJS_API_SERVICE_URL),
        'process.env.VERNACULAR_NAME': JSON.stringify(process.env.VERNACULAR_NAME)
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: `${exampleId}`,
        chunksSortMode: "none" ,
        template: PATHS.src + '/index.pug',
        inlineSource: '.(js|css)',
        templateParameters: {
          foo: () => 'bar',
          some: 'value'
        }
      }),
    ],  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`)
  }  
};