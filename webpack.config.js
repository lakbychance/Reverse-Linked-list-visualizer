const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin"
)
module.exports={
    entry:["@babel/polyfill",path.join(__dirname,'/src/index.js')],
    devServer:{
        port:4000
    }
,
    output:{
filename:'bundle.js',
path:path.join(__dirname,'dist')

    },
    
    module:
    {
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'/src/index.html')
        })
    ]
}