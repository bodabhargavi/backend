const express=require('express');
const cors=require('cors');
const authRoutes = require('./routes/authRoutes');
const app=express();
const schedulingRoutes = require('./routes/schedulingRoutes');
const clientRoutes = require('./routes/clientRoutes');

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
//Test route to confirm server is alive
app.get('/api/health', (req, res)=>{
    res.status(200).json({status: 'ok', message:'Server is running'});
});
app.use('/api/scheduling', schedulingRoutes);
app.use('/api/clients', clientRoutes);

module.exports=app;