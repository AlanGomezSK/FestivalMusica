document.addEventListener("DOMContentLoaded", function(){
    iniciarApp()
})

function iniciarApp(){
    crearGaleria();
    scrollNav();
}

function scrollNav(){
    const enlaces = document.querySelectorAll(".navegacion_principal a")
    console.log(enlaces)
    enlaces.forEach(enlace=>{
        enlace.addEventListener("click", function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({behavior: "smooth"})
        })
    })
}
function crearGaleria(){
    const galeria = document.querySelector(".galeria_img")
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement("picture")
        imagen.innerHTML=`<source srcset="build/img/thumb/${i}.webp" type="image/webp"> 
        <img src="build/img/thumb/${i}.jpg" alt="Imagen de un dj">`
        imagen.onclick = function(){
            mostrarImagen(i)
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(indice){
    const imagen = document.createElement("picture")
    imagen.innerHTML=`<source srcset="build/img/grande/${indice}.webp" type="image/webp"> 
    <img src="build/img/grande/${indice}.jpg" alt="Imagen de un dj">`
    const boton = document.createElement("p")
    boton.classList.add("boton")
    boton.innerText = "X"
    const overlay = document.createElement("div")
    overlay.appendChild(boton)
    boton.onclick = function(){
        overlay.remove()
        body.classList.remove("fijar-body")
    }
    overlay.appendChild(imagen)
    overlay.classList.add("overlay")
    const body = document.querySelector("body")
    body.appendChild(overlay)
    body.classList.add("fijar-body")
    overlay.onclick = function(){
        overlay.remove()
        body.classList.remove("fijar-body")
    }

}