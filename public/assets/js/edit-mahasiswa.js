let yournim = ''

selectOption()

window.onload = (async () => {
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    yournim = url.searchParams.get("nim");
    await fetch('http://localhost:3000/api/mahasiswa/getByNim/'+yournim,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        if(res.status === 'OK'){   
            document.getElementById('nim').value = res.data[0].nim
            document.getElementById('nama').value = res.data[0].nama
            document.getElementById('umur').value = parseInt(res.data[0].umur)
            document.getElementById('keterangan').value = res.data[0].keterangan
        }
    })

})

document.querySelector('.btn.bersihkan').onclick = ((e) => {
    e.preventDefault()
    clearData()
})

document.querySelector('.btn.tambah').onclick = ((e) => {
    e.preventDefault();
    const nim = document.getElementById('nim').value
    const nama = document.getElementById('nama').value
    const umur = document.getElementById('umur').value
    const asrama = document.getElementById('asrama').value
    const jurusan = document.getElementById('jurusan').value
    const kondisi = document.getElementById('kondisi').value
    const keterangan = document.getElementById('keterangan').value
    if(!nim || !nama || !umur || !asrama || !jurusan || !kondisi || !keterangan){
        return alert('Lengkapi semua data');
    }
    editMahasiswa(nim,nama,umur,asrama,jurusan,kondisi,keterangan)
})

function clearData(){
    document.getElementById('nama').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('asrama').value = '';
    document.getElementById('jurusan').value = '';
    document.getElementById('kondisi').value = '';
    document.getElementById('keterangan').value = '';
}

async function editMahasiswa(nim,nama,umur,id_asrama,jurusan,kondisi,keterangan){
            await fetch('http://localhost:3000/api/mahasiswa/update/'+nim,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama,umur,id_asrama,keterangan,jurusan,kondisi
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if(res.status === 'OK'){
                    alert(res.message)
                    location.href = '/divkes/mahasiswa'
                }
            })
}

async function selectOption(){
    fetch('http://localhost:3000/api/asrama/getAll',{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response) => response.json())
    .then((res) => {
        createOption(res.data)
    })
}

function createOption(data){
    const slct = document.getElementById('asrama')
    data.map((val) => {
        const opt = document.createElement('option')
        opt.value = val.id_asrama
        opt.text = val.nama_asrama
        slct.appendChild(opt)
    })
}

function valAngka(e){
    let charCode = (e.which) ? e.which : e.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
