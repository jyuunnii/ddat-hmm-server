import "reflect-metadata";
import {createConnection} from "typeorm";
import app from './app';


createConnection().then(async connection => {
    console.log("DB connected !");
}).catch(error => console.log(error));;
  
 
// run express application on port 3000 : http://localhost:3001
app.listen(app.get('port'), () =>
    console.log(`App Listening on PORT ${app.get('port')}`),
);


