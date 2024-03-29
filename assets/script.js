const works = fetch('http://localhost:5678/api/works')

const projets = document.querySelector("gallery")

projets.src = "http://localhost:5678/api/works"+works.title

console.log(works.lenght)