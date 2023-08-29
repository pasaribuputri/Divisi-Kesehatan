import express, {query} from 'express';
import pool from '../helpers/database.js'
import dotenv from 'dotenv'
dotenv.config({path: '.env-local'})
const router = express.Router()

router.get('/getAll',async (req,res)=>{
    try{
        const sqlQuery = "select * from asrama"
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }catch (err){
        res.status(400).send(err.message);
    }
})

router.get('/getById/:id_asrama',async (req,res)=>{
    const {id_asrama} = req.params
    const sqlQuery = "select * from asrama where id_asrama=?"
    const result = await pool.query(sqlQuery,[id_asrama])
    if(result.length){
        res.status(200).json({status: "OK",message: 'Data Ditampilkan',data:result})
    }else{
        res.status(400).send({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getByAsrama/:nama_asrama',async(req,res)=>{
    const {nama_asrama} = req.params
    const sqlQuery = "select * from asrama where nama_asrama=?"
    const result = await pool.query(sqlQuery,[nama_asrama])
    if(result.length){
        res.status(200).json({status: "OK",message: 'Data Ditampilkan',data:result})
    }else{
        res.status(400).send({status: 'Bad Request',error: 'Data tidak ditemukan'})
    
    }
})

router.get('/getTotalAsrama',async(req,res)=>{
    try{
        const sqlQuery = "SELECT COUNT(nama_asrama) AS total_asrama FROM asrama";
        const result = await pool.query(sqlQuery)
        const data = parseInt(result[0].total_asrama)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: data})
    }catch (err){
        res.status(400).send(err.message)
    }
})

// router.delete('/hapusAsrama/:id_asrama', async(req,res)=>{
//     const {id_asrama} = req.params
//     const querySearch = 'select * from asrama where id_asrama=?'
//     const queryDelete = 'delete from asrama where id_asrama=?'
//     const data = await pool.query(querySearch,[id_asrama]);
//     if(data.length){
//         try{
//             await pool.query(queryDelete,[id_asrama])
//             res.status(200).json
//             ({status:'OK',message:'Data berhasil dihapus'})
//         }catch(err){
//             res.status(400).send(err.message)
//         }
//     }else{
//         return res.status(400).json({status:'Bad Request', error:'Data tidak ditemukan'})
//     }   
// })

// router.put('/update/:id_asrama', async(req,res)=>{
//     const {nama_asrama,keterangan} = req.body
//     const {id_asrama} = req.params
//     try{
//         const sqlQuery = "update obat set nama_asrama=?,keterangan=? where id_asrama=?"
//         const result = await pool.query(sqlQuery,[nama_asrama,keterangan,id_asrama])
//         res.status(200).json({status: 'OK',message: 'Data Berhasil di Update'})
//     }catch (err){
//         res.status(400).send(err.message)
//     }
// })

// router.post('/tambahAsrama',async(req,res)=>{
//     try{
//     const {nama_asrama,keterangan} = req.body
//     const sqlQuery = 'insert into asrama (nama_asrama,keterangan) values (?,?)';
//     const result = await pool.query(sqlQuery,[nama_asrama,keterangan])
//     res.status(201).json({status: "created",message: "Data Berhasil Ditambahkan"})
//     }catch (err){
//         res.status(400).json(err.mesagge)
//     }
// })
export default router;