import express from "express";
import pool from '../helpers/database.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: '.env-local'})
const router = express.Router()

router.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body;
        const sqlQuery = "select * from user where email=?";
        const result = await pool.query(sqlQuery,[email])
        if(result.length != 0){
            if(password === result[0].password){
                const token = jwt.sign(result[0],process.env.TOKEN);
                res.status(202).json({status:'OK',message:'Login Berhasil',data:{id_user:result[0].id_user,token: token}})
            }else{
                return res.status(400).json({status:'Bad Request',message:'Password anda salah'})
            }
        }else{
            res.status(400).json({status:'Bad Request',message:'Email belum terdaftar'})
        }
    }catch (err){
        res.status(400).send(err.message);
    }
})

export default router;