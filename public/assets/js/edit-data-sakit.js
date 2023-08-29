let yournama;

window.onload = (async () => {
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    yournama = url.searchParams.get("nama");
    await fetch('http://localhost:3000/api/mahasiswa/getMahasiswaByName/'+yournama,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.status === 'OK'){   
            fetch('http://localhost:3000/api/kondisiMahasiswa/getDataSakitByNim/'+res.data[0].nim,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((responsee)=>responsee.json())
            .then((ress)=>{
                document.getElementById('nama').value = res.data[0].nama
                document.getElementById('asrama').value = res.data[0].nama_asrama
                document.getElementById('keterangan').value = ress.data[0].keterangan
                document.getElementById('tanggal-sakit').value = ress.data[0].tgl_sakit.split('T')[0]
            })
        }
    })

})

document.querySelector('.btn.bersihkan').onclick =((e)=>{
    e.preventDefault()
    document.getElementById('tanggal-sakit').value = ''
})

document.querySelector('.btn.tambah').onclick = ((e)=>{
    e.preventDefault()
    const nama = document.getElementById('nama').value
    const asrama = document.getElementById('asrama').value
    const keterangan = document.getElementById('keterangan').value
    const tgl_sakit = new Date(document.getElementById('tanggal-sakit').value)
    if(!nama || !asrama || !keterangan || !tgl_sakit){
        return alert('Lengkapi semua data')
    }
    const tgl1 = new Date()
    tgl1.setDate(tgl_sakit.getDate())
    tgl1.setMonth(tgl_sakit.getMonth())
    tgl1.setFullYear(tgl_sakit.getFullYear())
    const tgl2 = `${tgl1.getFullYear()}-${tgl1.getMonth()+1}-${tgl1.getDate()+1}`
    editDataSakit(nama,asrama,keterangan,tgl2)
})

async function editDataSakit(nama,asrama,keterangan,tgl_sakit){
    let nim;
    let id_asrama;
    await fetch(`http://localhost:3000/api/mahasiswa/getMahasiswaByName/${nama}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        nim = res.data[0].nim;
    })

    await fetch(`http://localhost:3000/api/asrama/getByAsrama/${asrama}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        id_asrama = res.data[0].nama_asrama
    })

    await fetch(`http://localhost:3000/api/kondisiMahasiswa/updateDataSakitByNim/${nim}`,{
        method: 'PUT',
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            tgl_sakit
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            alert(res.message)
            location.href = '/divkes/data-sakit'
        }
    })
}