const projets = document.querySelector(".gallery")

function afficheTravaux(listeTravaux){
    projets.innerHTML = ""
    listeTravaux.forEach(work => {
        const figure = document.createElement("figure")
        projets.appendChild(figure)

        const img = document.createElement("img")
        figure.appendChild(img)
        img.src = work.imageUrl

        const figcaption = document.createElement("figcaption")
        figure.appendChild(figcaption)
        figcaption.innerHTML = work.title
    });
}

let globalWorks = []

async function travaux() {

    const reponse = await fetch('http://localhost:5678/api/works')

    const works = await reponse.json()

    globalWorks = works

    afficheTravaux(works)

    const filtreObjet = document.querySelector("#filtre-objets")
    filtreObjet.addEventListener("click", function(){
        
        const travauxFiltre = works.filter((work) => work.categoryId == 1 )

        afficheTravaux(travauxFiltre)

        console.log(travauxFiltre)
    })
    
    const filtreAppartement = document.querySelector("#filtre-appartements")
    filtreAppartement.addEventListener("click", function(){
        
        const travauxFiltre = works.filter((work) => work.categoryId == 2 )

        afficheTravaux(travauxFiltre)

        console.log(travauxFiltre)
    })

    const filtreHotel = document.querySelector("#filtre-hotels")
    filtreHotel.addEventListener("click", function(){
        
        const travauxFiltre = works.filter((work) => work.categoryId == 3 )

        afficheTravaux(travauxFiltre)

        console.log(travauxFiltre)
    })

    const filtreTous = document.querySelector("#filtre-tous")
    filtreTous.classList.add('bouton-actif')
    filtreTous.addEventListener("click", function(){
        
        const travauxFiltre = works

        afficheTravaux(travauxFiltre)
        console.log(travauxFiltre)
        document.querySelectorAll('.bouton-filtre').forEach(btn => {
            btn.classList.remove('bouton-actif')
        })
        this.classList.add('bouton-actif')
    })
    
// Bouton de filtres 

document.querySelectorAll('.bouton-filtre').forEach( button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.bouton-filtre').forEach(btn => {
            btn.classList.remove('bouton-actif');
        })
        this.classList.add('bouton-actif');
    })
})

}

travaux()

function modeEdition(){
    console.log("La fonction est ok")
    document.querySelectorAll(".mode-edition").forEach(Element => {
        Element.classList.remove("invisible")
    })
    document.querySelectorAll(".projet-modifier").forEach(Element => {
        Element.classList.remove("invisible")
    })

    document.querySelector(".filtres").style.display= 'none'

    const logoutLink = document.getElementById("logoutLink")
    logoutLink.textContent = 'logout'
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault()
        localStorage.removeItem('token')
        window.location.href = './index.html'
    })
}

document.addEventListener("DOMContentLoaded", function(){ //permet de vérifier que tout le contenu de la page soit chargé avant la fonction
    if(localStorage.getItem("token")){
        modeEdition()
    }
})