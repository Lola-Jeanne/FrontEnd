async function login(){
    const email =  document.getElementById("email").value
    const password = document.getElementById("password").value

const user = {
    email:'email',
    password:'password'
}

let reponse = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json" 
    },
    body: JSON.stringify(user)
    })

if (reponse.ok) {
    const result = await Response.json()
    console.log(result);
}
else {
    console.error('Erreur')
}
    console.log(email)

    let result = await reponse.json();
}