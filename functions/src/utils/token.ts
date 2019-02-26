//TODO: ver se é possível usar o token pelo firebase auth

// import * as jwt from "jsonwebtoken";

// export type TokenPayload = {
//     [key: string]: any;
//     exp: number;
//     uid: string;
//     workspace?: string;
// }
// export class Token {
//     private static secret = "Huddle!2018"; 
//     static generate(payload: TokenPayload) {
//         // if(payload.exp) {
//         //
//         // }
//         let token = jwt.sign(payload,this.secret);
//         return token;
//     }

//     static validate(token: string) {
//         let decoded;
//         try{
//             decoded = jwt.verify(token,this.secret);
//         } catch(err) {
//             return null;
//         }

//         return decoded;
//     }
// }