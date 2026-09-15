const express=require('express');
const cors=require('cors');

const app=express();

//Middleware
app.use(cors());
app.use(express.json());

//Test route to confirm server is alive
app.get('/api/health', (req, res)=>{
    res.status(200).json({status: 'ok', message:'Server is running'});
});

module.exports=app;