showAllDataSakit()

document.querySelector('.btn-cari').onclick =  (async (e) => {
    e.preventDefault();
    const cari = document.querySelector('.input-pencarian').value
    if(cari){
        showPencarianDataSakit(cari)
    }else{
        showAllDataSakit()
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
            tdNama.textContent = data[i].nama;
            tr.appendChild(tdNama);
    
            const tdAsrama = document.createElement("td");
            tdAsrama.textContent = data[i].nama_asrama;
            tr.appendChild(tdAsrama);
    
            const tdKet = document.createElement("td");
            tdKet.textContent = data[i].keterangan;
            tr.appendChild(tdKet);
    
            const tdTgll = document.createElement("td");
            tdTgll.textContent = data[i].tgl_sakit?.split('T')[0];
            tr.appendChild(tdTgll);

            const tdDetail = document.createElement("td");
            const anchorDetail = document.createElement("button");
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',() => {
                location.href = `/divkes/data-sakit/edit-data-sakit/?nama=${data[i].nama}`
            })
            const iconEdit = document.createElement('i');
            iconEdit.className= "fa-solid fa-pen-to-square fa-xl";
            anchorDetail.appendChild(iconEdit)
            tdDetail.appendChild(anchorDetail)
            tr.appendChild(tdDetail)
            
            document.querySelector("tbody").appendChild(tr)
        }
    }else{
        const trNothing = document.createElement("div");
        trNothing.textContent = data;
        trNothing.className = 'data-nothing'
        document.querySelector("tbody").appendChild(trNothing)
    }
}
    

    

async function showAllDataSakit(){
    await fetch("http://localhost:3000/api/kondisiMahasiswa/getDataSakit",{
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

async function showPencarianDataSakit(cari){
    await fetch(`http://localhost:3000/api/kondisiMahasiswa/getDataSakitByNama/${cari}`,{
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