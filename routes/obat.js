import express, {query} from 'express';
import pool from '../helpers/database.js';
const router = express.Router()

router.post('/tambahObat', async(req,res)=>{
    try{
        const {nama_obat,detail_obat} = req.body
        const sqlQuery = "insert into obat (nama_obat,detail_obat) values (?,?)"
        const result = await pool.query(sqlQuery,[nama_obat,detail_obat])
        res.status(201).json({status:"created",message: "Data Berhasil Ditambahkan"})
    }catch (err){
        res.status(400).json(err.message)
    }
})

router.get('/getObat', async(req,res)=>{
    try{
        const sqlQuery = "select * from obat";
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data:result})
    }catch (err){
        res.status(400).send(err.message);
    }
})

router.get('/getOne/:nama_obat', async(req,res)=>{
    const {nama_obat} = req.params
    const sqlQuery = `select * from obat where nama_obat like '%${nama_obat}%'`
    const result = await pool.query(sqlQuery,[nama_obat])
    if(result.length){
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data:result})
    }else{
        res.status(400).send({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getOneByKode/:kode_obat',async(req,res)=>{
    const {kode_obat} = req.params
    const sqlQuery = "select * from obat where kode_obat=?"
    const result = await pool.query(sqlQuery,[kode_obat])
    if(result.length){
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data:result})
    }else{
        res.status(400).send({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

router.delete('/remove/:kode_obat',async(req,res)=>{
    const {kode_obat} = req.params
    const querySearch = 'select * from obat where kode_obat=?'
    const queryDelete = 'delete from obat where kode_obat=?'
    const data = await pool.query(querySearch,[kode_obat])
    if(data.length){
        try{
            await pool.query(queryDelete,[kode_obat])
            res.status(200).json({status: 'OK',message: 'Data berhasil dihapus'})
        }catch(err){
            res.status(400).send(err.message)
        }
    }else{
        return res.status(400).json({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

router.put('/updateObat/:kode_obat',async (req,res)=>{
    const {nama_obat,detail_obat,stok_obat} = req.body
    const {kode_obat} = req.params
    try{
        const sqlQuery = "update obat set nama_obat=?,detail_obat=?, stok_obat=? where kode_obat=?"
        const result = await pool.query(sqlQuery,[nama_obat,detail_obat,stok_obat,kode_obat])
        res.status(200).json({status: 'OK',message: 'Data Berhasil Di Update'})
    }catch{
        res.status(400).send(err.message)
    }
})

export default router;