"use strict";
//crear tablas o campos 
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var mongoose_1 = require("mongoose");
var usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: [true, 'Nombre de usuario es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },
    avatar: {
        type: String,
        default: 'us1.png'
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
