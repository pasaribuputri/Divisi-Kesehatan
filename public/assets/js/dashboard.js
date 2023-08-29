Chart.defaults.color = '#E7F6F2';
Chart.defaults.borderColor = '#395B64';
async function getHistorySakit(){
  await fetch('http://localhost:3000/api/kondisiMahasiswa/getTotalDataSakitByMonth',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then((response) => response.json()).then((res) => {
    if(res.status === 'OK'){
      var dataBulan = [];
      var dataSakit = [];
      res.data?.map((val) => {
        dataBulan.push(namaBulan[val.bulan-1])  
        dataSakit.push(val.total_sakit);
      })
      const ctx = document.getElementById("my-chart");
        new Chart(ctx, {
          type: "bar",
              data: {
                labels: dataBulan,
                datasets: [
                  {
                    label: "Riwayat Mahasiswa Sakit",
                    data: dataSakit,
                    backgroundColor: "#74acae",
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
    }
  })
}
getHistorySakit()
      document.querySelector(".collapse-info-user .nav-item-user").onclick = (e) => {
        localStorage.clear();
        location.href = "/divkes/login";
      };

window.addEventListener('load', async () => {
  await fetch('http://localhost:3000/api/asrama/getTotalAsrama',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then((response) => response.json()).then((res) => {
    if(res.status === 'OK'){
      document.querySelector('.jumlah-asrama .text-card').textContent = res.data
    }
  })
  await fetch('http://localhost:3000/api/kondisiMahasiswa/getTotalDataSehat',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then((response) => response.json()).then((res) => {
    if(res.status === 'OK'){
      document.querySelector('.mahasiswa-sehat .text-card').textContent = `${res.data} Orang`
    }
  })
  await fetch('http://localhost:3000/api/kondisiMahasiswa/getTotalDataSakit',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then((response) => response.json()).then((res) => {
    if(res.status === 'OK'){
      document.querySelector('.mahasiswa-sakit .text-card').textContent = `${res.data} Orang`
    }
  })
})
      