//crear tablas o campos 

import { Schema, model, Document  } from "mongoose";
import bcrypt from 'bcrypt';
const usuarioSchema= new Schema <IUsuario>({
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
usuarioSchema.method('compararPassword', function(password: string =''): boolean{
if(bcrypt.compareSync(password, this.password)){
    return true;
}
else{
    return false;
}
});

export interface IUsuario extends Document{
nombre:string;
email: string;
password: string;
avatar: string;
compararPassword(password: String): boolean;
}

export const Usuario= model<IUsuario>('Usuario',usuarioSchema);