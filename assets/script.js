async function travaux() {

const reponse = await fetch('http://localhost:5678/api/works')

const works = await reponse.json()

const projets = document.querySelector(".gallery")


works.forEach(work => {
    const figure = document.createElement("figure")
    projets.appendChild(figure)

    const img = document.createElement("img")
    figure.appendChild(img)
    img.src = work.imageUrl

    const figcaption = document.createElement("figcaption")
    figure.appendChild(figcaption)
    figcaption.innerHTML = work.title
});

const filtreObjet = document.querySelector(".filtre-objets")
filtreObjet.addEventListener("click", function(){
    
    const resultat = works.filter((work) => work.categoryId = 1 )
})

console.log(resultat)
}

travaux()
