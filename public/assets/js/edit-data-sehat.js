
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
            fetch('http://localhost:3000/api/kondisiMahasiswa/getDataSehatByNim/'+res.data[0].nim,{
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
                document.getElementById('tanggal-sehat').value = ress.data[0]?.tgl_sembuh.split('T')[0]
            })
        }
    })

})

document.querySelector('.btn.bersihkan').onclick =((e)=>{
    e.preventDefault()
    document.getElementById('tanggal-sehat').value = ''
})

document.querySelector('.btn.tambah').onclick =((e)=>{
    e.preventDefault()
    const nama = document.getElementById('nama').value
    const asrama = document.getElementById('asrama').value
    const keterangan = document.getElementById('keterangan').value
    const tgl_sehat = new Date(document.getElementById('tanggal-sehat').value)
    if(!nama || !asrama || !keterangan || !tgl_sehat){
        return alert('Lengkapi semua data')
    }
    const tgl1 = new Date()
    tgl1.setDate(tgl_sehat.getDate())
    tgl1.setMonth(tgl_sehat.getMonth())
    tgl1.setFullYear(tgl_sehat.getFullYear())
    const tgl2 = `${tgl1.getFullYear()}-${tgl1.getMonth()+1}-${tgl1.getDate()+1}`
    editDataSehat(nama,asrama,keterangan,tgl2)
})


async function editDataSehat(nama,asrama,keterangan,tgl_sembuh){
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

    await fetch(`http://localhost:3000/api/kondisiMahasiswa/updateDataSehatByNim/${nim}`,{
        method: 'PUT',
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            tgl_sembuh
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            alert(res.message)
            location.href = '/divkes/data-sehat'
        }
    })
}