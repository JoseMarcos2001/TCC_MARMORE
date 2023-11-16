// const firebaseConfig = {
//   apiKey: "AIzaSyCV2Eu8UdJX2_9FYVLFTV4aF_hLQJ4Edj8",
//   authDomain: "marmore-9e301.firebaseapp.com",
//   databaseURL: "https://marmore-9e301-default-rtdb.firebaseio.com",
//   projectId: "marmore-9e301",
//   storageBucket: "marmore-9e301.appspot.com",
//   messagingSenderId: "213981622362",
//   appId: "1:213981622362:web:2638b873284157c055e863"
// };
//   // initialize firebase
//   firebase.initializeApp(firebaseConfig);
  
//   // reference your database
//   var funcionarioFormDB = firebase.database().ref("funcionarioForm");
  
//   var emailV,numV;

//   function readFom() {
//     numV = document.getElementById("numID").value;
//     emailV = document.getElementById("emailid").value;
//     console.log(emailV);
//   }
// function getASecureRandomPassword() {
//     return getElementVal("passwordid");
//   }


//   document.getElementById("update").onclick = function () {
//     readFom();
    
//   firebase
//     .database()
//     .ref("funcionarioForm/" + numV)
//     .update({
      
//       passwordid:passwordid,
      
//     });
//     alert("Cadastro atualizado");

//     const user = firebase.auth().currentUser;
//     const newPassword = getASecureRandomPassword();
//     user.updatePassword(newPassword).then(() => {
//       console.log("senha atualizou");
      
      
//   }).catch((error) => {
//   const errorMessage = error.message;
//     // ..
//     console.log(errorMessage);
//     //alert(error);
//   });
  
//   };

document.getElementById("update").onclick = function () {

  alert("Senha do usuario atualizada!");
  window.location.reload();
}

  function inicial(){
    location.href = "../tela_inicial.html";
  }