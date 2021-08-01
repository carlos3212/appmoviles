import { Router, Request, Response } from "express";
import { IUsuario, Usuario } from "../models/user.models";
import bcrypt from 'bcrypt';
import token from "../classes/token";

const userRoutes = Router();

userRoutes.post('/login',(req: Request, res: Response) =>{
    const body= req.body;
       
       Usuario.findOne({email: body.email},(err: any, userDB: IUsuario)=>{
              if(err) throw err;
              if(!userDB){
                  return res.json({
                      msg:'email no existe'
                  })

              }
              //comprobar password
              if(userDB.compararPassword(body.password)){
                  const tokenUser= token.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar
                  });
                  res.json({
                  msg: 'validacion correcta',
                  tokenUser
                  });
              }
              else{
                  res.json({
                      msg: 'Password Incorrecto'
                  })
              }
       
       
    });
});
userRoutes.post('/crear',(req: Request, res: Response)=>{

    //obtiene los datos Api
    const user={
        nombre: req.body.nombre,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password,10), //cifrar con un hash de una sola via 
        avatar:req.body.avatar,
    }
    //registrar en la BBD
    Usuario.create(user).then(userDB=>{
        const tokenUser= token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
          });
          res.json({
          msg: 'Registro exitoso',
          tokenUser
          });
    }).catch(err=>{
        res.json({
            msg: 'Error al registrar el usuario',
        });
    })
    //body parser
    
});

export default userRoutes;