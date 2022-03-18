import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const {Schema, model} = mongoose
const UserSchema = new Schema({
name : {type:String, required:true},
surname: {type:String, required:true},
email : {type:String},
password : {type:String},
role : {type:String, enum:["host","guest"], default:'guest'}
},
{
    timestamps:true,
}
)
//  hashing the password
UserSchema.pre("save", async function(next){
    const newUser = this
    const plainPw = newUser.password

    if(newUser.isModified("password")){
        const hash = await bcrypt.hash(plainPw, 12)
        newUser.password = hash
    }
    next()
})

// 
UserSchema.methods.toJSON = function(){
    const userDocument = this
    const userObject = userDocument.toObject()
    delete userObject.password
    return userObject
}

export default model("User", UserSchema)