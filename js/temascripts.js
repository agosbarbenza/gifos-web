/////////////////////CAMBIO DE TEMA ///////////////////////////////

let modes = document.getElementById("modes");
let halfButton = document.getElementById("half-button");
let sailorContainer = document.getElementById("sailor-container");

/////////////////Estilo dinámico del botón cambiar tema

let cambiarEstilo = document.querySelector(".probar");
let button2 = document.querySelector(".button2");

cambiarEstilo.addEventListener('mouseover', ()=> {
        button2.style.border = "1px dashed #110038";
        halfButton.style.border = "1px dashed #110038";
        button2.style.boxshadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
        halfButton.style.boxshadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
        button2.style.background = "#E6BBE2";
        halfButton.style.background = "#E6BBE2";
})

cambiarEstilo.addEventListener('mouseout', ()=> {
    button2.style.border = "1px solid #110038";
    halfButton.style.border = "1px solid #110038";
    button2.style.background = "#F7C9F3";
    halfButton.style.background = "#F7C9F3";
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