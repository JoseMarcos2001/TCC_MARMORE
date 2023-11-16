const firebaseConfig = {
  apiKey: "AIzaSyCV2Eu8UdJX2_9FYVLFTV4aF_hLQJ4Edj8",
  authDomain: "marmore-9e301.firebaseapp.com",
  databaseURL: "https://marmore-9e301-default-rtdb.firebaseio.com",
  projectId: "marmore-9e301",
  storageBucket: "marmore-9e301.appspot.com",
  messagingSenderId: "213981622362",
  appId: "1:213981622362:web:2638b873284157c055e863"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var clienteFormDB = firebase.database().ref("clienteForm");


document.getElementById("orcamentoForm").addEventListener("submit", submitForm);
geraID()
async function geraID() {
  try {
    console.log("entrei")
    let result = await count();
    const newResult = await atualiza(++result);
    document.getElementById("pedido").value=result;
  } catch (error) {
  }
}

function count(){
 return  firebase
  .database()
  .ref("indices/orcamento")
  .once("value").then((snapshot) => {
    return snapshot.val();
   });
}

function atualiza(valor){
  return firebase
  .database()
  .ref("indices")
  .set({orcamento:valor});
}

function submitForm(e) {
  e.preventDefault();
            
  var nome = getElementVal("name");
  var CPF = getElementVal("numID");
  var telefone = getElementVal("phone");
  var email = getElementVal("emailid");
  var endereco = getElementVal("enderecoid");
  var numPedido = getElementVal("pedido");
  var name1 = getElementVal("name1");
  var qtd1 = getElementVal("qtd1");
  var larg1 = getElementVal("larg1");
  var comp1 = getElementVal("comp1");
  var status = "aberto";
 

  saveMessages(CPF,nome,telefone,email,endereco,numPedido,name1,qtd1,larg1,comp1,status);
  

  alert("foi!");
document.getElementById("orcamentoForm").reset();
location.href = "inicio.html"; 
}

function calculo(){
  const largura = parseFloat($('#larg1').val());
  const comprimento = parseFloat($('#comp1').val());
  const quantidade = parseFloat($('#qtd1').val());
  const area = largura * comprimento;
  console.log(area);

  const valorMetroQuadrado = 10;
  const valorTotal = (area / valorMetroQuadrado)*quantidade;
  console.log(valorTotal);

  
}

const saveMessages = (CPF,nome,telefone,email,endereco,numPedido,name1,qtd1,larg1,comp1,status) => {
  firebase
    .database()
    .ref("orcamentoForm/" + numPedido)
    .set({
      nome:nome,
      CPF:CPF,
      telefone:telefone,
      email:email,
      endereco:endereco,
      numPedido:numPedido,
      name1: name1,
      qtd1: qtd1,
      larg1: larg1,
      comp1: comp1,
      status:status,
    
  });
};



const getElementVal = (id) => {
  return document.getElementById(id).value;
};

var clienteV,numV, nameV, phoneV,emailV,enderecoV;

function readFom() {
  numV = document.getElementById("numID").value.match(/\d/g).join("");//LIMPA MASCARA;;;
  nameV = document.getElementById("name").value;
  phoneV = document.getElementById("phone").value;
  emailV = document.getElementById("emailid").value;
  enderecoV = document.getElementById("enderecoid").value;
  console.log(numV, nameV, phoneV,emailV,enderecoV);
}

document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("clienteForm/" + numV)
    .on("value", function (snap) {
      document.getElementById("numID").value = snap.val().CPF;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("phone").value = snap.val().phone;
      document.getElementById("emailid").value = snap.val().emailid;
      document.getElementById("enderecoid").value = snap.val().enderecoid;
    });
};