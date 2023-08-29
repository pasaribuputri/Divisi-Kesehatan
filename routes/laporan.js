import express, {query} from 'express';
import pool from '../helpers/database.js';
const router = express.Router()

router.get('/getPengeluaran',async(req,res)=>{
    try{
        const sqlQuery = "select * from pengeluaran_dana";
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data:result})
    }catch (err){
        res.status(400).send(err.message);
    }
})

router.post('/tambahPembelian',async(req,res)=>{
    try{
        const {kode_obat,jumlah_obat,tgl_beli,harga_obat} = req.body
        console.log(req.body)
        const sqlQuery = "insert into pembelian_obat (kode_obat,jumlah_obat,tgl_beli,harga_obat) values (?,?,?,?)"
        const result = await pool.query(sqlQuery,[kode_obat,jumlah_obat,tgl_beli,harga_obat])
        res.status(201).json({status: "created",message: "Data Berhasil Ditambahkan"})
    }catch (err){
        res.status(400).json(err.mesagge)
    }
})

router.get('/getPembelian',async(req,res)=>{
    try{
        const sqlQuery = `select * from pembelian_obat`;
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data:result})
    }catch (err){
        res.status(400).send(err.message);
    }
})

router.get('/getPembelianById/:id_pembelian_obat',async(req,res)=>{
    const {id_pembelian_obat} = req.params
    const sqlQuery = "select * from pembelian_obat where id_pembelian_obat=?"
    const result = await pool.query(sqlQuery,[id_pembelian_obat])
    if(result.length){
        res.status(200).json({status: 'OK',message: 'Data ditampilkan',data: result})
    }else{
        res.status(400).json({status: 'Bad Request',message: 'Data tidak ditemukan'})
    }
})

router.delete('/remove/:id_pembelian_obat',async(req,res)=>{
    const {id_pembelian_obat} = req.params
    const querySearch = 'select * from pembelian_obat where id_pembelian_obat=?'
    const queryDelete = 'delete from pembelian_obat where id_pembelian_obat=?'
    const data = await pool.query(querySearch,[id_pembelian_obat])
    if(data.length){
        try{
            await pool.query(queryDelete,[id_pembelian_obat])
            res.status(200).json({status: 'OK',message: 'Data berhasil dihapus'})
        }catch(err){
            res.status(400).send(err.message)
        }
    }else{
        return res.status(400).json({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

 router.put('/updatePembelian/:id_pembelian_obat',async(req,res)=>{
    const {jumlah_obat,tgl_beli,harga_obat,} = req.body
    const {id_pembelian_obat} = req.params
    try{
        const sqlQuery = "update pembelian_obat set jumlah_obat=?,tgl_beli=?,harga_obat=? where id_pembelian_obat=?"
        const result = await pool.query(sqlQuery,[jumlah_obat,tgl_beli,harga_obat,id_pembelian_obat])
        res.status(200).json({status: 'OK',message: 'Data Berhasil di Update'})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.delete('/removePengeluaranDana/:id_pengeluaran_dana',async(req,res)=>{
    const {id_pengeluaran_dana} = req.params
    const querySearch = 'select * from pengeluaran_dana where id_pengeluaran_dana=?'
    const queryDelete = 'delete from pengeluaran_dana where id_pengeluaran_dana=?'
    const data = await pool.query(querySearch,[id_pengeluaran_dana])
    if(data.length){
        try{
            await pool.query(queryDelete,[id_pengeluaran_dana])
            res.status(200).json({status: 'OK',message: 'Data berhasil dihapus'})
        }catch(err){
            res.status(400).send(err.message)
        }
    }else{
        return res.status(400).json({status: 'Bad Request',error: 'Data tidak ditemukan'})
    }
})

export default router;