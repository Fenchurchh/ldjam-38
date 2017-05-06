// check out the .babelrc. some of the following config is not working 100%
module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        path: "/dist",
        publicPath: "/assets/",
        library: ["[name]"],
        filename: "[name].dist.js"
    },
    devServer: {
        inline: true,
        contentBase: "public/"
    },
    devtool: 'inline-source-map'
}
