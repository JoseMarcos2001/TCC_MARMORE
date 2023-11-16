function submitForm(e) {
    e.preventDefault();
    var CPF = getElementVal("numID");
    var nome = getElementVal("name");
    var telefone = getElementVal("phone");
    var email = getElementVal("emailid");
    var endereco = getElementVal("enderecoid");
    var numPedido = getElementVal("pedido");
    var name1 = getElementVal("name1");
    var qtd1 = getElementVal("qtd1");
    var larg1 = getElementVal("larg1");
    var comp1 = getElementVal("comp1");
    var status = getElementVal("status");
   
  
    saveMessages(CPF,nome,telefone,email,endereco,numPedido,name1,qtd1,larg1,comp1,status);
    
  
    alert("foi!");
  
  location.href = "inicio.html"; 
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  
  

 var nameV,numV,phoneV,emailV,enderecoV,pedido,proname1,qtdV,largV,compV,statusV;

function readFom() {
  nameV = document.getElementById("name").value;
  pedido = document.getElementById("pedido").value;
  phoneV = document.getElementById("phone").value;
  emailV = document.getElementById("emailid").value;
  numV = document.getElementById("numID").value;
  enderecoV = document.getElementById("enderecoid").value;
  statusV = "aberto";
  proname1=document.getElementById("name").value;
    
}


var firebaseConfig = {
    apiKey: "AIzaSyCV2Eu8UdJX2_9FYVLFTV4aF_hLQJ4Edj8",
    authDomain: "marmore-9e301.firebaseapp.com",
    databaseURL: "https://marmore-9e301-default-rtdb.firebaseio.com",
    projectId: "marmore-9e301",
    storageBucket: "marmore-9e301.appspot.com",
    messagingSenderId: "213981622362",
    appId: "1:213981622362:web:2638b873284157c055e863"
  }
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const dataContainer = document.querySelector('tbody')  
  var data ;
  // campo da tabela, onde está o select para alterar status do pedido
  window.onload = teste()
  {
      document.getElementById("input-status").click();
  }

  function teste(){  
  var fetchedData = database.ref('orcamentoForm/')
  let status2 = document.getElementById('input-status').value;
 
  fetchedData.on('value', (snapshot) => {
       data = snapshot.val()
      let valores=['Aberto','Fechado','Cancelado'];
      var htmlData = ''
      for (var key in data){
          var value = data[key]
          
          if(status2!="Todos"){
          if(value.status==status2){
            
          htmlData += `
          <tr>
                  <td>${value.numPedido}</td>
                  <td>${value.nome}</td>

                  
                 
                  
                  <td>
                  
                    <select name="select" id="status${value.numPedido}"onclick="readyForUpdate('${key}', this)">          `;       
                    for (let index = 0; index < 3; index++) {
                       htmlData+='<option value="'+valores[index]+'"'+(valores[index].toUpperCase()==value.status.toUpperCase()?'selected':'')+'>'+valores[index]+'</option>'              
                    }
    
                    htmlData += `    </select>
                    
                    <button onclick="orçamento('${key}', this)">Imprimir orçamento</button>
                </td>

              </tr>
  
          `;
        }
        }else{
            htmlData += `
          <tr>
                  <td>${value.numPedido}</td>
                  <td>${value.nome}</td>

                  
                  
                  
                  <td>
                  
                    <select name="select" id="status${value.numPedido}" onclick="readyForUpdate('${key}', this)">          `;       
                    for (let index = 0; index < 3; index++) {
                       htmlData+='<option value="'+valores[index]+'"'+(valores[index].toUpperCase()==value.status.toUpperCase()?'selected':'')+'>'+valores[index]+'</option>'              
                    }
    
                    htmlData += `    </select>
                    
                    <button onclick="orçamento('${key}', this)">Imprimir orçamento</button>
                </td>

              </tr>
  
          `;
        }
      }

      dataContainer.innerHTML = htmlData
  });
}
  //aonde seleciona qual campo é para editar quando clicado em alterar status
  function readyForUpdate(numPedido, elem){
    

elem.setAttribute('onclick', `updateNow('${numPedido}')`)
console.log(elem.innerHTML);
}


function updateNow(numPedido){
    
console.log(numPedido);


var obj = {
    'status': document.getElementById('status'+numPedido).value,
    
    
}
console.log(pedido);
var listRef = database.ref ('orcamentoForm/' + numPedido)
listRef.update(obj)


}

const INPUT_BUSCA = document.getElementById('input-busca');
const TABELA_PEDIDOS = document.getElementById('tabela-pedidos');

INPUT_BUSCA.addEventListener('keyup', () => {
    let expressao = INPUT_BUSCA.value.toLowerCase();

    if (expressao.length === 1) {
        return;
    }

    let linhas = TABELA_PEDIDOS.getElementsByTagName('tr');

    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue;
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
});


     
  function a(){
                location.href = "index.html";                
            }
            function orçamento(numPedido){
              console.log(numPedido);
              location.assign("orc.html?" + numPedido);
                             
          }