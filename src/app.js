const express=require('express');
const cors=require('cors');
const authRoutes = require('./routes/authRoutes');
const app=express();

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
//Test route to confirm server is alive
app.get('/api/health', (req, res)=>{
    res.status(200).json({status: 'ok', message:'Server is running'});
});

module.exports=app;