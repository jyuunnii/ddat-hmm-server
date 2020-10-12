import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import routes from './routes';


const express = require("express");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use('/', routes);
app.use(compression());
app.use(bodyParser.json());
app.use(
bodyParser.urlencoded({
    extended: false,
}),
);
app.use(morgan('dev'));


export default app;