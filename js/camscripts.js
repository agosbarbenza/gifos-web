
//Variables Globales
//*****Gif ID
let gifId
//*****Guardar gifo
let form = new FormData();
//*****Video 
let blob;
let grabacion;
let video = document.getElementById("video");
let constraintObj = { //Lo que quiero obtener del getUserMedia
    audio: false,
    video: {
        height: {
            max: 480
        }
    }
};


//////////////////////////WINDOW ON LOAD///////////////////////////////

window.onload = () => {
    misGifos();

    if (localStorage.getItem("IDGif") === null) {
        document.getElementById("aun").style.display = "block";
    } else {
        document.getElementById("aun").style.display = "none";
    }

    getCam();
    recordCam();
    stopRecord();
    subirGifo();
    cancelarSubida();
    copiarLink();
    descargarGif();
}


//////////////////////////OBTENER CAMARA///////////////////////////////

function getCam() {
    let btnStart = document.getElementById("btn-start");
    let btnRepetir = document.getElementById("btnRepetir");
    let btnStartRepetir = [btnStart, btnRepetir];

    btnStartRepetir.forEach((btn) => {
        btn.addEventListener('click', () => {
            let crearGifosCard = document.getElementById("crearGifos");
            crearGifosCard.style.display = "none";
            let chequeoCard = document.getElementById("chequeo");
            chequeoCard.style.display = "block";
            let vistaPreviaCard = document.getElementById("vistaPrevia");
            vistaPreviaCard.style.display = "none";
            let containerBtns = document.getElementById("btns-listo");
            containerBtns.style.display = "none";
            let containerCapturar = document.getElementById("btns-capturar-cam");
            containerCapturar.style.display = "flex";
            navigator.mediaDevices.getUserMedia(constraintObj)//método para acceder a la cámara
                .then(function (mediaStreamObj) { //mediaStreamObj es lo que obtengo
                    grabacion = mediaStreamObj;
                    video.srcObject = mediaStreamObj; // relleno la etiqueta video con lo que obtuve
                    video.play() //comienza la cámara
                })
                .catch(error => {
                    console.log(error);
                })
        })
    })

}

/*getCam()*/

//////////////////////////GRABAR GIF///////////////////////////////

let grabando;

function recordCam() {
    let btnCamCapturar = document.getElementById("btn1");
    let btnCapturar = document.getElementById("btn2");
    let btnsCapturar = [btnCamCapturar, btnCapturar];

    btnsCapturar.forEach((btn) => {
        btn.addEventListener('click', () => {
            let vistaPreviaContainer = document.getElementById("vistaPreviaContainer");
            vistaPreviaContainer.innerHTML = "";
            let containerCapturar = document.getElementById("btns-capturar-cam");
            containerCapturar.style.display = "none";
            let containerBtns = document.getElementById("btns-listo");
            containerBtns.style.display = "flex";
            document.getElementById("titulo").innerText = "Capturando tu gifO";
            let btnRecordIcon = document.getElementById("record-icon");
            btnRecordIcon.classList.add('record');
            let btnListo = document.getElementById("btn-listo");
            btnListo.classList.add('record');
            recorder = RecordRTC(grabacion, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
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
/*recordCam()*/

function stopRecord() {
    let btnListo = document.getElementById("btn-listo");
    let btnRecordIcon = document.getElementById("record-icon");
    let btnsListo = [btnListo, btnRecordIcon];
    btnsListo.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (grabando == false) { //si grabó mínimo 2 segundos
                let chequeoCard = document.getElementById("chequeo");
                chequeoCard.style.display = "none";
                let vistaPreviaCard = document.getElementById("vistaPrevia");
                vistaPreviaCard.style.display = "block";
                let gif = document.createElement("img");
                gif.style.width = "100%";
                let vistaPreviaContainer = document.getElementById("vistaPreviaContainer");
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

/*stopRecord()*/

//////////////////////////SUBIR GIFO///////////////////////////////

let arrayGifos = [];
let gifosContainer = document.getElementById("misGifosContainer");

function subirGifo() {
    let subirBtn = document.getElementById("subir-btn");
    subirBtn.addEventListener('click', () => {
        let vistaPreviaCard = document.getElementById("vistaPrevia");
        vistaPreviaCard.style.display = "none";
        let subiendoCard = document.getElementById("subiendo-gifo-card");
        subiendoCard.style.display = "block";
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
        ).then(function (response) {
            return response.json()
        } //pasar a json para acceder al id
        ).then(function (response) {
            console.log(response);
            gifId = response.data.id;
            console.log(gifId);
            arrayGifos = JSON.parse(localStorage.getItem("IDGif")) || []; //response está en json, hay que pasarlo a objeto. Si hay algo, pasarlo a objeto, si no hay nada, dejarlo vacío.
            arrayGifos.unshift(gifId);
            localStorage.setItem("IDGif", JSON.stringify(arrayGifos)); // convierte el array en un string.  
            document.getElementById("aun").style.display = "none";
            misGifos();
        }).catch(function (error) {
            console.log(error + " Se produjo un error");
        });

    })
}

/*subirGifo();*/

function espera() {
    let barraRosa = document.getElementById("barra-rosa");
    let width = 1;
    let progress = setInterval(avanzar, 50);
    function avanzar() {
        if (width >= 100) {
            clearInterval(progress);
            let subiendoCard = document.getElementById("subiendo-gifo-card");
            subiendoCard.style.display = "none";
            let exitoCard = document.getElementById("exito-card");
            exitoCard.style.display = "block";
        } else {
            width++;
            barraRosa.style.width = width + "%";
        }
    }
}

function cancelarSubida() {
    let btnCancelar = document.getElementById("btn-cancel");
    btnCancelar.addEventListener('click', () => {
        window.location.href = "index.html";
    })
}
/*cancelarSubida();*/

document.getElementById("boton-listo-gifo-creado").addEventListener('click', () => {
    let exitoCard = document.getElementById("exito-card");
    exitoCard.style.display = "none";
})


//////////////////////////MIS GIFOS///////////////////////////////

function misGifos() {
    gifosContainer.innerHTML = " ";
    arrayGifos = JSON.parse(localStorage.getItem("IDGif")) || [];
    if (typeof (arrayGifos[0]) == "string") {
        for (let i = 0; i < arrayGifos.length; i++) {
            let gif = document.createElement("img")
            gifosContainer.appendChild(gif);
            gif.src = "https://media.giphy.com/media/" + arrayGifos[i] + "/giphy.gif";
            gif.style.marginTop = "1rem";
            let misGifosCard = document.getElementById("misGifos");
            misGifosCard.appendChild(gifosContainer).appendChild(gif);
        }
    }
}



//////////////////////////COPIAR GIFO///////////////////////////////

let urlCopy
let inputCopy

function copiarLink() {
    let copiarEnlaceBtn = document.getElementById("btn-copiar-enlace");

    copiarEnlaceBtn.addEventListener('click', () => {
        urlCopy = "https://media.giphy.com/media/" + gifId + "/giphy.gif";
        copiar(urlCopy);
        copiarEnlaceBtn.innerText = "Enlace copiado!";
        setTimeout(() => {
            copiarEnlaceBtn.innerText = "Copiar Enlace Gifo";
        }, 1500);

    })
}

function copiar(urlacopiar) {
    inputCopy = document.createElement("textarea");
    document.getElementById("divInput").appendChild(inputCopy);
    inputCopy.value = urlacopiar;
    inputCopy.select(); //método para seleccionar
    document.execCommand('copy'); //método para copiar
    document.getElementById("divInput").removeChild(inputCopy);
}

/*copiarLink();*/


//////////////////////////DESCARGAR GIFO///////////////////////////////

function descargarGif() {
    let descargarBtn = document.getElementById("btn-descargar-gifo");
    descargarBtn.addEventListener('click', () => {
        let descarga = document.createElement('a');
        document.getElementById("divInput").appendChild(descarga);
        descarga.setAttribute('href', URL.createObjectURL(blob));
        descarga.setAttribute('download', 'mygif.gif');
        document.getElementById("divInput").removeChild(descarga);
        descarga.click(); //simula el click del 'a'
    })
}

/*descargarGif();*/
