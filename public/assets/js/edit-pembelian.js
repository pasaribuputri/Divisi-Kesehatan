let yourid = '';

window.onload = (async()=>{
    let url_string = (window.location.href).toLowerCase()
    let url = new URL(url_string)
    yourid = url.searchParams.get("id_pembelian_obat")
    await fetch(`http://localhost:3000/api/laporan/getPembelianById/`+yourid,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=> response.json())
    .then((res) =>{
        if(res.status === 'OK'){
            document.getElementById('id-pembelian').value = res.data[0].id_pembelian_obat
            document.getElementById('kode-obat').value = res.data[0].kode_obat
            document.getElementById('jumlah-obat').value = parseInt(res.data[0].jumlah_obat)
            document.getElementById('tanggal-beli').value = res.data[0].tgl_beli?.split('T')[0]
            document.getElementById('harga-obat').value = parseInt(res.data[0].harga_obat)
        }
    })
})

document.querySelector('.btn.bersihkan').onclick = ((e)=>{
    e.preventDefault()
    clearData()
})

document.querySelector('.btn.tambah').onclick = ((e)=>{
    e.preventDefault();
    const id_pembelian_obat = document.getElementById('id-pembelian').value
    const kode_obat = document.getElementById('kode-obat').value
    const jumlah_obat = document.getElementById('jumlah-obat').value
    const tgl_beli = new Date(document.getElementById('tanggal-beli').value)
    const harga_obat = document.getElementById('harga-obat').value
    if(!id_pembelian_obat || !kode_obat || !jumlah_obat || !tgl_beli || !harga_obat){
        return alert('Lengkapi semua data')
    }
    const tgl1 = new Date()
    tgl1.setDate(tgl_beli.getDate())
    tgl1.setMonth(tgl_beli.getMonth())
    tgl1.setFullYear(tgl_beli.getFullYear())
    const tgl2 = `${tgl1.getFullYear()}-${tgl1.getMonth()+1}-${tgl1.getDate()+1}`
    editPembelian(id_pembelian_obat,kode_obat,jumlah_obat,tgl2,harga_obat)
})

function clearData(){
    document.getElementById('jumlah-obat').value = ''
    document.getElementById('tanggal-beli').value = ''
    document.getElementById('harga-obat').value = ''
}

async function editPembelian(id_pembelian_obat,kode_obat,jumlah_obat,tgl_beli,harga_obat){
    await fetch('http://localhost:3000/api/laporan/updatePembelian/'+ id_pembelian_obat,{
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            jumlah_obat,tgl_beli,harga_obat
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            alert(res.message)
            location.href = '/divkes/pembelian-obat'
        }
    })
}