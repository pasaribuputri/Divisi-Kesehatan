showAllRiwayatSakit()

document.querySelector('.btn-cari').onclick =  (async (e) => {
    e.preventDefault();
    const cari = document.querySelector('.input-pencarian').value
    if(cari){
        showPencarianRiwayatSakit(cari)
    }else{
        showAllRiwayatSakit()
    }
})

function createTabel(data){
    document.querySelector("tbody").textContent=''
    if(typeof data !== "string"){
        for(let i=0;i<data.length;i++){

            const tr = document.createElement("tr")
            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor);

            const tdNama = document.createElement("td");
            tdNama.textContent = data[i]?.nama;
            tr.appendChild(tdNama);

            const tdAsrama = document.createElement("td");
            tdAsrama.textContent = data[i]?.nama_asrama;
            tr.appendChild(tdAsrama);

            const tdKet = document.createElement("td");
            tdKet.textContent = data[i]?.keterangan;
            tr.appendChild(tdKet);

            const tdTgl = document.createElement("td");
            tdTgl.textContent = data[i].tgl_sakit?.split('T')[0];
            tr.appendChild(tdTgl);

            const tdTgll = document.createElement("td");
            tdTgll.textContent = data[i].tgl_sembuh?.split('T')[0];
            tr.appendChild(tdTgll);

            const tdDetail = document.createElement("td");               
            const buttonDelete = document.createElement("button");
            buttonDelete.className = 'btn-hapus'
            buttonDelete.addEventListener('click',()=>{
                deleteRiwayatSakit(data[i].nim)
            })
            const iconHapus = document.createElement('i');
            iconHapus.className= "fa-solid fa-trash fa-xl";
            buttonDelete.appendChild(iconHapus)
            tr.appendChild(buttonDelete)
            tdDetail.appendChild(buttonDelete)
            tr.appendChild(tdDetail);

            document.querySelector("tbody").appendChild(tr)
        }
    }else{
        console.log("false")
        const trNothing = document.createElement("div");
        trNothing.textContent = data;
        trNothing.className = 'data-nothing'
        document.querySelector("tbody").appendChild(trNothing)
    }
}
        


async function showAllRiwayatSakit(){
    await fetch("http://localhost:3000/api/kondisiMahasiswa/getRiwayatSakit",{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            if(res.data.length>0){
                createTabel(res.data)
            }else{
                createTabel("Data Kosong")
            } 
        }
    })
}

async function deleteRiwayatSakit(nim){
    if(confirm('Apakah anda yakin ingin mengahapus')){
        await fetch(`http://localhost:3000/api/kondisiMahasiswa/removeRiwayatSakit/${nim}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === 'OK'){
                alert(res.message)
                showAllRiwayatSakit()
            }else{
                alert('eror')
            }
        })
    }
}

async function showPencarianRiwayatSakit(cari){
    await fetch(`http://localhost:3000/api/kondisiMahasiswa/getRiwayatSakitByNama/${cari}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            createTabel(res.data)
        }else{
            createTabel("Data tidak ditemukan")
        }
    })
}