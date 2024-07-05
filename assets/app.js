
// Pour la preview 
// const imageInput = document.querySelector("#ajouter-img");

// imageInput.addEventListener("change", () => {
// const reader = new FileReader();

// reader.addEventListener("load", () => {
//   document.querySelector(".div-img").style.backgroundImage = `url(${reader.result})`;
// });

// reader.readAsDataURL(imageInput.files[0]);
// });

// form.addEventListener("submit", async function (e) {
//     e.preventDefault();
  
//     //On les stock dans d'autre variable pour cibler la valeur saisie par l'utilisateur ou le fichier chargé
//     const ajoutImage = imageElement.files[0];
//     const ajoutTitle = titleElement.value;
//     const ajoutCategory = categoryElement.value;
  
//     if (!ajoutImage || !ajoutTitle || !ajoutCategory) {
//       return (msgErreur.style.visibility = "visible");
//     } else {
//       msgErreur.style.visibility = "hidden";
//     }
  
//     // Vérifier la taille de l'image
//   if (ajoutImage.size > 4 * 1024 * 1024) {
//     alert("La taille de l'image ne doit pas dépasser 4 Mo, saisissez une nouvelle image.");
//     return;
//   }
  
//   const formData = new FormData(form);
//   console.log(formData);
  
//   const response = await fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//     },
//     body: formData,
//   });
//   const data = await response.json();
//   if (response.status === 201) {
//     listeTravaux.push(data);
//     afficheWorksMini();  // Mettez à jour la liste de travaux dans la modale
  
    // Réinitialisez le formulaire pour un nouvel ajout
//     form.reset();
//     document.querySelector(".div-img").style.backgroundImage = "";
//   }
// });

// Optimisation de code

const modalContent = document.querySelector('#modal .modal-content')

function afficheTravauxModal(works) {
    modalContent.innerHTML = ""
    works.forEach(work => {
        const figure = document.createElement("figure")
        modalContent.appendChild(figure)
        // test logo
        // modalContent.appendChild(figure)

        const img = document.createElement("img")
        // figure.appendChild(img)
        img.src = work.imageUrl
        img.style.width = "80px"
        img.style.height = "105px"
        img.setAttribute('dataId', work.id)
        figure.appendChild(img)

        // test logo 

        const trashLogo = document.createElement("button")
        trashLogo.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trashLogo.classList.add('trashLogo')
        trashLogo.addEventListener('click', () => supprimerImage(work.id, figure))
        figure.appendChild(trashLogo)
    })
}




// Pour fermer la modale
document.addEventListener('DOMContentLoaded', function() {
    const closeModal = document.querySelectorAll('#closeModalIcon')
    const modal = document.querySelector('#modal')
    const modales = document.querySelector('#modal2')
    // const modalContent = document.querySelector('#modalContent')

    closeModal.forEach(button =>{
        button.addEventListener('click', function(e){
            e.preventDefault()
            modal.style.display= 'none'
            modales.style.display= 'none'
        })
    })

    const ajouterPhoto = document.querySelector('.btn-ajout-photo')
    ajouterPhoto.addEventListener('click', function(e) {
        e.preventDefault()
        // modalContent.style.display = 'none'
        ajouterPhoto.style.display='block'
    })
})
// Pour ouvrir la modale 

function ouvrirModalAfficherTraveaux() {
    const modal = document.querySelector('#modal')
    // const modalContent = document.querySelector('.modal-content')
    // const ajouterPhoto = document.getElementById('ajouterPhoto')

    modal.style.display = 'flex'
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
}

document.addEventListener('DOMContentLoaded', function(){
    const openModal = document.querySelectorAll('.txt-edition')

    const modal = document.querySelector('#modal')
    const modalContent = modal.querySelector('.modal-content')
    const ajouterPhoto = document.getElementById('ajouterPhoto')

    openModal.forEach(button => {
        button.addEventListener('click', function(e){
            e.preventDefault()
            ouvrirModalAfficherTraveaux()
            // modal.style.display = 'flex'
            // modal.setAttribute('aria-hidden', 'false')
            // modal.setAttribute('aria-modal', 'true')
        })
    })
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none'
            modal.setAttribute('aria-hidden', 'true')
            modal.setAttribute('aria-modal', 'true')
        }
    })

    modalContent.addEventListener('click', function(e) {
        e.stopPropagation()
    })

    // Test ajout photo

    
        const formAjoutPhoto = document.querySelector('#modal2')
        const btnAjoutPhoto = document.querySelector('.btn-ajout-modal')

        // Pour retourner à la modale précédente
        document.addEventListener('DOMContentLoaded', function() {
        const btnRetour = document.querySelector('#btnRetour')
        
        btnRetour.addEventListener('click', function(e) {
        e.preventDefault()
        formAjoutPhoto.style.display = 'none'
        modalContent.style.display ='flex'
    })
})

        document.getElementById('btnAjouterPhoto').addEventListener('click', function(){
            document.getElementById('imageFile').click()
        })

        document.getElementById('imageFile').addEventListener('change', function(event) {
            const files = event.target.files
            if (files && files.length > 0) {
                const file = files[0]
                const reader = new FileReader()
                reader.onload = function(e) {
                    const previewImage = document.getElementById('previewImage')
                    const logoImage = document.getElementById('Logoimage')
                    const txtImg = document.getElementById('btnAjouterPhoto')
                    const infoImg = document.getElementById('infoImage')
                    const fondImg = document.getElementById('fondImage')

                    logoImage.style.display ='none'
                    txtImg.style.display = 'none'
                    infoImg.style.display = 'none'
                    fondImg.style.textAlign = '-webkit-center'
                    previewImage.src = e.target.result
                    previewImage.style.display = 'flex'
                    previewImage.style.width ='129px'
                    previewImage.style.height ='193px'
                }
                reader.readAsDataURL(file)
            } else {
                console.error('Aucune image sélectionnée')
            }
        })

        btnAjoutPhoto.addEventListener('click', function () {
            modalContent.style.display = 'none'
            formAjoutPhoto.style.display = 'flex'
        })

        const btnSubmit = document.querySelector('#AjoutPhotoSubmit')


        // Envoyer le formulaire
        btnSubmit.addEventListener('click',  async function (e) {
            e.preventDefault()

                const titre = document.querySelector('#titre').value 
                const image = document.querySelector('#imageFile').files[0]
                const categorie = document.querySelector('#categorie').value

                if (!titre || !image) {
                    console.log("Titre ou image manquant")
                    return
                }

                const formData = new FormData ()
                formData.append('image', image)
                formData.append('titre', titre)
                formData.append('categorie', categorie)

                const Response = await fetch (`http://localhost:5678/api/works`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                  },
                body: formData
            })
                    if (Response.ok) {
                        console.log("Photo ajoutée")
                        formAjoutPhoto.reset()
                        formAjoutPhoto.style.display= 'none'
                        modalContent.style.display= 'block'

                        ouvrirModalAfficherTraveaux()
                    } else {
                        console.log("Erreur, impossible d'ajouter la photo")
                    }
            })

//     formAjoutPhoto.addEventListener('submit', function(e) {
//         function ajouterPhoto() {
//             const btnAjoutPhoto = document.querySelector('.btn-ajout-modal')
    
            
//             ajouterPhoto.addEventListener('click', function() {
//             modalContent.style.display = 'none' //Pour cacher les images 
//             formAjoutPhoto.style.display= 'block' //Pour afficher le formulaire
//         })
//         e.preventDefault()
//         callApi(`http://localhost:5678/api/works`, 'POST')

//         const titre = document.querySelector('#titre').value 
//         const image = document.querySelector('#image').files[0]
//         console.log("Titre:", titre)
//         console.log("Image:", image)
//     })
// })

})

async function callApi(endpoint, method, body) {
    const Response = await fetch(endpoint, {
        method: method,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        body: body ? JSON.stringify(body) : null
    })
    // const data = await Response.json()
    return Response
}



// Pour supprimer une image 
 async function supprimerImage(imageId, figureElement) {
    const Response = await callApi(`http://localhost:5678/api/works/${imageId}`, 'DELETE')
    console.log(Response)
        if (Response.status == 204) {
            
            // supprimer l'image de la galerie
            const galleryPhoto = document.querySelector(`.gallery img[dataId='${imageId}']`)
            console.log('Element récupéré')
            if (galleryPhoto) {
                galleryPhoto.closest('figure').remove()
            }
            
            // surpprimer l'image de la modale
            figureElement.remove()
            console.log('Image supprimée')
        } else {
            console.log('Erreur lors de la suppression de l/image')
        }
    }