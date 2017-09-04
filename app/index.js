import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import morgan from 'morgan'

import controller from "./controllers"

const app = express()

app.use(morgan('dev'))
app.set('secret', process.env.SECRET)
app.use(session({ secret: process.env.SECRET }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', controller)

app.use(function(err, req, res, next) {
  console.log("Error happens ", err.stack);
});


app.use(express.static(__dirname + '/build/'));
app.listen(process.env.PORT || 8000);

export default app
