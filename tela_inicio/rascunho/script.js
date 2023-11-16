
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidthRange = document.getElementById('lineWidthRange');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fileInput = document.getElementById('fileInput');
const loadButton = document.getElementById('loadButton');
const textInput = document.getElementById('text');
const addTextButton = document.getElementById('addText');

let drawing = false;

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    context.closePath();
});

canvas.addEventListener('mousemove', draw);

clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', () => {
    const fileName = prompt("Digite o nome do arquivo:", "desenho");
    if (fileName !== null) {
        saveCanvas(fileName);
    }
});
fileInput.addEventListener('change', loadImage);
loadButton.addEventListener('click', () => {
    fileInput.click();
});

addTextButton.addEventListener('click', addText);

function draw(event) {
    if (!drawing) return;

    context.lineWidth = lineWidthRange.value;
    context.strokeStyle = colorPicker.value;

    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas(fileName) {
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = fileName + '.png';
    a.click();
}

function loadImage() {
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;
        image.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    };
    
    reader.readAsDataURL(file);
}

function addText() {
    const text = textInput.value;
    context.font = '24px Arial';
    context.fillStyle = colorPicker.value;
    context.fillText(text, 50, 50);
}

function cadastrar_cliente(){
	location.href = "../cadastro_cliente/index_cliente.html";
  
  }
  function cadastrar_funcionario(){
	location.href = "../cadastro_funcionario/index_funcionario.html";
  
  }
  function rascunho(){
	location.href = "../rascunho/index_rascunho.html";
  }
  
  function orcamento(){
	location.href = "../orcamento/inicio.html";
  }
  
  function senha(){
	location.href = "../senha/index.html";
  }
  
  function inicio(){
	location.href = "../index.html";
  }
  
  function cadastrar_produto(){
	location.href = "../produto/index_produto.html";
  
  }

