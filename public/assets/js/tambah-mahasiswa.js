selectOption()

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
    if(!nim || !nama || !umur || !asrama || !jurusan){
        return alert('Isi semua data !!');
    }
    tambahMahasiswa(nim,nama,umur,asrama,jurusan)
})

function clearData(){
    document.getElementById('nim').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('umur').value = '';
    document.getElementById('asrama').value = '';
    document.getElementById('jurusan').value = '';
}

async function tambahMahasiswa(nim,nama,umur,id_asrama,jurusan){
    await fetch('http://localhost:3000/api/mahasiswa/getByNim/'+nim,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response) => response.json())
    .then(async (res) => {
        if(res.status !== 'OK'){
            await fetch('http://localhost:3000/api/mahasiswa/tambahMahasiswa',{
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nim,nama,umur,id_asrama,jurusan
                })
            })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message)
                location.href = '/divkes/mahasiswa'
            })
        }else{
            alert('Nim telah terdaftar!')
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
    var charCode = (e.which) ? e.which : e.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}