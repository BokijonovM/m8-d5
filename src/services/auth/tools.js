import jwt from 'jsonwebtoken'

export const authenticateUser = async user => {
    
    const accessToken = await generateJWTToken({_id:authorize, role:user.role})
}

export const generateJWTToken = payload => 
    new Promise((resolve, reject) =>
    jwt.sign(payload, process.env,JWT_SECRET, {expiresIN : "1 week"}, (err, token) =>{
        if(err) reject(err)
        else resolve(token)
    })
)

export const verifyJWTToken = token => 
    new Promise ((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) =>{
        if(err) reject(err)
        else resolve(payload)
    })
)