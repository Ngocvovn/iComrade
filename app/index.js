import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import ioWrapper from 'socket.io'
import morgan from 'morgan'
import http from 'http'

import controller from "./controllers"
import { mainHandler } from './socket'
import { checkAuthSocket } from './middlewares/authMiddleware'

const app = express()
const httpWrapper = http.Server(app)
const io = ioWrapper(httpWrapper)

app.use(morgan('dev'))
app.set('secret', process.env.SECRET)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use('/api', controller)

app.get('/', (req, res) => {
	res.render('index')
})

app.use(function(err, req, res, next) {
  console.log("Error happens ", err.stack);
});

let queue = [];

io.use(checkAuthSocket);
io.on('connection', mainHandler(io));



app.use('/public', express.static(__dirname + '/views/'))

const PORT = process.env.PORT || 8000; 

httpWrapper.listen(PORT, _ => {
  console.log('listening on *:' + PORT);
});

export default httpWrapper


