let yourkode = ''

window.onload = (async()=>{
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    yourkode = url.searchParams.get("kode_obat");
    await fetch('http://localhost:3000/api/obat/getOneByKode/'+yourkode,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        console.log(res)
        if(res.status === 'OK'){
            document.getElementById('kode-obat').value = res.data[0].kode_obat
            document.getElementById('nama-obat').value = res.data[0].nama_obat
            document.getElementById('detail-obat').value = res.data[0].detail_obat
            document.getElementById('stok-obat').value = res.data[0].stok_obat
        }
    })
})

document.querySelector('.btn.bersihkan').onclick = ((e)=>{
    e.preventDefault()
    clearData()
})

document.querySelector('.btn.tambah').onclick = ((e)=>{
    e.preventDefault()
    const kode_obat = document.getElementById('kode-obat').value 
    const nama_obat = document.getElementById('nama-obat').value
    const detail_obat = document.getElementById('detail-obat').value
    const stok_obat = document.getElementById('stok-obat').value
    if(!kode_obat || !nama_obat || !detail_obat){
        return alert('Lengkapi semua data')
    }
    editObat(kode_obat,nama_obat,detail_obat,stok_obat)
})

function clearData(){
    document.getElementById('nama-obat').value='';
    document.getElementById('detail-obat').value='';
    document.getElementById('stok-obat').value='';
}

async function editObat(kode_obat,nama_obat,detail_obat,stok_obat){
    await fetch('http://localhost:3000/api/obat/updateObat/'+kode_obat,{
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            nama_obat,detail_obat,stok_obat
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            alert(res.message)
            location.href = '/divkes/obat'
        }
    })
}