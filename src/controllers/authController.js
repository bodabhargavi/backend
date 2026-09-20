const Therapist=require('../models/Therapist');
const bcrypt=require('bcryptjs');
const generateSlug=require('../utils/generateSlug');
const jwt = require('jsonwebtoken');

const signup=async(req,res)=>{
    try{
        const{email,password,name}=req.body;
        
        const existingTherapist=await Therapist.findOne({email});
        if(existingTherapist){
           return res.status(400).json({message: 'Email already registered'});
        }
        const baseSlug=generateSlug(name);
        let slug=baseSlug;
        let counter=1;
        let slugExists=await Therapist.findOne({slug});
        while(slugExists){
            slug = `${baseSlug}-${counter}`;
            counter++;
            slugExists=await Therapist.findOne({slug});
        }
        const salt=await bcrypt.genSalt(10);
        const password_hash=await bcrypt.hash(password,salt);
        const therapist = await Therapist.create({
            email,
            password_hash,
            name,
            slug,
        });
        res.status(201).json({
            id:therapist._id,
            email:therapist.email,
            name:therapist.name,
            slug:therapist.slug,
        });

    } catch(error){
        res.status(500).json({message:error.message});
    }
};

const login = async(req,res) =>{
            try{
                const{email,password} = req.body;

                const therapist = await Therapist.findOne({email});
                if(!therapist){
                    return res.status(400).json({message: 'Invalid credentials'});
                }
                const isMatch = await bcrypt.compare(password, therapist.password_hash);
                if(!isMatch){
                    return res.status(400).json({message: 'Invalid credentials'});
                }
                const token = jwt.sign(
                    {id:therapist._id},
                    process.env.JWT_SECRET,
                    {expiresIn:'30d'}
                );
                res.status(200).json({
                    token,
                    id: therapist._id,
                    email: therapist.email,
                    name: therapist.name,
                    slug: therapist.slug,
                });
            }
            catch(error){
                res.status(500).json({message: error.message});
            }
        };

module.exports={signup, login}; 