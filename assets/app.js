
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

document.addEventListener('DOMContentLoaded', function (){
    const modal = document.querySelector('#modal')
    const modalContent = modal.querySelector ('.modal-content')
    const ajouterPhotoBtn =document.querySelector('.btn-ajouter-modal')
    const formAjoutPhoto = document.querySelector('.form-ajouter-photo')
    const openModal = document.querySelectorAll('.txt-edition')
    const closeModal = document.querySelectorAll('#closeModalIcone')

   // Pour ouvrir la modale 

function ouvrirModalAfficherTraveaux() {
    const modal = document.querySelector('#modal')
    // const modalContent = document.querySelector('.modal-content')
    // const ajouterPhoto = document.getElementById('ajouterPhoto')

    modal.style.display = 'flex'
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
    afficheTravauxModal(globalWorks)
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
            modal.setAttribute('aria-modal')
        }
    })

    modalContent.addEventListener('click', function(e) {
        e.stopPropagation()
    })

    closeModal.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault()
            fermerModal()
            
        })
    })
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            fermerModal()
        }
    })

    modalContent.addEventListener('click', function (e) {
        e.stopPropagation()
    })
    if (ajouterPhotoBtn) {
        ajouterPhotoBtn.addEventListener('click', function() {
            modalContent.style.display = 'none'
            formAjoutPhoto.style.display = 'block'
        })
    }
    if (formAjoutPhoto) {
        formAjoutPhoto.addEventListener('submit', function (e) {
            e.preventDefault()

            const titre = document.querySelector('#titre').value
            const image = document.querySelector('#image').files[0]

            if (!titre || !image) {
                console.log ("Titre ou image manquant")
                return
            }

            const formData = new FormData()
            formData.append('titre', titre)
            formData.append('image', image)

            callApi(`http://localhost:5678/api/works`, 'POST', formData)
            .then(response => {
                if(response.ok) {
                    console.log("Photo ajoutée")
                    formAjoutPhoto.reset()
                    formAjoutPhoto.style.display = 'none'
                    modalContent.style.display = 'block'

                    ouvrirModalAfficherTraveaux()
                } else {
                    console.log("Erreur")
                }
            })
            .catch(error => {
                console.log("Erreur: ", error)
            })
        })
    }
})

function afficheTravauxModal (works) {
    const modalContent = document.querySelector('#modal .modal-content')
    modalContent.innerHTML = ""

    works.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const trashLogo = document.createElement("button")

        img.src = work.imageUrl
        img.style.width = "80px"
        img.setAttribute('data-id', work.id)

        trashLogo.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trashLogo.classList.add('trashLogo')
        trashLogo.addEventListener('click', () => supprimerImage(work.id, figure))

        figure.appendChild(img)
        figure.appendChild(trashLogo)
        modalContent.appendChild(figure)
    })
    function ouvrirModalAfficherTraveaux() {
        const modal = document.querySelector('#modal')
        modal.style.display ='flex'
        modal.setAttribute('aria-hidden', 'false')
        modal.setAttribute('aria-modal', 'true')
        afficheTravauxModal(globalWorks)

        function closeModal() {
            const modal = document.querySelector('#modal');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }

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
        async function supprimerImage(imageId, figureElement) {
            const response = await callApi(`http://localhost:5678/api/works/${imageId}`, 'DELETE');
            if (response.status == 204) {
                const galleryPhoto = document.querySelector(`.gallery img[data-id='${imageId}']`);
                if (galleryPhoto) {
                    galleryPhoto.closest('figure').remove();
                }
                figureElement.remove();
                console.log('Image supprimée');
            } else {
                console.log('Erreur lors de la suppression de l\'image');
            }
        }
    }
}
})