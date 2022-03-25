import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


export const authenticateUser = async (user : IUser)=> {

    
    const forToken = {_id:user._id, role:user.role}
    
    const token = await generateJWTToken(forToken)
    return token
}

export const generateJWTToken = (payload:IPayload) => 

    new Promise((resolve, reject) =>
    
    jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn : "1 week"}, (err, token) =>{
        if(err) reject(err)
        else resolve(token)
    })
)

export const verifyJWTToken = (token : string) => 
    new Promise ((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload) =>{
        if(err) reject(err)
        else resolve(payload)
    })
)