showAllPengeluaran()

function createTabel(data){
    document.querySelector("tbody").textContent =''
    if(typeof data!== "string"){
        for (let i=0;i<data.length;i++){
            const tr = document.createElement("tr")
    
            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor);
    
            const tdId = document.createElement("td");
            tdId.textContent = data[i].id_pengeluaran_dana;
            tr.appendChild(tdId);
    
            const tdtgl = document.createElement("td");
            tdtgl.textContent = data[i].tgl_pengeluaran?.split('T')[0];
            tr.appendChild(tdtgl);
    
            const tdKet = document.createElement("td")
            tdKet.textContent = data[i].keterangan;
            tr.appendChild(tdKet)
    
            const tdTotal = document.createElement("td");
            tdTotal.textContent = data[i].total_pengeluaran;
            tr.appendChild(tdTotal);

            const tdDetail = document.createElement("td")
            const buttonDelete = document.createElement("button");
            buttonDelete.className = 'btn-hapus'
            buttonDelete.addEventListener('click',()=>{
                deletePengeluaran(data[i].id_pengeluaran_dana)
            })
            const iconHapus = document.createElement('i');
            iconHapus.className= "fa-solid fa-trash fa-xl";
            buttonDelete.appendChild(iconHapus)
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
    

async function showAllPengeluaran(){
    await fetch("http://localhost:3000/api/laporan/getPengeluaran",{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'OK'){
            if(res.data.length){
                createTabel(res.data)
            }else{
                createTabel("Data kosong")
            }     
        }
    })
}

async function deletePengeluaran(id_pengeluaran_dana){
    if(confirm('Apakah anda yakin ingin mengahapus')){
        await fetch(`http://localhost:3000/api/laporan/removePengeluaranDana/${id_pengeluaran_dana}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === 'OK'){
                alert(res.message)
                showAllPengeluaran()
            }else{
                alert('eror')
            }
        })
    }
}