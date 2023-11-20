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
  var orcamentoFormDB = firebase.database().ref("orcamentoForm");
  document.getElementById("orcamentoForm").addEventListener("submit", submitForm);

  var valor = location.search.split("?")[1];
  console.log(valor);
  const pedidoFormatado =  parseInt(valor);

  function submitForm(e) {
    e.preventDefault();
    var CPF = getElementVal("numID");
    var nome = getElementVal("name");
    var telefone = getElementVal("phone");
    var email = getElementVal("emailid");
    var endereco = getElementVal("enderecoid");
    var numPedido = pedidoFormatado;
    var name1 = getElementVal("name1");
    var qtd1 = getElementVal("qtd1");
    var larg1 = getElementVal("larg1");
    var comp1 = getElementVal("comp1");
    var total1 = getElementVal("total1");

    var name2 = getElementVal("name2");
    var qtd2 = getElementVal("qtd2");
    var larg2 = getElementVal("larg2");
    var comp2 = getElementVal("comp2");
    var total2 = getElementVal("total2");

    var total_final = getElementVal("total_final");
   
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };

  
  
  

 var nameV,numV,phoneV,emailV,enderecoV,pedido,proname1,qtdV,largV,compV;

function readFom() {
  nameV = document.getElementById("name").value;
  pedido = pedidoFormatado;
  phoneV = document.getElementById("phone").value;
  emailV = document.getElementById("emailid").value;
  numV = document.getElementById("numID").value;
  enderecoV = document.getElementById("enderecoid").value;

  proname1=document.getElementById("name1").value;
    
}
window.onload = function()
{
    document.getElementById("buscar").click();

    readFom();
  firebase
    .database()
    .ref("orcamentoForm/" + pedido)
    .on("value", function (snap) {
      document.getElementById("pedido").value = pedidoFormatado;
      document.getElementById("numID").value = snap.val().CPF;
      document.getElementById("name").value = snap.val().nome;
      document.getElementById("phone").value = snap.val().telefone;
      document.getElementById("emailid").value = snap.val().email;
      document.getElementById("enderecoid").value = snap.val().endereco;
      document.getElementById("name1").value = snap.val().name1;
      document.getElementById("qtd1").value = snap.val().qtd1;
      document.getElementById("larg1").value = snap.val().larg1;
      document.getElementById("comp1").value = snap.val().comp1;
      document.getElementById("total1").value = snap.val().total1;
      if("name2"==""){
        document.getElementById("name2").value = " ";
      }else
      document.getElementById("name2").value = snap.val().name2;
      document.getElementById("qtd2").value = snap.val().qtd2;
      document.getElementById("larg2").value = snap.val().larg2;
      document.getElementById("comp2").value = snap.val().comp2;
      document.getElementById("total2").value = snap.val().total2;

      document.getElementById("total_final").value = snap.val().total_final;
    });
} 
  
  



       