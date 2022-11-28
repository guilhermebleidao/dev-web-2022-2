const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const Roteador = require('./Roteador.js')

class Servidor {

    constructor(porta) {
        this.httpServer = http.createServer(function(req, res) {
            // Parsing url
            let parsedUrl = url.parse(req.url, true)
            let path = parsedUrl.pathname
            let trimmedPath = path.replace(/^\/+|\/+$/g,'')

            // Parsing http method
            let method = req.method.toUpperCase()    

            // Parsing query string
            let queryStringObject = parsedUrl.query

            // Parsing headers
            let headers = req.headers

            //Parsing payload
            let decoder = new StringDecoder('utf-8')
            let buffer = ''
            req.on('data', function(data){
                buffer += decoder.write(data)
            })
            req.on('end', function(){
                buffer += decoder.end()

                let data = {
                    'trimmedPath': trimmedPath,
                    'queryStringObject': queryStringObject,
                    'method': method,
                    'headers': headers,
                    'payload': buffer
                }

                let rota = Roteador.getHandler(trimmedPath)
                
                rota(data, function(statusCode, payload) {
                    statusCode = typeof(statusCode) == 'number' ? statusCode : 200

                    payload = typeof(payload) == 'object' ? payload : {}

                    let payloadString = JSON.stringify(payload) // payload que o handler envia para o usuário

                    res.writeHead(statusCode)
                    
                    res.end(payloadString)
                    
                    console.log('Retornando: ' + statusCode, payloadString)
                })

                
            })
        })

        this.httpServer.listen(porta, function() {
            console.log('Servidor ouvindo na porta', porta)
        })
    }


}

module.exports = Servidor