const Nuxt = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const axios = require('axios')
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const { isRealString } = require('./utils/validation')
const { getJDEAvailability } = require('./JDE/jde')
const { User } = require('./models/user')
var { mongoose } = require('./db/mongoose')

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
    .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    })
}

var jdeUser = null

User.find().then((users) => {
    jdeUser = users[0];
}, (e) => {
    console.log(e);
})

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
io.on('connection', (socket) => {
  console.log('New user connected')
  console.log('JDE user info to be user', jdeUser)
  socket.on('getAvailabilityData', function () {
    console.log('getAvailabilityData called by client')
    // var itemAvailabilityData = {
    //   itemNames: ['Item Z', 'Item Y', 'Item X', 'Item W', 'Item V'],
    //   itemAvailableNos: [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)]
    // };
    // socket.emit('updateAvailabilityData', itemAvailabilityData);
    getJDEAvailability(socket, jdeUser)
  });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
