import mongoose from 'mongoose'

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
export default model("User", UserSchema)