import express, {query} from 'express';
import pool from '../helpers/database.js'
import dotenv from 'dotenv'
dotenv.config({path: '.env-local'})
const router = express.Router()

router.get('/getTotalDataSehat',async(req,res)=>{
    try{
        const sqlQuery = "select count(keterangan) as total_sehat FROM data_sehat";
        const result = await pool.query(sqlQuery)
        const data = parseInt(result[0].total_sehat)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: data})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.get('/getDataSehat',async(req,res)=>{
    try{
        const sqlQuery = "select mahasiswa.nama,asrama.nama_asrama,data_sehat.keterangan,tgl_sembuh from((data_sehat inner join mahasiswa on data_sehat.nim=mahasiswa.nim)inner join asrama on data_sehat.id_asrama=asrama.id_asrama)"
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.get('/getRiwayatSakit',async(req,res)=>{
    try{
        const sqlQuery = "select mahasiswa.nama,asrama.nama_asrama,history_sakit.keterangan,tgl_sakit,tgl_sembuh from((history_sakit inner join mahasiswa on history_sakit.nim=mahasiswa.nim)inner join asrama on history_sakit.id_asrama=asrama.id_asrama)"
        const result = await pool.query(sqlQuery)
        res.status(200).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.get('/removeRiwayatSakit/:nim',async(req,res)=>{
    const {nim} = req.params
    const querySearch = 'select * from history_sakit where nim=?';
    const queryDelete = 'delete from history_sakit where nim=?';
    const data = await pool.query(querySearch,[nim])
    if(data.length){
        try{
            await pool.query(queryDelete,[nim])
            res.status(200).json({status: 'OK',mesagge: 'Data berhasil dihapus'})
        }catch(err){
            res.status(400).send(err.mesagge)
        }
    }else{
        return res.status(400).json({status: 'Bad Request',eror: 'Data tidak ditemukan'})
    }

})

router.get('/getTotalDataSakitByMonth',async(req,res)=>{
    try{
        const sqlQuery = "select count(tgl_sakit) AS total_sakit_per_bulan, month(tgl_sakit) as bulan_sakit from history_sakit group by month(tgl_sakit)";
        const result = await pool.query(sqlQuery)
        const data = [];
        result.map((val)=>{
            data.push({total_sakit: parseInt(val.total_sakit_per_bulan), bulan: val.bulan_sakit})
        })
        res.status(400).send({status: 'OK',message: 'Data Ditampilkan', data})
    }catch(err){
        res.status(200).send(err.message)
    }
})

router.get('/getTotalDataSakit',async(req,res)=>{
    try{
        const sqlQuery = "select count(keterangan) as total_sakit from data_sakit";
        const result = await pool.query(sqlQuery)
        const data = parseInt(result[0].total_sakit)
        res.status(400).json({status: 'OK',message: 'Data Ditampilkan',data: data})
    }catch(err){
        res.status(200).send(err.message)
    }  
})

router.get('/getDataSakit',async(req,res)=>{
    try{
        const sqlQuery = "select mahasiswa.nama,asrama.nama_asrama,data_sakit.keterangan,tgl_sakit from((data_sakit inner join mahasiswa on data_sakit.nim=mahasiswa.nim)inner join asrama on data_sakit.id_asrama=asrama.id_asrama)"
        const result = await pool.query(sqlQuery)
        res.status(400).json({status: 'OK',message: 'Data Ditampilkan',data: result})
    }catch(err){
        res.status(200).send(err.message)
    }
})

router.get('/getDataSehatByNama/:nama',async(req,res)=>{
    const {nama} = req.params
    const sqlQuery = `select mahasiswa.nama,asrama.nama_asrama,data_sehat.keterangan,tgl_sembuh 
    from((data_sehat INNER JOIN mahasiswa on data_sehat.nim=mahasiswa.nim)INNER JOIN asrama on data_sehat.id_asrama=asrama.id_asrama) where mahasiswa.nama like'%${nama}%'`;
    const result = await pool.query(sqlQuery,[nama])
    if(result.length){
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getDataSakitByNama/:nama',async(req,res)=>{
    const {nama} = req.params
    const sqlQuery = `select mahasiswa.nama,asrama.nama_asrama,data_sakit.keterangan,tgl_sakit 
    from((data_sakit INNER JOIN mahasiswa on data_sakit.nim=mahasiswa.nim)INNER JOIN asrama on data_sakit.id_asrama=asrama.id_asrama) where mahasiswa.nama like'%${nama}%'`;
    const result = await pool.query(sqlQuery,[nama])
    if(result.length){
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getRiwayatSakitByNama/:nama',async(req,res)=>{
    const {nama} = req.params
    const sqlQuery = `select mahasiswa.nama,asrama.nama_asrama,history_sakit.keterangan,tgl_sakit,tgl_sembuh from((history_sakit inner join mahasiswa on history_sakit.nim=mahasiswa.nim)inner join asrama on history_sakit.id_asrama=asrama.id_asrama) where mahasiswa.nama like '%${nama}%'`
    const result = await pool.query(sqlQuery,[nama])
    if(result.length){
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getDataSehatByNim/:nim',async(req,res)=>{
    const {nim} = req.params
    const sqlQuery = 'select * from data_sehat where nim=?';
    const result = await pool.query(sqlQuery,[nim])
    if(result.length){
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.get('/getDataSakitByNim/:nim',async(req,res)=>{
    const {nim} = req.params
    const sqlQuery = 'select * from data_sakit where nim=?';
    const result = await pool.query(sqlQuery,[nim])
    if(result.length){
        res.status(200).json({status: 'OK',mesagge: 'Data Ditampilkan',data: result})
    }else{
        res.status(400).send({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.put('/updateDataSehatByNim/:nim',async(req,res)=>{
    const {tgl_sembuh} = req.body
    const {nim} = req.params
    try{
        const sqlQuery = "update data_sehat set tgl_sembuh=? where nim=?"
        const result = await pool.query(sqlQuery,[tgl_sembuh,nim])
        res.status(200).json({status: 'OK',message: 'Data Berhasil di Update'})
    }catch (err){
        res.status(400).send(err.message)
    }
})

router.put('/updateDataSakitByNim/:nim',async(req,res)=>{
    const {tgl_sakit} = req.body
    const {nim} = req.params
    try{
        const sqlQuery = "update data_sakit set tgl_sakit=? where nim=?"
        const result = await pool.query(sqlQuery,[tgl_sakit,nim])
        res.status(200).json({status: 'OK',message: 'Data Berhasil di Update'})
    }catch (err){
        res.status(400).send(err.message)
    }
})

export default router;