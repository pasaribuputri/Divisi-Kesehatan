selectOption()

document.querySelector('.btn.bersihkan').onclick = ((e)=>{
    e.preventDefault()
    clearData()
})

document.querySelector('.btn.tambah').onclick = ((e)=>{
    e.preventDefault()
    const kode_obat = document.getElementById('kode-obat').value;
    const jumlah_obat = document.getElementById('jumlah-obat').value;
    const tgl_beli = new Date(document.getElementById('tanggal-beli').value);
    const harga_obat = document.getElementById('harga-obat').value;
    if(!kode_obat || !jumlah_obat || !tgl_beli || !harga_obat){
        return alert("Lengkapi semua data !!")
    }
    const tgl1 = new Date()
    tgl1.setDate(tgl_beli.getDate())
    tgl1.setMonth(tgl_beli.getMonth())
    tgl1.setFullYear(tgl_beli.getFullYear())
    const tgl2 = `${tgl1.getFullYear()}-${tgl1.getMonth()+1}-${tgl1.getDate()+1}`
    tambahPembelian(kode_obat,jumlah_obat,tgl2,harga_obat)
})

function clearData(){
    document.getElementById('kode-obat').value =''
    document.getElementById('jumlah-obat').value =''
    document.getElementById('tanggal-beli').value =''
    document.getElementById('harga-obat').value ='' 
}

async function tambahPembelian(kode_obat,jumlah_obat,tgl_beli,harga_obat){
    await fetch('http://localhost:3000/api/laporan/tambahPembelian',{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            kode_obat,
            jumlah_obat,
            tgl_beli,
            harga_obat,
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        alert(res.message)
        location.href = '/divkes/pembelian-obat'
    })
}

function selectOption(){
    fetch('http://localhost:3000/api/obat/getObat',{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        createOption(res.data)
    })
}

function createOption(data){
    const select = document.getElementById('kode-obat')
    data.map((val)=>{
        const opt = document.createElement("option")
        opt.value = val.kode_obat
        opt.text = val.nama_obat
        select.appendChild(opt)
    })
}
