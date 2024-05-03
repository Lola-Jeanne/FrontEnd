
async function login(){
    const email =  document.getElementById("email").value
    const password = document.getElementById("password").value

    const user = {
        email: email,
        password: password
    }
    console.log(email)

    let reponse = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
        })
    console.log(reponse);

    if (reponse.ok) {
        const result = await reponse.json()
        localStorage.setItem("token", result.token)
        window.location.href = "index.html"
    }
    else {
        document.getElementById("erreur").innerHTML= "Erreur: L'adresse e-mail ou le mot de passe est incorrect"
    }

    let result = await reponse.json();
}

function modeEdition(){
    console.log("La fonction est ok")
    document.querySelector("#option-utilisateur").classList.add("visible")
}

document.addEventListener("DOMContentLoaded", function(){ //permet de vérifier que tout le contenu de la page soit chargé avant la fonction
    if(localStorage.getItem("token")){
        modeEdition()
    }
})


