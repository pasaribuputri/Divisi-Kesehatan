document.querySelector('.btn.bersihkan').onclick = ((e)=>{
    e.preventDefault()
    clearData()
})

document.querySelector('.btn.tambah').onclick = ((e)=>{
    e.preventDefault()
    const nama_obat = document.getElementById('nama-obat').value
    const detail_obat = document.getElementById('detail-obat').value
    if(!nama_obat || !detail_obat){
        return alert('Lengkapi semua data')
    }
    tambahObat(nama_obat,detail_obat)
})

 function clearData(){
    document.getElementById('nama-obat').value=''
    document.getElementById('detail-obat').value=''
 }

async function tambahObat(nama_obat,detail_obat){
    await fetch('http://localhost:3000/api/obat/tambahObat',{
        method: 'POST',
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama_obat,detail_obat
        })
    })
    .then((response) => response.json())
    .then((res)=>{
        alert(res.message)
        location.href = '/divkes/obat'
    })
}