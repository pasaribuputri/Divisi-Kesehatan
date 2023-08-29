showAllMahasiswa()

document.querySelector('.btn-cari').onclick =  (async (e) => {
    e.preventDefault();
    const cari = document.querySelector('.input-pencarian').value
    if(cari){
        showPencarianMahasiswa(cari)
    }else{
        showAllMahasiswa()
    }
})

document.querySelector('.btn-tambah').onclick = ((e) =>{
    location.href = '/divkes/mahasiswa/tambah-mahasiswa'
})

function createTabel(data){
    document.querySelector("tbody").textContent = ''
    if(data){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")
            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor);

            const tdNim = document.createElement("td");
            tdNim.textContent = data[i].nim;
            tr.appendChild(tdNim);

            const tdNama = document.createElement("td");
            tdNama.textContent = data[i].nama;
            tr.appendChild(tdNama);

            const tdUmur = document.createElement("td");
            tdUmur.textContent = data[i].umur;
            tr.appendChild(tdUmur);

            const tdAsrama = document.createElement("td");
            tdAsrama.textContent = data[i].nama_asrama;
            tr.appendChild(tdAsrama);

            const tdJurusan = document.createElement("td");
            tdJurusan.textContent = data[i].jurusan;
            tr.appendChild(tdJurusan);

            const tdKondisi = document.createElement("td");
            tdKondisi.textContent = data[i].kondisi;
            tr.appendChild(tdKondisi);

            const tdDetail = document.createElement("td");
            const anchorDetail = document.createElement("button");
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',() => {
                location.href = `/divkes/mahasiswa/edit-mahasiswa/?nim=${data[i].nim}`
            })
            const iconEdit = document.createElement('i');
            iconEdit.className= "fa-solid fa-pen-to-square fa-xl";
            anchorDetail.appendChild(iconEdit)
            
            const buttonDelete = document.createElement("button");
            buttonDelete.className = 'btn-hapus'
            buttonDelete.addEventListener('click',() => {
                deleteMahasiswa(data[i].nim)
            })
            const iconHapus = document.createElement('i');
            iconHapus.className= "fa-solid fa-trash fa-xl";
            buttonDelete.appendChild(iconHapus)
            tdDetail.appendChild(anchorDetail);
            tdDetail.appendChild(buttonDelete)
            tr.appendChild(tdDetail);
            document.querySelector("tbody").appendChild(tr)
        }
    }else{
        const trNothing = document.createElement("div");
        trNothing.textContent = 'Data Tidak Ditemukan...'
        trNothing.className = 'data-nothing'
        document.querySelector("tbody").appendChild(trNothing)
    }
}

async function showAllMahasiswa(){
    await fetch("http://localhost:3000/api/mahasiswa/getMahasiswa",{
        method:'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then((response)=> response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            createTabel(res.data);
        }
    });
}

async function showPencarianMahasiswa(cari){
    await fetch(`http://localhost:3000/api/mahasiswa/getMahasiswaByName/${cari}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).
    then((response) => response.json()).then((res) => {
        if(res.status === 'OK'){
            createTabel(res.data)
        }else{
            createTabel()
        }
    })
}

async function deleteMahasiswa(nim){
    if(confirm('Yakin hapus?')){
        await fetch(`http://localhost:3000/api/mahasiswa/remove/${nim}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.status === 'OK'){
                alert(res.message)
                showAllMahasiswa()
            }else{
                alert('error')
            }
        })
    }
}