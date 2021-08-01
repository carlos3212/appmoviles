import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server= new Server();
//BODY-PARSER para datos
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
//ruta aceeso para el user
server.app.use('/user',userRoutes)

//conexion con mongoDB utilizando mongose
mongoose.connect('mongodb://localhost:27017/tienda',{
    useNewUrlParser: true, useCreateIndex: true},(err)=>{
        if(err)throw err;
        console.log('Base de datos online')
    });
//inicia el servidor
server.start(() =>{
    console.log("Server start")
})
