const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const http = require('http');
const FileStore = require('session-file-store')(session);
const { Server } = require('socket.io');
const nms = require('./src/mediaServer');
require('dotenv').config();

nms.run();

const indexRouter = require('./src/routes/index.router');
const usersRouter = require('./src/routes/users.router');
const streamsRouter = require('./src/routes/streams.router');
const messagesRouter = require('./src/routes/messages.routes');
const streamkeysRouter = require('./src/routes/streamkeys.router');
const tagsRouter = require('./src/routes/tags.router');
const likesRouter = require('./src/routes/likes.router');
const commentsRouter = require('./src/routes/comments.router');

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
    expires: new Date(Date.now() + 5 * 86400 * 1000),
  })
);

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/streams', streamsRouter);
app.use('/api/keys', streamkeysRouter);
app.use('/api/tags', tagsRouter);
app.use('/messages', messagesRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    const errObj = {};
    errObj.name = err.name;
    errObj.status = err.status || 500;
    errObj.message = err.message;
    if (err.stack) {
      errObj.stack = err.stack;
    }
    console.log(err);
    res.status(errObj.status).json(errObj);
  } else {
    next();
  }
});

const { onConnection } = require('./chat/index');

io.on('connection', (socket) => onConnection(socket, io));

const HTTP_PORT = process.env.HTTP_PORT || 3002;
HTTPServer.listen(HTTP_PORT, () => {
  console.log(`HTTPServer started on ${HTTP_PORT}`);
});

module.exports = HTTPServer;
