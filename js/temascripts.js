/////////////////////CAMBIO DE TEMA ///////////////////////////////

let modes = document.getElementById("modes");
let halfButton = document.getElementById("half-button");
let sailorContainer = document.getElementById("sailor-container");
  

let sailorDay = document.getElementById("day");
let sailorNight = document.getElementById("night");

let cambiarEstilo = document.querySelector(".probar");
let button2 = document.querySelector(".button2");


document.getElementById("night").addEventListener("click", function () {
    temaDark();
});

document.getElementById("day").addEventListener("click", function () {
    temaDay();
});


function temaDark(){
    document.getElementById("themes").setAttribute("href", "./css/dark.css");
    sessionStorage.setItem("theme", "dark");
    button2.style.background = "#EE3EFE";
    halfButton.style.background = "#EE3EFE"
}

function temaDay() {
    document.getElementById("themes").setAttribute("href", "./css/styles.css");
    sessionStorage.setItem("theme", "day");
    button2.style.background = "#F7C9F3";
    halfButton.style.background = "#F7C9F3";
}

cambiarTema();

function cambiarTema() {
    if (sessionStorage.getItem("theme") == "dark") {
      temaDark();
    }else{
        temaDay();
    }
  };




/////////////////Estilo dinámico del botón cambiar tema



cambiarEstilo.addEventListener('mouseover', ()=> {
    button2.style.border = "1px dashed #110038";
        halfButton.style.border = "1px dashed #110038";
        button2.style.boxshadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
        halfButton.style.boxshadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";

    if(sessionStorage.getItem("theme") == "day"){ 
        button2.style.background = "#E6BBE2";
        halfButton.style.background = "#E6BBE2";
    }else{
        button2.style.background = "#CE36DB";
        halfButton.style.background = "#CE36DB";
    }
})

cambiarEstilo.addEventListener('mouseout', ()=> {
    button2.style.border = "1px solid #110038";
    halfButton.style.border = "1px solid #110038";
    if(sessionStorage.getItem("theme") == "day"){
    button2.style.background = "#F7C9F3";
    halfButton.style.background = "#F7C9F3";
    }else{
        button2.style.background = "#EE3EFE";
        halfButton.style.background = "#EE3EFE";
    }
})


cambiarEstilo.addEventListener('click', ()=>{
       if(modes.style.display == "block"){
           modes.style.display = "none";
       }else{
        modes.style.display = "block"
       }

       let title = document.getElementById("title-crear-gifo");
       if(title){
        modes.style.left = "54.3rem";
       }

})

sailorContainer.addEventListener("mouseleave", ()=>{
    if(modes.style.display = 'block'){
        modes.style.display = 'none'
    }
})

// MIS GIFOS

document.getElementById("mis-gifos-boton").addEventListener("mouseover", ()=>{
    document.getElementById("span-mis-gifos").style.textDecoration = 'underline';
})

document.getElementById("mis-gifos-boton").addEventListener("mouseout", ()=>{
    document.getElementById("span-mis-gifos").style.textDecoration = 'none';
})

