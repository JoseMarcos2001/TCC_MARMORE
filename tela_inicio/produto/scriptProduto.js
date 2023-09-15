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
  var produtoFormDB = firebase.database().ref("produtoForm");
  
  document.getElementById("produtoForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    
    window.location.reload();
    var tipo = getElementVal("tipo");
    if(!tipo){ 
      alert("Insira o Tipo e Cor do Produto");
    }else
  
    var metro = getElementVal("metro");
    if(!metro){ 
      alert("Insira o M² da Pedra");
    }else
  
    var valbruto = getElementVal("valbruto");
    if(!valbruto){
      alert("Insira o Valor Bruto");
    }else
  
    var valimp = getElementVal("valimp");
    if(!valimp){ 
      alert("Insira o Valor do Imposto");
    }else
  
 
    var result = Number(valbruto)+Number(valimp);
    console.log(result);
    
    saveMessages(tipo,metro,valbruto, valimp);
  
    //   enable alert
    
  
    //   reset the form
    alert("Produto cadastrado!");
   document.getElementById("produtoForm").reset();
   window.location.reload();
  }

 
  
  
  
  const saveMessages = (tipo,metro,valbruto, valimp) => {
    
    firebase
      .database()
      .ref("produtoForm/" + tipo)
      .set({
          tipo: tipo,
      metro: metro,
      valbruto: valbruto,
      valimp: valimp,
      
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  
  var tipoV, metroV, valbrutoV,valimpV;
  
  function readFom() {
     tipoV = document.getElementById("tipo").value;
    metroV = document.getElementById("metro").value;
    valbrutoV = document.getElementById("valbruto").value;
    valimpV = document.getElementById("valimp").value;
    
    console.log(tipoV, metroV, valbrutoV,valimpV);
  }
  
  document.getElementById("read").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("produtoForm/" + tipoV)
      .on("value", function (snap) {
        document.getElementById("tipo").value = snap.val().tipo;
        document.getElementById("metro").value = snap.val().metro;
        document.getElementById("valbruto").value = snap.val().valbruto;
        document.getElementById("valimp").value = snap.val().valimp;
        
      });
  };
  
  
  document.getElementById("update").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("produtoForm/" + tipoV)
      .update({
          tipo: tipoV,
        metro: metroV,
        valbruto: valbrutoV,
       valimp: valimpV,
      });
    alert("Atualizado com sucesso!");
    document.getElementById("tipo").value = "";
    document.getElementById("metro").value = "";
    document.getElementById("valbruto").value = "";
    document.getElementById("valimp").value = "";
    
    window.location.reload();
  };
  
  
  document.getElementById("delete").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("produtoForm/" + tipoV)
      .remove();
      alert("Deletado com sucesso!");
    document.getElementById("tipo").value = "";
    document.getElementById("metro").value = "";
    document.getElementById("valbruto").value = "";
    document.getElementById("valimp").value = "";
    
  
    window.location.reload();
  };
  
  function soma(){
    console.log("ola");
  }
  
  
  function produtocadastrado(){
    location.href = "./index_tabela.html";
  }
  
  function inicial(){
    location.href = "../tela_inicial.html";
  }