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

  var name2 = getElementVal("name2");
  var qtd2 = getElementVal("qtd2");
  var larg2 = getElementVal("larg2");
  var comp2 = getElementVal("comp2");

  var total1 = getElementVal("total1");
  var total2 = getElementVal("total2");

  var total_final = getElementVal("total_final");
  var status = "aberto";
 

  saveMessages(CPF,nome,telefone,email,endereco,numPedido,name1,qtd1,larg1,comp1,status,
    name2,qtd2,larg2,comp2,total1,total2,total_final
    );
  

  alert("Orçamento cadastrado!");
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
  const valorTotal = (area * valorMetroQuadrado)*quantidade;
  console.log(valorTotal);
  const total = valorTotal.toFixed(2);
  console.log(total);

  total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  document.getElementById("total1").value=total;


  const aux = document.getElementById("total1").value;
  aux.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById("total_final").value=aux;
}

function calculo2(){
  const largura2 = parseFloat($('#larg2').val());
  const comprimento2 = parseFloat($('#comp2').val());
  const quantidade2 = parseFloat($('#qtd2').val());
  const area2 = largura2 * comprimento2;
  console.log(area2);

  const valorMetroQuadrado2 = 10;
  const valorTotal2 = (area2 * valorMetroQuadrado2)*quantidade2;
  console.log(valorTotal2);
  const total2 = valorTotal2.toFixed(2);
  total2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  document.getElementById("total2").value=total2;

  const aux = document.getElementById("total2").value;
  const aux2 = document.getElementById("total1").value;

  const aux3 = Number(aux) + Number(aux2);
  const teste = aux3.toFixed(2);
  teste.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById("total_final").value=teste;

}



const saveMessages = (CPF,nome,telefone,email,endereco,numPedido,name1,qtd1,larg1,comp1,status,
    name2,qtd2,larg2,comp2,total1,total2,total_final
  ) => {
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

      name2:name2,
      qtd2: qtd2,
      larg2:larg2,
      comp2:comp2,

      total1:total1,
      total2:total2,
      total_final,

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