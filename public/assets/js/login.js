document.addEventListener("DOMContentLoaded", () => {
    if(document.cookie){
        document.getElementById("email").value = getCookie('email')
        document.getElementById("password").value = getCookie('password')
        keepLogged = document.getElementById('keepLogged').checked = true
    }
});

function getCookie (name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const login = document.getElementById("log-in").onsubmit = (e) =>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const keepLogged = document.getElementById('keepLogged').checked
    fetch("http://localhost:3000/api/user/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((response)=>response.json())
    .then((res)=> {
        if(res.status=="OK"){
            if(keepLogged){
                document.cookie = `email=${email}`
                document.cookie = `password=${password}`
            }else{
                document.cookie = `email=`
                document.cookie = `password=`
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user',res.data.id_user)
            window.location.href="/divkes/dashboard"
        }
    })
}

