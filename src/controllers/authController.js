const Therapist=require('../models/Therapist');
const bcrypt=require('bcryptjs');

const signup=async(req,res)=>{
    try{
        const{email,password,name}=req.body;
        
        const existingTherapist=await Therapist.findOne({email});
        if(existingTherapist){
           return res.status(400).json({message: 'Email already registered'});
        }
    } catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports={signup};