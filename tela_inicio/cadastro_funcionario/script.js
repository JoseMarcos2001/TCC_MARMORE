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
  
  var name = getElementVal("name");
  var phone = getElementVal("phone");
  var emailid = getElementVal("emailid");
  var passwordid = getElementVal("passwordid");

  saveMessages(name,phone, emailid, passwordid);

  //   enable alert
  

  //   reset the form
  alert("Funcionario(a) cadastrado(a)!");
  document.getElementById("funcionarioForm").reset();
}

const saveMessages = (name,phone, emailid, passwordid) => {
  var newFuncionarioForm = funcionarioFormDB.push();

  newFuncionarioForm.set({
    name: name,
    phone: phone,
    emailid: emailid,
    passwordid: passwordid,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};


