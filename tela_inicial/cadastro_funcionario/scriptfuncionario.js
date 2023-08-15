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
var funcionarioFormDB = firebase.database().ref("funcionarioForm");

document.getElementById("funcionarioForm").addEventListener("submit", submitForm);

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

  var passwordid = getElementVal("passwordid");
  if(!passwordid){
    alert("insira uma senha");
  }else

  saveMessages(numID,name,phone, emailid, passwordid);

  //   enable alert
  

  //   reset the form
  alert("Funcionario(a) cadastrado(a)!");
 document.getElementById("funcionarioForm").reset();
}



const saveMessages = (numID,name,phone, emailid, passwordid) => {
  firebase
    .database()
    .ref("funcionarioForm/" + numID)
    .set({
    numID: numID,
    name: name,
    phone: phone,
    emailid: emailid,
    passwordid: passwordid,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

var numV, nameV, phoneV;

function readFom() {
  numV = document.getElementById("numID").value;
  nameV = document.getElementById("name").value;
  phoneV = document.getElementById("phone").value;
  console.log(numV, nameV, phoneV);
}

document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("funcionarioForm/" + numV)
    .on("value", function (snap) {
      document.getElementById("numID").value = snap.val().numID;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("phone").value = snap.val().phone;
    });
};


document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("funcionarioForm/" + numV)
    .update({
      //   rollNo: rollV,
      name: nameV,
      phone: phoneV,
    });
  alert("Data Update");
  document.getElementById("numID").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
};


document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("funcionarioForm/" + numV)
    .remove();
  alert("Data Deleted");
  document.getElementById("numID").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";

  FirebaseAuth.getInstance().deleteUser(uid);
  System.out.println("Successfully deleted user.");

};




function crud(){
  location.href = "./index_crud.html";
}
