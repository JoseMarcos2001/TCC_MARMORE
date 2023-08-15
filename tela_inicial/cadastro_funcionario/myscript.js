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
      document.getElementById("numID").value = snap.val().rollNo;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("phone").value = snap.val().gender;
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
      gender: phoneV,
    });
  alert("Data Update");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
};
document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("funcionarioForm/" + numV)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
};