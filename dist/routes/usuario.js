"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_models_1 = require("../models/user.models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = __importDefault(require("../classes/token"));
var userRoutes = express_1.Router();
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    user_models_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                msg: 'email no existe'
            });
        }
        //comprobar password
        if (userDB.compararPassword(body.password)) {
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                msg: 'validacion correcta',
                tokenUser: tokenUser
            });
        }
        else {
            res.json({
                msg: 'Password Incorrecto'
            });
        }
    });
});
userRoutes.post('/crear', function (req, res) {
    //obtiene los datos Api
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    };
    //registrar en la BBD
    user_models_1.Usuario.create(user).then(function (userDB) {
        var tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            msg: 'Registro exitoso',
            tokenUser: tokenUser
        });
    }).catch(function (err) {
        res.json({
            msg: 'Error al registrar el usuario',
        });
    });
    //body parser
});
exports.default = userRoutes;
