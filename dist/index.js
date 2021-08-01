"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var server = new server_1.default();
//BODY-PARSER para datos
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//ruta aceeso para el user
server.app.use('/user', usuario_1.default);
//conexion con mongoDB utilizando mongose
//mongoose.connect('mongodb://localhost:27017/tienda',{
mongoose_1.default.connect('mongodb+srv://cocoa:Programar.1234@cluster0.azijh.mongodb.net/tienda', {
    useNewUrlParser: true, useCreateIndex: true
}, function (err) {
    if (err)
        throw err;
    console.log('Base de datos online');
});
//inicia el servidor
server.start(function () {
    console.log("Server start");
});
