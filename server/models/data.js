const mongoose=require('mongoose')
const User=new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  patient_id:{type:String,required:true},
  mobile_no:{type:String,required:true},
  quote:{type:String,required:false},
},{collection:'user-data'})
const model=mongoose.model('UserData',User)
module.exports=model;