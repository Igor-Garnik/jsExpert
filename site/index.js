const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const users = require('./db.json').users;
server.use(middlewares)

//Custom route with login check, before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
    let adminUser = users[0];
    let user = users.find(item => item.login === req.body.login && item.password === req.body.password);
    if (user) {
        res.jsonp({ loginStatus: true })
    } else {
        res.jsonp({ loginStatus: false })
    }
})

server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})