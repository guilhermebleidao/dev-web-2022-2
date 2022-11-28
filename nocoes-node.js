// Importando
const http = require('http')
const path = require('path')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

// Criando o servidor -> executa em loop (a cada nova requisição, uma callback nova é chamada)
const server = http.createServer(function(req, res){

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

    //Parsing payload -> chega em forma de stream
    let decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', function(data){
        buffer += decoder.write(data) // "juntando" os dados do stream
    })
    req.on('end', function(){
        buffer += decoder.end()

        let handlerEscolhido = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        handlerEscolhido(data, function(statusCode, payload) {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200

            payload = typeof(payload) == 'object' ? payload : {}

            let payloadString = JSON.stringify(payload) // payload que o handler envia para o usuário

            res.writeHead(statusCode)
            
            res.end(payloadString)
            
            console.log('Retornando: ' + statusCode, payloadString)
        })

        
    })

})

// Inicializando o servidor
server.listen(3000, function(){
    console.log('Ouvindo')
})

let handlers = {}

handlers.teste = function(data, callback) {
    callback(406, {'name': 'handler teste'})
}

handlers.notFound = function(data, callback) {
    callback(404)
}


var router = {
    'teste' : handlers.teste
}