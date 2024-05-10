// let modal = null
// const focusableSelector = 'button, a, input, textarea'
// let focusbales = []

// // Ouverture de la modale 

// const openModal = function (e) {
//     e.preventDefault()
//     // modal = document.querySelector(e.target.getAttribute('href'))
//     modal = document.querySelector(e.target.getAttribute('.txt-edition'))
//     focusbales = Array.from(modal.querySelectorAll(focusableSelector))
//     modal.style.display = null
//     modal.removeAttribute('aria-hidden')
//     modal.setAttribute('aria-modal', 'true')
//     modal.addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
// }

// // Fermeture de la modale

// const closeModal = function (e) {
//     if (modal === null ) return
//     e.preventDefault()
//     modal.style.display = "none"
//     modal.setAttribute('aria-hidden', 'true')
//     modal.removeAttribute('aria-modal')
//     modal.removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
//     modal = null
// }

// const stopPropagation = function (e) {
//     e.stopPropagation()
// }

// // Pour focuser que les éléments dans la modale (c'est un peu compliqué son histoire)
// const focusInModal = function (e){
//     e.preventDefault()
//     let index = focusbales.findIndex(f => f === modal.querySelector(':focus'))
//     index ++
//     if (index >= focusbales.length) {
//         index = 0
//     }
//     focusbales [index].focus()
// }

// document.querySelectorAll('.js-modal').forEach( a=> {
//     a.addEventListener('click', openModal)
// })

// window.addEventListener('keydown', function(e) {
//     if (e.key === "Escape" || e.key === "Esc") {
//         closeModal(e)
//     }
//     if (e.key === "Tab" && modal !== null){
//         focusInModal(e)
//     }
// })

document.addEventListener('DOMContentLoaded', function(){
    const openModalButtons = document.querySelectorAll('.txt-edition')
    const closeModalButtons = document.querySelectorAll('.js-modal-close')

    const modal = document.querySelector('#modal')
    const modalContent = modal.querySelector('.modal-content')

    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e){
            e.preventDefault()
            modal.style.display = 'flex'
            modal.setAttribute('aria-hidden', 'false')
            modal.setAttribute('aria-modal', 'true')
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault()
            modal.style.display = 'none'
            modal.setAttribute('aria-hidden', 'true')
            modal.setAttribute('aria-modal')
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
})