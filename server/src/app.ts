import bodyParser = require('body-parser');
import morgan = require('morgan');
import compression = require('compression');

import routes from './routes';


const express = require("express");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use('/', routes);


export default app;