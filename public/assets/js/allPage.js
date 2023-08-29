document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    location.href = "/divkes/unauthentication";
  }
});
getUser()
      const namaBulan = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];
let mydate = new Date();
      let month = namaBulan[mydate.getMonth()];
      let day = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ][mydate.getDay()];
      let str =
        day +
        ", " +
        mydate.getDate() +
        " " +
        month +
        " " +
        mydate.getFullYear();
      const date = (document.querySelector(".current-date").textContent = str);

function getUser(){
  fetch('http://localhost:3000/api/mahasiswa/getUserByID/'+localStorage.getItem('user'),{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then((response) => response.json())
  .then((res) => {
    document.querySelector('.user-name .name').textContent = res.data[0].username
    document.querySelector('.user-name .role').textContent = res.data[0].role
  })
}

const toggleSidebar = document.querySelector(".toggleSidebar");
      const sidebar = document.querySelector(".sidebar");
      toggleSidebar.addEventListener("click", (e) => {
        sidebar.classList.toggle("active");
      });

      const coll = document.querySelector(".collapse-info-user");
      document.querySelector(".info-user").onclick = (e) => {
        coll.classList.toggle("active");
        document.querySelector(".info-user").classList.toggle("active");
      };

      const childMahasiswa = document.querySelector(".child.mahasiswa");
      const navMahasiswa = (document.querySelectorAll(".nav-item")[1].onclick =
        (e) => {
          childMahasiswa.classList.toggle("active");
          document.querySelectorAll(".nav-item")[1].classList.toggle("active");
        });

      const childObat = document.querySelector(".child.obat");
      const navObat = (document.querySelectorAll(".nav-item")[2].onclick = (
        e
      ) => {
        childObat.classList.toggle("active");
        document.querySelectorAll(".nav-item")[2].classList.toggle("active");
      });

      const childLaporan = document.querySelector(".child.laporan");
      const navLaporan = (document.querySelectorAll(".nav-item")[3].onclick = (
        e
      ) => {
        childLaporan.classList.toggle("active");
        document.querySelectorAll(".nav-item")[3].classList.toggle("active");
      });

document.querySelector('.nav-item-user.log-out').onclick = ((e)=>{
  localStorage.clear()
  location.href='/divkes/login/'
})

document.querySelector('.nav-item.dashboard').addEventListener('click', (e) => {
  location.href='/divkes/dashboard/'
})


document.querySelector('.nav-item-user.data-mahasiswa').onclick = ((e) => {
  location.href='/divkes/mahasiswa/'
})

document.querySelector('.nav-item-user.data-sehat').onclick = ((e) => {
  location.href='/divkes/data-sehat/'
})

document.querySelector('.nav-item-user.data-sakit').onclick = ((e) => {
  location.href='/divkes/data-sakit/'
})

document.querySelector('.nav-item-user.data-obat').onclick = ((e) => {
  location.href='/divkes/obat/'
})

document.querySelector('.nav-item-user.riwayat-sakit').onclick = ((e) => {
  location.href='/divkes/riwayat-sakit/'
})

document.querySelector('.nav-item-user.pengeluaran-dana').onclick = ((e) => {
  location.href='/divkes/pengeluaran-dana/'
})

document.querySelector('.nav-item-user.pembelian-obat').onclick = ((e) => {
  location.href='/divkes/pembelian-obat/'
})