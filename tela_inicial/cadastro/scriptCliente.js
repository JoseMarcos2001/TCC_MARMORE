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

document.getElementById("clienteForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  
  var numID = getElementVal("numID");
  if(!numID){ 
    alert("insira um nome");
  }else

  var name = getElementVal("name");
  if(!name){ 
    alert("insira um nome");
  }else

  var phone = getElementVal("phone");
  if(!phone){
    alert("insira um telefone valido");
  }else

  var emailid = getElementVal("emailid");
  if(!emailid){ 
    alert("insira um email");
  }else

  var enderecoid = getElementVal("enderecoid");
  if(!enderecoid){
    alert("insira um endereço");
  }else

  saveMessages(numID,name,phone, emailid, enderecoid);

  //   enable alert
  

  //   reset the form
  alert("Cliente(a) cadastrado(a)!");
 document.getElementById("clienteForm").reset();
 window.location.reload();
}



const saveMessages = (numID,name,phone, emailid, enderecoid) => {
  firebase
    .database()
    .ref("clienteForm/" + numID)
    .set({
    numID: numID,
    name: name,
    phone: phone,
    emailid: emailid,
    enderecoid: enderecoid,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

var numV, nameV, phoneV,emailV,enderecoV;

function readFom() {
  numV = document.getElementById("numID").value;
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
      document.getElementById("numID").value = snap.val().numID;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("phone").value = snap.val().phone;
      document.getElementById("emailid").value = snap.val().emailid;
      document.getElementById("enderecoid").value = snap.val().enderecoid;
    });
};


document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("clienteForm/" + numV)
    .update({
      numID: numV,
      name: nameV,
      phone: phoneV,
      emailid: emailV,
      enderecoid: enderecoV,
    });
  alert("Atualizado com sucesso!");
  document.getElementById("numID").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("emailid").value = "";
  document.getElementById("enderecoid").value = "";
  window.location.reload();
};


document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("clienteForm/" + numV)
    .remove();
  alert("Data Deleted");
  document.getElementById("numID").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("emailid").value = "";
  document.getElementById("enderecoid").value = "";

  window.location.reload();
};




function crud(){
  location.href = "./index.html";
}

function inicial(){
  location.href = "../tela_inicial.html";
}