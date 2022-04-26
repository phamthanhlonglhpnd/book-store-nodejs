import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cookieParser from 'cookie-parser';
let cors = require('cors');

const corsConfig = {
    credentials: true,
    origin: true,
};

require("dotenv").config();

let app = express();

app.use(cookieParser());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT, process.env.URL_VUE, process.env.URL_ADDRESS);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type', 'x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // set cookie
    res.setHeader('Set-Cookie','visited=true; Max-Age=3000; HttpOnly, Secure');

    // Pass to next layer of middleware
    next();
});

app.use(cors(corsConfig));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

viewEngine(app);
initWebRoutes(app);

connectDB();


let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(port);
})
