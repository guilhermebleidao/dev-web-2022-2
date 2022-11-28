notFound = function(data, callback) {
    callback(404)
}

teste = function(data, callback) {
    callback(200, {'name': 'teste'})
}

rotas = {
    'teste' : teste
}

function getHandler(path) {
    return typeof(rotas[path]) !== 'undefined' ? rotas[path] : notFound
}

module.exports.getHandler = getHandler;