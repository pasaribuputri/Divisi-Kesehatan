showAllObat()

document.querySelector('.btn-cari').onclick =  (async (e) => {
    e.preventDefault();
    const cari = document.querySelector('.input-pencarian').value
    if(cari){
        showPencarianObat(cari)
    }else{
        showAllObat()
    }
})

document.querySelector('.btn-tambah').onclick = ((e)=>{
    location.href = '/divkes/obat/tambah-obat'
})

function createTabel(data){
    document.querySelector("tbody").textContent = ''
    if(typeof data!== "string"){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")
    
            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor)
    
            const tdKodeObat = document.createElement("td")
            tdKodeObat.textContent = data[i].kode_obat
            tr.appendChild(tdKodeObat)
    
            const tdNamaObat = document.createElement("td")
            tdNamaObat.textContent = data[i].nama_obat
            tr.appendChild(tdNamaObat)
    
            const tdKetObat = document.createElement("td")
            tdKetObat.textContent = data[i].detail_obat
            tr.appendChild(tdKetObat)

            const tdStokObat = document.createElement("td")
            tdStokObat.textContent = data[i].stok_obat
            tr.appendChild(tdStokObat)
    
            const tdDetail = document.createElement("td");
            const anchorDetail = document.createElement("button");
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',()=>{
                location.href = `/divkes/obat/edit-obat?kode_obat=${data[i].kode_obat}`
            })
            const iconEdit = document.createElement('i');
            iconEdit.className= "fa-solid fa-pen-to-square fa-xl";
            anchorDetail.appendChild(iconEdit)
            
            const buttonDelete = document.createElement("button");
            buttonDelete.className = 'btn-hapus'
            buttonDelete.addEventListener('click',()=>{
                deleteObat(data[i].kode_obat)
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
        trNothing.textContent = data
        trNothing.className = 'data-nothing'
        document.querySelector("tbody").appendChild(trNothing)
    }
}
    

async function showAllObat(){
    await fetch("http://localhost:3000/api/obat/getObat",{
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

async function showPencarianObat(cari){
    await fetch(`http://localhost:3000/api/obat/getOne/${cari}`,{
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
                createTabel("Data tidak ditemukan")
            }    
        }
    })
}

async function deleteObat(kode_obat){
    if(confirm('Yakin Hapus')){
        await fetch(`http://localhost:3000/api/obat/remove/${kode_obat}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === 'OK'){
                alert(res.message)
                location.href = '/divkes/obat'
            }else{
                alert('eror')
            }
        })
    }
}