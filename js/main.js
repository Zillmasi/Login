//////////////////Start signUp///////////////////
const form = document.getElementById("form");
const nameSignInput = document.getElementById("nameSign");
const emailSignInput = document.getElementById("emailSign");
const passSignInput = document.getElementById("passSign");
const subUpBtn = document.getElementById("subUpBtn");
const Success = document.getElementById("succ");
const nSucc = document.getElementById("nSucc");
const exist = document.getElementById("exi");

var UsersList = [];
if (localStorage.getItem("user") === null) {
  UsersList = [];
} else {
  UsersList = JSON.parse(localStorage.getItem("user"));
}

function AddUsers() {
  if (
    validationInputs(nameSignInput) &&
    validationInputs(emailSignInput) &&
    validationInputs(passSignInput) &&
    Check() &&
    Exist()
  ) {
    var user = {
      name: nameSignInput.value,
      email: emailSignInput.value,
      pass: passSignInput.value,
    };

    UsersList.push(user);
    localStorage.setItem("user", JSON.stringify(UsersList));
    clearForm();
    setTimeout(() => {
      window.location.href = "../index.htm";
    }, 0);
  }
}

function validationInputs(element) {
  let text = element.value;
  let regex = {
    nameSign: /^[A-Z][a-z]{3,15}$/,
    emailSign: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    passSign: /[A-Z][a-z]{3,15}/,
  };

  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    Success.classList.remove("d-none");
    nSucc.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    Success.classList.add("d-none");
    nSucc.classList.remove("d-none");

    return false;
  }
}

function Exist() {
  for (let i = 0; i < UsersList.length; i++) {
    if (UsersList[i].email === emailSignInput.value) {
      swal.fire({
        title: "Error",
        text: "this Email is already exist",
        icon: "error",
      });
      Success.classList.add("d-none");
      nSucc.classList.add("d-none");

      return false;
    } else {
      exist.classList.add("d-none");
      return true;
    }
  }
}

function Check() {
  if (
    nameSignInput.value == " " ||
    emailSignInput.value == " " ||
    passSignInput.value == " "
  ) {
    return false;
    Success.classList.add("d-none");
    nSucc.classList.remove("d-none");
  } else {
    return true;
    nSucc.classList.add("d-none");
    Success.classList.remove("d-none");
  }
}

function clearForm() {
  nameSignInput.value = "";
  emailSignInput.value = "";
  passSignInput.value = "";

  nameSignInput.classList.remove("is-invalid");
  nameSignInput.classList.remove("is-valid");

  emailSignInput.classList.remove("is-invalid");
  emailSignInput.classList.remove("is-valid");

  passSignInput.classList.remove("is-invalid");
  passSignInput.classList.remove("is-valid");
  Success.classList.add("d-none");
  nSucc.classList.add("d-none");
}
////////////////// End signUp///////////////////
////////////////// Start signIn///////////////////
const emailSignIn = document.getElementById("emailSignIn");
const passSignIn = document.getElementById("passSignIn");
const subInBtn = document.getElementById("subInBtn");
const InvalidPassOrUS = document.getElementById("InvalidPassOrUS");
const welcome = document.getElementById("welcome");
const logOutBtn = document.getElementById("logOutBtn");

function Login() {
  for (let i = 0; i < UsersList.length; i++) {
    if (
      UsersList[i].email == emailSignIn.value &&
      UsersList[i].pass == passSignIn.value
    ) {
      localStorage.setItem("loginUser", UsersList[i].name);
      InvalidPassOrUS.classList.add("d-none");

      setTimeout(() => {
        window.location.href = "../welcome.html";
      }, 0);
      break;
    } else {
      InvalidPassOrUS.classList.remove("d-none");
    }
    clearFormLogin();
  }
}

function clearFormLogin() {
  emailSignIn.value = "";
  passSignIn.value = "";
}

function Welcome() {
  welcome.innerHTML = localStorage.getItem("loginUser");
}

window.addEventListener("load", Welcome);

function LogOut() {
  localStorage.removeItem("loginUser");
  window.location.replace("../index.htm");
}
