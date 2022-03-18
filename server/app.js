const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { Server } = require('socket.io');
require('dotenv').config();

const http = require('http');
const nms = require('./mediaServer');

nms.run();

const indexRouter = require('./src/routes/index.router');
const usersRouter = require('./src/routes/users.router');

const app = express();
const HTTPServer = http.createServer(app);
const io = new Server(HTTPServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'ljkfhlksJHFK',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    name: process.env.COOKIE,
    store: new FileStore(),
  }),
);

app.use(cors());

// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000/'
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// app.use

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(err.status || 500).send(err.message);
  } else {
    next();
  }
});

const { onConnection } = require('./chat/index');

io.on('connection', (socket) => onConnection(socket, io));

const HTTP_PORT = process.env.HTTP_PORT || 3002;
HTTPServer.listen(3002, () => {
  console.log(`HTTPServer started on ${HTTP_PORT}`);
});

module.exports = HTTPServer;
