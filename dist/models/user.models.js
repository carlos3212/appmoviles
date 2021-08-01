"use strict";
//crear tablas o campos 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
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
//metodo de comparación
usuarioSchema.method('compararPassword', function (password) {
    if (password === void 0) { password = ''; }
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
