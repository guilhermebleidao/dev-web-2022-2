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
    let httpMethod = req.method.toUpperCase()    

    // Parsing query string
    let queryString = parsedUrl.query

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
        res.end('Response')
        
        console.log(buffer)
    })

})

// Inicializando o servidor
server.listen(3000, function(){
    console.log('Ouvindo')
})