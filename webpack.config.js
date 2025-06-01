const path = require("path") // Módulo do Node para manipular caminhos de arquivos
const HTMLWebpackPlugin = require("html-webpack-plugin") // Plugin para gerar automaticamente o arquivo HTML que referencia o bundle
const { LoaderOptionsPlugin } = require("webpack") // Plugin do Webpack para opções de loaders (não usado aqui explicitamente)

module.exports = {
    // Ponto de entrada da aplicação (arquivo inicial)
    entry: path.resolve(__dirname, "src", "js", "index.js"),

    // Configuração de saída do bundle gerado
    output: {
        filename: "main.js", // Nome do arquivo final gerado
        path: path.resolve(__dirname, "dist") // Pasta onde o bundle será salvo
    },

    mode: "development", // Modo de desenvolvimento (não minifica, facilita debug)

    // Configuração do servidor de desenvolvimento
    devServer: {
        static: {
            directory: path.join(__dirname, "dist", "index.html"), // Pasta/arquivo para servir estático
        },
        port: 3000, // Porta onde o servidor rodará
        open: true, // Abre o navegador automaticamente
    },

    // Plugins usados pelo Webpack
    plugins: [
        new HTMLWebpackPlugin() // Gera um arquivo HTML básico e injeta o bundle automaticamente
    ],

    // Regras para carregar diferentes tipos de arquivos
    module: {
        rules: [
            {
                test: /\.css$/i, // Aplica para arquivos .css
                use: ["style-loader", "css-loader"], // Loaders para interpretar CSS e injetar no DOM
                exclude: "/node_modules", // Ignora arquivos dentro de node_modules
            },
            {
                test: /\.js$/i, // Aplica para arquivos .js
                use: {
                    loader: "babel-loader", // Usa Babel para transpilar JS moderno para compatível
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]] // Configuração do preset para definir quais ambientes suportar
                    }
                },
                exclude: "/node_modules", // Ignora node_modules para performance
            }
        ],
    },
}
