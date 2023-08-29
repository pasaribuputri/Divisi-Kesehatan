// import express from "express";
import express, {query} from 'express';
import pool from '../helpers/database.js'
import dotenv from 'dotenv'
dotenv.config({path: '.env-local'})
const router = express.Router()

router.post('/tambahMahasiswa', async(req,res)=>{
    try{
        const {nim,nama,umur,id_asrama,jurusan} = req.body
        const sqlQuery = "insert into mahasiswa (nim,nama,umur,id_asrama,jurusan) values (?,?,?,?,?)";
        const result = await pool.query(sqlQuery,[nim,nama,umur,id_asrama,jurusan])
        res.status(201).json({status: "created",message: "Data Berhasil Ditambahkan"})
    }catch (err){
        res.status(400).json(err.mesagge)
    }
})

router.get('/getAll', async(req,res)=>{
    try{ 
        const sqlQuery = "select * from mahasiswa";
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }catch (err){
        res.status(400).send(err.mesagge);
    }
})

router.get('/getMahasiswa',async(req,res)=>{
    try{
        const sqlQuery = `SELECT nim,nama,umur,nama_asrama,jurusan,kondisi FROM mahasiswa
        INNER JOIN asrama ON mahasiswa.id_asrama= asrama.id_asrama`;
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }catch (err){
        res.status(400).send(err.mesagge);
    }
})

router.get('/getMahasiswaByName/:nama',async(req,res)=>{
        const {nama} = req.params
        const sqlQuery = `SELECT nim,nama,umur,nama_asrama,jurusan,kondisi FROM mahasiswa
        INNER JOIN asrama ON mahasiswa.id_asrama= asrama.id_asrama where mahasiswa.nama like'%${nama}%'`;
        const result = await pool.query(sqlQuery,[nama])
        if(result.length){
            res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
        }else{
            res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
        }        
})

router.get('/getByNim/:nim',async (req,res)=>{
    const {nim} = req.params
    const sqlQuery = "select * from mahasiswa where nim=?"
    const result = await pool.query(sqlQuery,[nim])
    if(result.length){
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
    
})

router.delete('/remove/:nim', async(req,res)=>{
    const {nim} = req.params;
    const querySearch = 'select * from mahasiswa where nim = ?';
    const queryDelete = 'delete from mahasiswa where nim = ?';
    const data = await pool.query(querySearch,[nim]);
    if(data.length){
        try{
            await pool.query(queryDelete,[nim])
            res.status(200).json({status:'OK',message:'Data berhasil dihapus'})
        }catch(err){
            res.status(400).send(err.message)
        }
    }else{
        return res.status(400).json({status:'Bad Request', error:'Data tidak ditemukan'})
    }   
})



router.put('/update/:nim',async (req,res)=>{
    const {nama,umur,id_asrama,keterangan,jurusan,kondisi} = req.body
    const {nim} = req.params
    try{
        const sqlQuery = "update mahasiswa set nama=?,umur=?,id_asrama=?,keterangan=?,jurusan=?,kondisi=? where nim=?"
        const result = await pool.query(sqlQuery,[nama,umur,id_asrama,keterangan,jurusan,kondisi,nim])
        res.status(200).json({status: 'OK',message: 'Data Berhasil di Update'})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.get('/getUserByID/:id_user', async (req, res) => {
    const {id_user} = req.params
    const sqlQuery = 'select * from user where id_user=?'
    const result = await pool.query(sqlQuery,[id_user])
    if(result.length){
        res.status(200).json({status: "OK",message: 'Data Ditampilkan',data:result})
    }else{
        res.status(400).send({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

export default router;

