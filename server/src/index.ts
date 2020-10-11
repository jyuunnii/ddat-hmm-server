import "reflect-metadata";
import {createConnection} from "typeorm";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController";
import { MainController } from "./controller/MainController";
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';


createConnection().then(async connection => {

    console.log("DB connected !");

  }).catch(error => console.log(error));


const app = createExpressServer({
    cors:{
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
    controllers: [MainController, UserController] 
 });

app.set('port', process.env.PORT || 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(morgan('dev'));


 // run express application on port 3000 : http://localhost:3001
app.listen(app.get('port'), () =>
  console.log(`Login App Listening on PORT ${app.get('port')}`),
);
