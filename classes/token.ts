import jwt , {decode} from 'jsonwebtoken';

export default class Token{
    private static key: string = 'Siempre.1';
    private static caducidad: string= '30d';
    constructor(){

    }

    static getJwtToken(payload: any): string{
        return jwt.sign({
            usuario: payload
        },this.key,{expiresIn: this.caducidad   });
    }

    static comprobarToken(userToken: string){
        return new Promise((resolve, reject) =>{
            jwt.verify(userToken, this.key, (err, decoded) =>{
                if(err){
                    reject();
                }
                else{
                    resolve(decoded);
                }
            })
        })
    }
}