const mongoose=require('mongoose');

const therapistSchema=new mongoose.Schema({
    email:{type:String, required:true, unique:true, lowercase:true},
    password_hash:{type:String, required:true},
    name:{type:String, required:true},
    slug:{type:String, required:true,unique:true},
    bio:{type:String},
    specializations:[{type:String}],
    languages:[{type:String}],
},{timestamps:true});

module.exports=mongoose.model('Therapist', therapistSchema);