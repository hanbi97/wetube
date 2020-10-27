//can't use modern js
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");
const config ={
    entry:["@babel/polyfill",ENTRY_FILE], //to use babel
    mode:MODE,
    module:{
        //if find module, follow the rules below
        rules:[
            {
                test:/\.(js)$/,
                use: [
                    {
                        loader:'babel-loader'
                    }
                ]
            },
            {
                //find all the .scss -> translate to css
                // ->extract the css text -> send the css file
                //we should install all these loaders
                test: /\.(scss)$/,
                use: ExtractCSS.extract([//4th. extract pure css and send it somewhere
                    {
                        loader:"css-loader" //3rd. webpack can understand css
                    },
                    {
                        loader:"postcss-loader", // 2nd. transform css to solve compatible problem(ex. with i.e, prefix..)
                        options:{
                            plugins(){
                                return[autoprefixer({overrideBrowserslist:"cover 99.5%"})];
                            }
                        }
                    },
                    {
                        loader:"sass-loader" //1st. use plugin to translate sass|scss -> normal css
                    }
                ])
            }
        ]
    },
    output:{
        path:OUTPUT_DIR,
        filename:"[name].js"
    },
    plugins:[new ExtractCSS("styles.css")]    
};

module.exports=config;