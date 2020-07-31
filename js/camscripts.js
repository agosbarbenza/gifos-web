
//Video
let video = document.getElementById("video");
let constraintObj = { //Lo que quiero obtener del getUserMedia
    audio: false,
    video: {
        height: { 
            max: 480 
        }}
}; 
let blob

//Guardar gifo
let form = new FormData();

let vidContainer = document.getElementById("vidContainer");
let vistaPreviaContainer = document.getElementById("vistaPreviaContainer");

//Botones
let btnStart = document.getElementById("btn-start");


//Botones capturar
let btnCamCapturar = document.getElementById("btn1")
let btnCapturar = document.getElementById("btn2");
let btnsCapturar = [btnCamCapturar, btnCapturar];
let containerCapturar = document.getElementById("btns-capturar-cam");

//botones listo
let containerBtns = document.getElementById("btns-listo");
let btnListo = document.getElementById("btn-listo");
let btnRecordIcon= document.getElementById("record-icon");
let btnsListo = [btnListo, btnRecordIcon];

//boton repetir
let btnRepetir = document.getElementById("btnRepetir");

let btnStartRepetir = [btnStart, btnRepetir];

//boton subir gifo
let subirBtn = document.getElementById("subir-btn");

//boton cancelar
let btnCancelar = document.getElementById("btn-cancel");

//boton copiar enlace
let copiarEnlaceBtn = document.getElementById("btn-copiar-enlace");
let descargarBtn = document.getElementById("btn-descargar-gifo");

//boton mis gifos
let misGifosBtn = document.getElementById("mis-gifos-boton");


//Cards
let crearGifosCard = document.getElementById("crearGifos");
let chequeoCard = document.getElementById("chequeo");
let vistaPreviaCard = document.getElementById("vistaPrevia");
let subiendoCard = document.getElementById("subiendo-gifo-card");
let exitoCard = document.getElementById("exito-card");
let misGifosCard = document.getElementById("misGifos");

//ID Gif
let gifId

window.onload = ()=>{
    misGifos();
    
    if (localStorage.getItem("IDGif") === null) {
        document.getElementById("aun").style.display = "block";
    }else{
        document.getElementById("aun").style.display = "none";
    }
}


function getCam(){
    btnStartRepetir.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            crearGifosCard.style.display = "none";
            chequeoCard.style.display = "block";
            vistaPreviaCard.style.display = "none";
            containerBtns.style.display = "none";
            containerCapturar.style.display = "flex";
            navigator.mediaDevices.getUserMedia(constraintObj)//método para acceder a la cámara
                .then(function(mediaStreamObj){ //mediaStreamObj es lo que obtengo
                    grabacion = mediaStreamObj; 
                    video.srcObject = mediaStreamObj; // relleno la etiqueta video con lo que obtuve
                    video.play() //comienza la cámara
                    })
                .catch(error =>{
            console.log(error); 
        })
        })
    })
    
}

getCam()

let grabando;

function recordCam(){
    btnsCapturar.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            vistaPreviaContainer.innerHTML = "";
            containerCapturar.style.display = "none";
            containerBtns.style.display = "flex";
            document.getElementById("titulo").innerText = "Capturando tu gifO";
            btnRecordIcon.classList.add('record');
            btnListo.classList.add('record');
            recorder = RecordRTC(grabacion, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                 console.log('started')
               },
              });
            recorder.startRecording();
            grabando = true;
            setTimeout(() => {         
            grabando = false;
            }, 2000); //debe grabar mínimo 2 segundos
        })

    })

}
recordCam()

function stopRecord(){
    btnsListo.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            if (grabando == false){ //si grabó mínimo 2 segundos
        chequeoCard.style.display = "none";
        vistaPreviaCard.style.display = "block";
        let gif = document.createElement("img");
        gif.style.width = "100%";
        vistaPreviaContainer.appendChild(gif);
        recorder.stopRecording();
        blob = recorder.getBlob();
        gif.setAttribute("src", URL.createObjectURL(blob));
        vistaPreviaContainer.style.display = "block";
        recorder.destroy(); 
        recorder = null; 
        grabacion.getTracks().map(function (cam) {
            cam.stop();
          });
        }
    })
    
})
}

stopRecord()

let arrayGifos = [];
let gifosContainer = document.getElementById("misGifosContainer");

function subirGifo(){
    subirBtn.addEventListener('click', ()=>{
        vistaPreviaCard.style.display="none";        
        subiendoCard.style.display ="block";
        espera();
        let gif = document.createElement('img');
        gif.style.width = "100%";
        document.getElementById("container-gif").appendChild(gif);
        gif.setAttribute("src", URL.createObjectURL(blob));
        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
        fetch("https://upload.giphy.com/v1/gifs?api_key=oe44FnxvDSz23VKoIEmtoRbzdYL7ISE1",
        {
            method: "POST",
            body: form,
        }
        ).then(function(response){
            return response.json()} //pasar a json para acceder al id
        ).then(function (response){
            console.log(response);
            gifId = response.data.id;
            console.log(gifId);
            arrayGifos = JSON.parse(localStorage.getItem("IDGif")) || []; //response está en json, hay que pasarlo a objeto. Si hay algo, pasarlo a objeto, si no hay nada, dejarlo vacío.
            arrayGifos.unshift(gifId);  
            localStorage.setItem("IDGif", JSON.stringify(arrayGifos)); // convierte el array en un string.  
            document.getElementById("aun").style.display = "none";
            misGifos();
         }).catch(function(error){
            console.log(error+" Se produjo un error")
        });
        
    })
}

subirGifo()

function espera(){
    let barraRosa = document.getElementById("barra-rosa");
    let width = 1;
    let progress = setInterval(avanzar, 50);
    function avanzar(){
        if(width >= 100){
            clearInterval(progress)
            subiendoCard.style.display ="none";
            exitoCard.style.display= "block";
        }else{
            width++;
            barraRosa.style.width = width + "%";
        }
    }
}

function cancelarSubida(){
    btnCancelar.addEventListener('click', ()=>{
        window.location.href = "index.html";
    })
}
cancelarSubida();

document.getElementById("boton-listo-gifo-creado").addEventListener('click', ()=>{
    exitoCard.style.display = "none";
    /*misGifosCard.style.top = "10rem";*/
})


/*************************MIS GIFOS ***********************/
function misGifos(){
    gifosContainer.innerHTML=" ";
    arrayGifos = JSON.parse(localStorage.getItem("IDGif")) || [];
    if (typeof (arrayGifos[0]) == "string"){
    for (let i = 0; i < arrayGifos.length; i++) {
        let gif = document.createElement("img")
        gifosContainer.appendChild(gif);
        gif.src = "https://media.giphy.com/media/" + arrayGifos[i] + "/giphy.gif";
        gif.style.marginTop = "1rem";
        misGifosCard.appendChild(gifosContainer).appendChild(gif);
}
}
}



//'''''''''''''''''''''''FUNCIONALIDAD COPIAR'''''''''''''''''''''''''''

let urlCopy
let inputCopy

function copiarLink(){

    copiarEnlaceBtn.addEventListener('click', ()=>{
        urlCopy = "https://media.giphy.com/media/"+gifId+"/giphy.gif";
        copiar(urlCopy);
        copiarEnlaceBtn.innerText = "Enlace copiado!";
        setTimeout(() => {
            copiarEnlaceBtn.innerText = "Copiar Enlace Gifo";
          }, 1500);
     
    })
}

function copiar(urlacopiar){
    inputCopy = document.createElement("textarea");
    document.getElementById("divInput").appendChild(inputCopy);
    inputCopy.value = urlacopiar;
    inputCopy.select(); //método para seleccionar
    document.execCommand('copy'); //método para copiar
    document.getElementById("divInput").removeChild(inputCopy);
}

copiarLink()

//''''''''''''''''''FUNCIONALIDAD DESCARGAR''''''''''''''''''''''''''''

function descargarGif(){
    descargarBtn.addEventListener('click', ()=>{
        let descarga = document.createElement('a');
        document.getElementById("divInput").appendChild(descarga);
        descarga.setAttribute('href',URL.createObjectURL(blob));
        descarga.setAttribute('download', 'mygif.gif');
        document.getElementById("divInput").removeChild(descarga);
        descarga.click(); //simula el click del 'a'
    })    
}

descargarGif()
