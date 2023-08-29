showAllPembellian()

document.querySelector('.btn-tambah').onclick = ((e)=>{
    location.href = '/divkes/pembelian-obat/tambah-pembelian'
})

function createTabel(data){
    document.querySelector("tbody").textContent =''
    if(typeof data !== "string"){
        for (let i=0;i<data.length;i++){
            const tr = document.createElement("tr")
    
            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor);
    
            const tdId = document.createElement("td");
            tdId.textContent = data[i].id_pembelian_obat;
            tr.appendChild(tdId);
    
            const tdKode = document.createElement("td");
            tdKode.textContent = data[i].kode_obat;
            tr.appendChild(tdKode);
    
            const tdJml = document.createElement("td");
            tdJml.textContent = data[i].jumlah_obat;
            tr.appendChild(tdJml);
    
            const tdTgl = document.createElement("td");
            tdTgl.textContent = data[i].tgl_beli?.split('T')[0];
            tr.appendChild(tdTgl);
    
            const tdHarga = document.createElement("td");
            tdHarga.textContent = data[i].harga_obat;
            tr.appendChild(tdHarga);
    
            const tdDetail = document.createElement("td");
            const anchorDetail = document.createElement("button");
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',()=>{
                location.href = `/divkes/pembelian-obat/edit-pembelian/?id_pembelian_obat=${data[i].id_pembelian_obat}`
            })
            const iconEdit = document.createElement('i');
            iconEdit.className= "fa-solid fa-pen-to-square fa-xl";
            anchorDetail.appendChild(iconEdit)
            
            const buttonDelete = document.createElement("button");
            buttonDelete.className = 'btn-hapus'
            buttonDelete.addEventListener('click',()=>{
                deletePembelianObat(data[i].id_pembelian_obat)
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
    


async function showAllPembellian(){
    await fetch("http://localhost:3000/api/laporan/getPembelian",{
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
                createTabel("Data kosong")
            } 
        }
    })
}

async function deletePembelianObat(id_pembelian_obat){
    if(confirm('Apakah anda yakin ingin mengahapus')){
        await fetch(`http://localhost:3000/api/laporan/remove/${id_pembelian_obat}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === 'OK'){
                alert(res.message)
                showAllPembellian()
            }else{
                alert('eror')
            }
        })
    }
}